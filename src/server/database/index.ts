import { SmartContractAdditionalSource } from './models/SmartContractAdditionalSource';
import { AddressCurrentTokenBalance } from './models/AddressCurrentTokenBalance';
import { BlockSecondDegreeRelation } from './models/BlockSecondDegreeRelation';
import { AddressCoinBalanceDaily } from './models/AddressCoinBalanceDaily';
import { DecompiledSmartContract } from './models/DecompiledSmartContract';
import { PendingBlockOperation } from './models/PendingBlockOperation';
import { StakingPoolDelegator } from './models/StakingPoolDelegator';
import { AddressTokenBalance } from './models/AddressTokenBalance';
import { InternalTransaction } from './models/InternalTransaction';
import { AddressCoinBalance } from './models/AddressCoinBalance';
import { LastFetchedCounter } from './models/LastFetchedCounter';
import { TransactionStats } from './models/TransactionStats';
import { TransactionFork } from './models/TransactionFork';
import { SchemaMigration } from './models/SchemaMigration';
import { ContractMethod } from './models/ContractMethod';
import { EmissionReward } from './models/EmissionReward';
import { TokenInstance } from './models/TokenInstance';
import { SmartContract } from './models/SmartContract';
import { TokenTransfer } from './models/TokenTransfer';
import { Administrator } from './models/Administrator';
import { MarketHistory } from './models/MarketHistory';
import { BridgedToken } from './models/BridgedToken';
import { AddressName } from './models/AddressName';
import { BlockReward } from './models/BlockReward';
import { StakingPool } from './models/StakingPool';
import { UserContact } from './models/UserContact';
import { Transaction } from './models/Transaction';
import { Sequelize } from 'sequelize-typescript';
import { Address } from './models/Address';
import { Token } from './models/Token';
import { Block } from './models/Block';
import config from '../config/config';
import { User } from './models/User';
import { Logs } from './models/Logs';

export async function initDatabase(){
  const sequelize = new Sequelize(config.dbLink, {
    dialect: 'postgres',
    models: [
      SmartContractAdditionalSource,
      AddressCurrentTokenBalance,
      BlockSecondDegreeRelation,
      AddressCoinBalanceDaily,
      DecompiledSmartContract,
      PendingBlockOperation,
      StakingPoolDelegator,
      AddressTokenBalance,
      InternalTransaction,
      AddressCoinBalance,
      LastFetchedCounter,
      TransactionStats,
      TransactionFork,
      SchemaMigration,
      ContractMethod,
      EmissionReward,
      TokenInstance,
      SmartContract,
      TokenTransfer,
      Administrator,
      MarketHistory,
      BridgedToken,
      AddressName,
      BlockReward,
      StakingPool,
      UserContact,
      Transaction,
      Address,
      Token,
      Block,
      User,
      Logs,
    ],
    define: {
      createdAt: 'inserted_at',
      updatedAt: 'updated_at',
    }
  });
  await sequelize.sync();
  return sequelize;
}
