import * as fs from 'fs';
import { initDatabase } from '../server/models';
import { Account, AccountType } from '../server/models/Account';
import { Token } from '../server/models/Token';
import { Balance } from '../server/models/Balance';

async function syncGenesis() {
  if (process.argv.length != 3){
    console.error('Usage: npm run sync-genesis [file]')
    return;
  }

  const file = fs.readFileSync(process.argv[2])
  const genesisInfo = JSON.parse(file.toString())
  console.log(`Found ${genesisInfo.app_state.auth.accounts.length} account(s)`);
  let sequelize = await initDatabase();
  let transaction = await sequelize.transaction();
  for (const account of genesisInfo.app_state.auth.accounts){
    await Account.create({
      id: account.value.eth_address.toLowerCase(),
      bech32Address: account.value.address.toLowerCase(),
      txsCount: 0,
      type: AccountType.Address,
    }, { transaction })
    for (const balance of account.value.coins) {
      await Token.findOrCreate({
        where: {id: balance.denom},
        defaults: {
          name: balance.denom,
          symbol: balance.denom,
          decimals: 18,
          contractAddress: null,
        },
      });
      await Balance.create({
        amount: balance.amount,
        tokenId: balance.denom,
        accountAddress: account.value.eth_address.toLowerCase()
      }, { transaction })
    }
  }
  await transaction.commit()
}

syncGenesis();
