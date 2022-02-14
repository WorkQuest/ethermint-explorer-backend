import { smart_contracts_additional_sources } from './models/smart_contracts_additional_sources';
import { address_current_token_balances } from './models/address_current_token_balances';
import { block_second_degree_relations } from './models/block_second_degree_relations';
import { address_coin_balances_daily } from './models/address_coin_balances_daily';
import { decompiled_smart_contracts } from './models/decompiled_smart_contracts';
import { pending_block_operations } from './models/pending_block_operations';
import { staking_pools_delegators } from './models/staking_pools_delegators';
import { address_token_balances } from './models/address_token_balances';
import { address_coin_balances } from './models/address_coin_balances';
import { internal_transactions } from './models/internal_transactions';
import { last_fetched_counters } from './models/last_fetched_counters';
import { schema_migrations } from './models/schema_migrations';
import { transaction_forks } from './models/transaction_forks';
import { transaction_stats } from './models/transaction_stats';
import { contract_methods } from './models/contract_methods';
import { emission_rewards } from './models/emission_rewards';
import { smart_contracts } from './models/smart_contracts';
import { token_instances } from './models/token_instances';
import { token_transfers } from './models/token_transfers';
import { administrators } from './models/administrators';
import { bridged_tokens } from './models/bridged_tokens';
import { market_history } from './models/market_history';
import { block_rewards } from './models/block_rewards';
import { staking_pools } from './models/staking_pools';
import { address_names } from './models/address_names';
import { user_contacts } from './models/user_contacts';
import { transactions } from './models/transactions';
import { addresses } from './models/addresses';
import { Sequelize } from 'sequelize-typescript';
import { blocks } from './models/blocks';
import { tokens } from './models/tokens';
import { users } from './models/users';
import config from '../config/config';
import { logs } from './models/logs';

export async function initDatabase(){
  const sequelize = new Sequelize(config.dbLink, {
    dialect: 'postgres',
    models: [
      smart_contracts_additional_sources,
      address_current_token_balances,
      block_second_degree_relations,
      address_coin_balances_daily,
      decompiled_smart_contracts,
      staking_pools_delegators,
      pending_block_operations,
      address_token_balances,
      internal_transactions,
      address_coin_balances,
      last_fetched_counters,
      transaction_stats,
      transaction_forks,
      schema_migrations,
      contract_methods,
      emission_rewards,
      token_instances,
      smart_contracts,
      token_transfers,
      bridged_tokens,
      administrators,
      market_history,
      address_names,
      block_rewards,
      staking_pools,
      user_contacts,
      transactions,
      addresses,
      tokens,
      blocks,
      users,
      logs,
    ],
  });
  await sequelize.sync();
  return sequelize;
}
