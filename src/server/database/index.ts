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

  return sequelize;
}

export * from './models/SmartContractAdditionalSource';
export * from './models/AddressCurrentTokenBalance';
export * from './models/BlockSecondDegreeRelation';
export * from './models/AddressCoinBalanceDaily';
export * from './models/DecompiledSmartContract';
export * from './models/PendingBlockOperation';
export * from './models/StakingPoolDelegator';
export * from './models/AddressTokenBalance';
export * from './models/InternalTransaction';
export * from './models/AddressCoinBalance';
export * from './models/LastFetchedCounter';
export * from './models/TransactionStats';
export * from './models/TransactionFork';
export * from './models/SchemaMigration';
export * from './models/ContractMethod';
export * from './models/EmissionReward';
export * from './models/TokenInstance';
export * from './models/SmartContract';
export * from './models/TokenTransfer';
export * from './models/Administrator';
export * from './models/MarketHistory';
export * from './models/BridgedToken';
export * from './models/AddressName';
export * from './models/BlockReward';
export * from './models/StakingPool';
export * from './models/UserContact';
export * from './models/Transaction';
export * from './models/Address';
export * from './models/Token';
export * from './models/Block';
export * from './models/User';
export * from './models/Logs';
