# Reya API Playground

This is a repository that demonstrates the use of REYA npm packages;

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have Node.js and npm installed on your system. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd small-repo
    ```

2. **Install npm packages:**
    ```sh
    npm install
    ```

### Build and Run

1. **Build the project:**
    ```sh
    npm run build
    ```

2. **Run the project:**
    ```sh
    npm start
    ```

This will compile the TypeScript code and execute the script to fetch data from the specified API URL.

### Scripts

- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm start`: Runs the compiled JavaScript code.

---
# Documentation

## SDK Configuration

The API SDK can be configured to operate in different environments depending on your needs. This is done using the configure method on the ApiClient. The available environments are:
- production
- test
- local
```typescript
// Import ApiClient from your SDK package
import { ApiClient } from '@reyaxyz/api-sdk';

// Configure the SDK to use the production environment
ApiClient.configure('production');
```

## Queries

### List of Markets
```typescript
const markets: MarketEntity[] = await ApiClient.markets.getMarkets();
console.log('List of markets:', markets);
```
This query retrieves a list of all markets available. The result is an array of MarketEntity objects, each representing a market with various properties such as the market’s ticker, underlying asset, mark price, and more.

### Get a Specific Market
```typescript
const marketParams: GetMarketParams = {
   id: 1
}
const market: MarketEntity = await ApiClient.markets.getMarket(marketParams);
console.log('Market:', market);
```
This query retrieves information about a specific market by its ID. The result is a single MarketEntity object containing detailed information about the market.

### Type Definitions
```typescript
type MarketEntity = {
   id: number;
   ticker: string;
   underlyingAsset: string;
   quoteToken: string;
   markPrice: number;
   isActive: boolean;
   maxLeverage: number;
   volume24H: number;
   priceChange24H: number;
   priceChange24HPercentage: number;
   openInterest: number;
   fundingRate: number;
   description: string;
   orderInfo: MarketOrderInfo;
   tickSizeDecimals: number;
   minOrderSize: number;
   minOrderSizeBase: number;
   baseSpacing: number;
};
```
## Fields

- **id: number**
   - Unique identifier for the market.

- **ticker: string**
   - The ticker symbol representing the market (e.g., BTC/USD).

- **underlyingAsset: string**
   - The underlying asset of the market (e.g., Bitcoin).

- **quoteToken: string**
   - The token used for quoting prices in the market (e.g., USD).

- **markPrice: number**
   - The current mark price of the market.

- **isActive: boolean**
   - Indicates whether the market is active and available for trading.

- **maxLeverage: number**
   - The maximum leverage allowed for trading in the market.

- **volume24H: number**
   - The total trading volume in the market over the last 24 hours.

- **priceChange24H: number**
   - The absolute price change in the market over the last 24 hours.

- **priceChange24HPercentage: number**
   - The percentage price change in the market over the last 24 hours.

- **openInterest: number**
   - The total open interest in the market, representing the total number of outstanding contracts.

- **fundingRate: number**
   - The current funding rate for the market, which is used to balance the difference between the perpetual contract and the underlying asset.

- **description: string**
   - A brief description of the market.

- **orderInfo: MarketOrderInfo**
   - Detailed information about orders in the market.

- **tickSizeDecimals: number**
   - The number of decimal places for the tick size in the market.

- **minOrderSize: number**
   - The minimum order size allowed in the market.

- **minOrderSizeBase: number**
   - The minimum order size in base currency.

- **baseSpacing: number**
   - The base spacing for orders in the market.


## Market Candles

### Description
Returns candles for given market resolution

### Usage

```typescript
type GetCandlesParams = {
  marketId: MarketEntity['id'];
  resolution: CandlesResolution;
  fromISO?: string | null;
  toISO?: string | null;
  limit?: number | null;
};

enum CandlesResolution {
  ONE_MINUTE = '1MIN',
  FIVE_MINUTES = '5MINS',
  FIFTEEN_MINUTES = '15MINS',
  THIRTY_MINUTES = '30MINS',
  ONE_HOUR = '1HOUR',
  FOUR_HOURS = '4HOURS',
  ONE_DAY = '1DAY',
}
const getCandlesParams: GetCandlesParams = {
  marketId: 1,
  resolution: CandlesResolution.FIFTEEN_MINUTES,
  fromISO: '2024-05-25T06:32:33.000Z',
  toISO: '2024-05-28T09:32:33.000Z',
}

const marketCandles: MarketCandlesResponse = await ApiClient.markets.getMarketCandles(getCandlesParams);
console.log('Candles:', marketCandles);

interface MarketCandlesResponse {
  candles: Candle[];
}
interface Candle {
  id: string;
  startedAt: string;
  ticker: string;
  resolution: CandlesResolution;
  low: string;
  high: string;
  open: string;
  close: string;
  baseTokenVolume: string;
  usdVolume: string;
  trades: number;
  startingOpenInterest: string;
}
// example
const candle = {
  id: '42319128-eea0-48f9-9d36-c367a2300e2c',
  startedAt: '2024-05-27T14:15:00.000Z',
  market_id: '1',
  resolution: '15MINS',
  low: '3929.0854595187666',
  high: '3941.1773966472533',
  open: '3934.530661818567',
  close: '3929.0854595187666',
  baseTokenVolume: '0', // not updated
  usdVolume: '0',  // not updated
  trades: 65,
  startingOpenInterest: '0',
  ticker: 'ETH-rUSD'
}
```

## Market Trading history

### Description
Returns trading history for given market

### Usage

```typescript
type GetMarketTradingHistoryParams = {
  marketId: number;
  limit?: number;
  fromTimestampMillisecondsUTC?: number;
};
const getMarketTradingHistoryParams: GetMarketTradingHistoryParams = {
  marketId: 1,
  limit: 50,
}

const getTradingHistoryResult: GetTradingHistoryResult = await ApiClient.markets.getMarketTradingHistory(getMarketTradingHistoryParams);
console.log('Trading history result:', getTradingHistoryResult);

type GetTradingHistoryResult = TradingHistoryEntity[];
type TradingHistoryEntity = {
  id: number;
  price: number;
  priceUnderlyingToken: string;
  size: number;
  sizeUnderlyingToken: string;
  timestampMillisecondsUTC: number;
};
// example
const trade = {
  id: 49,
  price: 3906.14,
  priceUnderlyingToken: '$',
  size: -0.035,
  sizeUnderlyingToken: 'ETH',
  timestampMillisecondsUTC: 1716892436000
}
```

## Funding Rate history

### Description
Returns hourly funding rate history
### Usage

```typescript
type GetFundingRateChartDataParams = {
  marketId: MarketEntity['id'];
  filters: {
    timeframeMs: number;
    granularity: FundingRateHistoryGranularity;
  };
};
enum FundingRateHistoryGranularity {
  ONE_MINUTE = 60 * 1000,
  ONE_HOUR = 60 * 60 * 1000,
  ONE_DAY = 24 * 60 * 60 * 1000,
  ONE_WEEK = 7 * 24 * 60 * 60 * 1000,
  ONE_MONTH = 30 * 24 * 60 * 60 * 1000,
  ONE_YEAR = 365 * 24 * 60 * 60 * 1000,
}
const getFundingRateChartDataParams: GetFundingRateChartDataParams = {
  marketId: 1,
  filters: {
    timeframeMs: 604800000,
    granularity: FundingRateHistoryGranularity.ONE_DAY
  }
}

const getFundingRateChartDataResult: GetFundingRateChartDataResult = await ApiClient.markets.getFundingRateChartData(getFundingRateChartDataParams);
console.log('Funding rate history:', getFundingRateChartDataResult);

type GetFundingRateChartDataResult = {
  fundingRateData: {
    timestampInMs: number;
    value: number;
  }[];
  fundingRate: number; // current hourly funding rate
};
```

## List of supported tokens on network

### Description
Returns list of supported tokens on reya network or reya cronos
### Usage

```typescript
type GetAllowedTokensParams = {
  chainId: ReyaChainId;
  walletAddress?: string; // optional, for whitelisted wallets
};
const getAllowedTokensParams: GetAllowedTokensParams = {
  chainId: ReyaChainId.reyaNetwork,
}

const getAllowedTokenResult: GetAllowedTokenResult = await ApiClient.tokens.getAllowedTokens(getAllowedTokensParams);
console.log('List of supported tokens on network:', getAllowedTokenResult);
type GetAllowedTokenResult = {
  tokens: TokenEntityWithMinValue[]; // Extend TokenEntity with minDepositAmount, minWithdrawAmount, stepSize
};

type TokenEntityWithMinValue = TokenEntity & {
  minDepositAmount: number;
  minWithdrawAmount: number;
  minTransferAmount: number;
};

```

## getOwnerMetadata

### Description
This function retrieves metadata for a given owner address, including nonces used for on-chain actions such as trade or withdraw.

### Usage
```typescript
const getOwnerMetadataParams: GetOwnerMetadataParams =  {
    ownerAddress: '0xE116e2c0c2B0e7cd88060F06e2b2D7981Ef897ef'
}
const ownerMetadata: GetOwnerMetadataResult = await ApiClient.owner.getOwnerMetadata(getOwnerMetadataParams);
console.log('ownerMetadata', ownerMetadata);

/**
 * 	ownerAddress: string
 •	The wallet address of the owner for whom metadata is being retrieved.

 */
type GetOwnerMetadataParams = {
  ownerAddress: string;
};

/**
 * 	address: The wallet address of the owner.
 •	coreSigNonce: The nonce for core signature actions.
 •	poolSigNonce: The nonce for pool signature actions.
 */
type OwnerMetadataEntity = {
  address: Address;
  coreSigNonce: number;
  poolSigNonce: number;
};

```
## Get Margin Accounts for Wallet Address

### Description
This function retrieves list of margin accounts for given wallet address

### Usage
```typescript
const getMarginAccountsParams: GetMarginAccountsParams =  {
  address: '0xE116e2c0c2B0e7cd88060F06e2b2D7981Ef897ef'
}

const getMarginAccountsResult: GetMarginAccountsResult = await ApiClient.account.getMarginAccounts(getMarginAccountsParams);
console.log('getMarginAccountsResult', getMarginAccountsResult);

type GetMarginAccountsResult = MarginAccountEntity[];
type MarginAccountEntity = {
  id: number;
  name: string;
  marginRatioHealth: 'danger' | 'healthy' | 'warning';
  marginRatioPercentage: number;
  totalBalance: number;
  totalBalanceUnderlyingAsset: string;
  totalBalanceChange24HPercentage: 5;
  livePnL: number;
  livePnLUnderlyingAsset: string;
  realizedPnL: number;
  realizedPnLUnderlyingAsset: string;
  realizedPnlHistoryTotal: number;
  totalPositionsCount: number;
  collaterals: CollateralEntity[];
  positions: PositionEntity[];
};

type CollateralEntity = {
  token: string;
  percentage: number;
  balance: number;
  balanceRUSD: number;
  exchangeRate: number;
  exchangeRateChange24HPercentage: number;
};
type PositionEntity = {
  id: number;
  side: Side;
  size: number;
  base: number;
  price: number;
  markPrice: number;
  orderStatus: Status;
  realisedPnl: number;
  unrealisedPnl: number;
  liquidationPrice: number;
  fundingRate: number;
  market: MarketEntity;
  account: {
    name: MarginAccountEntity['name'];
    id: MarginAccountEntity['id'];
  };
  tradeXpBoost: number;
};

```


## Trade Simulation

### Description
This function simulates trade for the given market, margin account and notional amount

### Usage
```typescript
const tradeSimulationLoadDataParam: TradeSimulationLoadDataParams =  {
  marketId: 1,
  marginAccountId: 14,
}
await ApiClient.tradeSimulation.arm(tradeSimulationLoadDataParam);

const tradeSimulationSimulateParams: TradeSimulationSimulateParams =  {
  amount: 100
}
const simulateEntity: SimulateTradeEntity = ApiClient.tradeSimulation.simulate(tradeSimulationSimulateParams)
console.log('simulateEntity', simulateEntity);

type SimulateTradeEntity = {
  liquidationPrice: number;
  fees: number;
  estimatedPrice: number;
  estimatedSlippage: number;
  marginRatio: MarginAccountEntity['marginRatioPercentage'];
  marginRatioHealth: MarginAccountEntity['marginRatioHealth'];
  availableMargin: number;
  marginBalance: number;
  requiredMargin: number;
  snappedAmount: number;
  snappedAmountInBase: number;
};
```

## Maximum Order Size

### Description
Calculates maximum order size for given market and margin account id

### Usage

```typescript
type GetMaxOrderSizeAvailableParams = {
  marketId: MarketEntity['id'];
  marginAccountId: MarginAccountEntity['id'];
  direction: 'long' | 'short';
};

const getMaxOrderSizeAvailableParams: GetMaxOrderSizeAvailableParams = {
  marketId: 1,
  marginAccountId: 14,
  direction: 'long' // 'long' | 'short';
}

const getMaxOrderSizeAvailableResult: GetMaxOrderSizeAvailableResult = await ApiClient.account.getMaxOrderSizeAvailable(getMaxOrderSizeAvailableParams);
console.log('getMaxOrderSizeAvailableResult:', getMaxOrderSizeAvailableResult);

type GetMaxOrderSizeAvailableResult = {
  maxAmountBase: number;
  maxAmountSize: number;
};
```

## Execute Match Order

### Description
Function that executes Match Order

### Usage

```typescript
// Reya Cronos RPC: 'https://rpc.reya-cronos.gelato.digital'
// Reya Network RPC: 'https://rpc.reya.network',

const privateKey = 'WALLET_PRIVATE_KEY'
const provider = ethers.getDefaultProvider('https://rpc.reya.network');
// parameter that could sign transaction
const wallet = new ethers.Wallet(privateKey, provider);
const matchOrderParams: MatchOrderParams = {
  signer: wallet as Signer,
  marginAccountId: 86, // id of margin account
  amountInBase: -0.3, // amount in ETH/BTC
  owner: {
    coreSigNonce: ownerMetadata.coreSigNonce,
  },
  market: {
    counterpartyAccountIds: market.orderInfo.counterpartyAccountIds,
    id: market.id,
    exchangeId: market.orderInfo.exchangeId,
    currentPrice: market.markPrice,
    minOrderSizeBase: market.minOrderSizeBase,
    baseSpacing: market.baseSpacing,
  },
};
const matchOrderResult: MatchOrderResult = await matchOrder(matchOrderParams);
console.log('matchOrderResult', matchOrderResult);

type MatchOrderParams = {
  signer: Signer | JsonRpcSigner;
  owner: Pick<OwnerMetadataEntity, 'coreSigNonce'>;
  marginAccountId: MarginAccountEntity['id'];
  amountInBase: number; // amount in base
  market: MarketParams;
};

type MatchOrderResult = {
  transactionHash: string | null;
  coreSigNonce: OwnerMetadataEntity['coreSigNonce'] | null; // Can be used for next nonce value
  xpBoost: number;
  isNftWon: boolean;
};

```

## Close Order

### Description
Close Order to avoid dust

### Usage

```typescript
// Reya Cronos RPC: 'https://rpc.reya-cronos.gelato.digital'
// Reya Network RPC: 'https://rpc.reya.network',

const privateKey = 'WALLET_PRIVATE_KEY'
const provider = ethers.getDefaultProvider('https://rpc.reya.network');
// parameter that could sign transaction
const wallet = new ethers.Wallet(privateKey, provider);
const closeOrderParams: CloseOrderParams = {
  signer: wallet as Signer,
  marginAccountId: 86, // id of margin account
  orderBase: -0.3, // PositionEntity['base'] // use base value from position entity inside margin account
  owner: {
    coreSigNonce: ownerMetadata.coreSigNonce,
  },
  market: {
    counterpartyAccountIds: market.orderInfo.counterpartyAccountIds,
    id: market.id,
    exchangeId: market.orderInfo.exchangeId,
    currentPrice: market.markPrice,
    minOrderSizeBase: market.minOrderSizeBase,
    baseSpacing: market.baseSpacing,
  },
};

const closeOrderResult: CloseOrderResult = await closeOrder(closeOrderParams);
console.log('closeOrderResult', closeOrderResult);

type CloseOrderParams = {
  signer: Signer | JsonRpcSigner;
  owner: Pick<OwnerMetadataEntity, 'coreSigNonce'>;
  marginAccountId: MarginAccountEntity['id'];
  orderBase: PositionEntity['base'];
  market: MarketParams;
};

type CloseOrderResult = {
  transactionHash: string | null;
  coreSigNonce: OwnerMetadataEntity['coreSigNonce'] | null;
  xpBoost: number;
  isNftWon: boolean;
};
```


## Example

### Description
Script is located in src/scripts

### Usage

```typescript
import dotenv from 'dotenv';
import {
  ApiClient,
  CandlesResolution,
  FundingRateHistoryGranularity,
  GetCandlesParams,
  GetFundingRateChartDataParams, GetMarginAccountParams, GetMarginAccountResult,
  GetMarginAccountsParams, GetMarginAccountsResult,
  GetMarketParams,
  GetMarketTradingHistoryParams, GetMaxOrderSizeAvailableParams, GetMaxOrderSizeAvailableResult,
  GetOwnerMetadataParams,
  GetOwnerMetadataResult,
  GetTradingHistoryResult,
  MarketCandlesResponse,
  MarketEntity,
  ReyaChainId, SimulateTradeEntity, TradeSimulationLoadDataParams, TradeSimulationSimulateParams,
  GetAllowedTokenResult,
  GetAllowedTokensParams
} from '@reyaxyz/api-sdk';
import { GetFundingRateChartDataResult} from "@reyaxyz/common";
import {closeOrder, CloseOrderParams, matchOrder, MatchOrderParams} from "@reyaxyz/sdk";
import {ethers, JsonRpcSigner, Signer} from "ethers";
import {CloseOrderResult, MatchOrderResult} from "@reyaxyz/sdk/src/services/orders/types";

dotenv.config();

// type ServiceEnvironment = 'production' | 'test' | 'local';
ApiClient.configure('production');
const run = async () => {
  try {
    const markets: MarketEntity[] = await ApiClient.markets.getMarkets();
    console.log('List of markets:', markets);

    const marketParams: GetMarketParams = {
      id: 1
    }
    const market: MarketEntity = await ApiClient.markets.getMarket(marketParams);
    console.log('Market:', market);

    const getCandlesParams: GetCandlesParams = {
      marketId: 1,
      resolution: CandlesResolution.FIFTEEN_MINUTES,
      fromISO: '2024-05-25T06:32:33.000Z',
      toISO: '2024-05-28T09:32:33.000Z',
    }

    const marketCandles: MarketCandlesResponse = await ApiClient.markets.getMarketCandles(getCandlesParams);
    console.log('Candles:', marketCandles);

    const getMarketTradingHistoryParams: GetMarketTradingHistoryParams = {
      marketId: 1,
      limit: 50,
    }

    const getTradingHistoryResult: GetTradingHistoryResult = await ApiClient.markets.getMarketTradingHistory(getMarketTradingHistoryParams);
    console.log('Trading history result:', getTradingHistoryResult);

    const getFundingRateChartDataParams: GetFundingRateChartDataParams = {
      marketId: 1,
      filters: {
        timeframeMs: 604800000,
        granularity: FundingRateHistoryGranularity.ONE_DAY
      }
    }

    const getFundingRateChartDataResult: GetFundingRateChartDataResult = await ApiClient.markets.getFundingRateChartData(getFundingRateChartDataParams);
    console.log('Funding rate history:', getFundingRateChartDataResult);

    const getAllowedTokensParams: GetAllowedTokensParams = {
      chainId: ReyaChainId.reyaNetwork,
    }

    const getAllowedTokenResult: GetAllowedTokenResult = await ApiClient.tokens.getAllowedTokens(getAllowedTokensParams);
    console.log('List of supported tokens on network:', getAllowedTokenResult);

    const getOwnerMetadataParams: GetOwnerMetadataParams =  {
      ownerAddress: '0xE116e2c0c2B0e7cd88060F06e2b2D7981Ef897ef'
    }
    const ownerMetadata: GetOwnerMetadataResult = await ApiClient.owner.getOwnerMetadata(getOwnerMetadataParams);
    console.log('ownerMetadata', ownerMetadata)

    const getMarginAccountsParams: GetMarginAccountsParams =  {
      address: '0xE116e2c0c2B0e7cd88060F06e2b2D7981Ef897ef'
    }

    const getMarginAccountsResult: GetMarginAccountsResult = await ApiClient.account.getMarginAccounts(getMarginAccountsParams);
    console.log('getMarginAccountsResult', getMarginAccountsResult);

    const getMarginAccountParams: GetMarginAccountParams =  {
      address: '0xE116e2c0c2B0e7cd88060F06e2b2D7981Ef897ef',
      marginAccountId: 14
    }

    const getMarginAccountResult: GetMarginAccountResult = await ApiClient.account.getMarginAccount(getMarginAccountParams);
    console.log('getMarginAccountResult', getMarginAccountResult);

    const tradeSimulationLoadDataParam: TradeSimulationLoadDataParams =  {
      marketId: 1,
      marginAccountId: 14,
    }
    await ApiClient.tradeSimulation.arm(tradeSimulationLoadDataParam);

    const tradeSimulationSimulateParams: TradeSimulationSimulateParams =  {
      amount: 100
    }
    const simulateEntity: SimulateTradeEntity = ApiClient.tradeSimulation.simulate(tradeSimulationSimulateParams)
    console.log('simulateEntity', simulateEntity);

    const getMaxOrderSizeAvailableParams: GetMaxOrderSizeAvailableParams = {
      marketId: 1,
      marginAccountId: 14,
      direction: 'long' // 'long' | 'short';
    }

    const getMaxOrderSizeAvailableResult: GetMaxOrderSizeAvailableResult = await ApiClient.account.getMaxOrderSizeAvailable(getMaxOrderSizeAvailableParams);
    console.log('getMaxOrderSizeAvailableResult:', getMaxOrderSizeAvailableResult);

    // const privateKey = 'privateKey'
    // const provider = ethers.getDefaultProvider('https://rpc.reya.network');
    // // parameter that could sign transaction
    // const wallet = new ethers.Wallet(privateKey, provider);
    // const matchOrderParams: MatchOrderParams = {
    //     // @ts-ignore
    //     signer: wallet as Signer,
    //     marginAccountId: 86, // id of margin account
    //     amountInBase: -0.3, // amount in ETH/BTC
    //     owner: {
    //         coreSigNonce: ownerMetadata.coreSigNonce,
    //     },
    //     market: {
    //         counterpartyAccountIds: market.orderInfo.counterpartyAccountIds,
    //         id: market.id,
    //         exchangeId: market.orderInfo.exchangeId,
    //         currentPrice: market.markPrice,
    //         minOrderSizeBase: market.minOrderSizeBase,
    //         baseSpacing: market.baseSpacing,
    //     },
    // };
    // const matchOrderResult: MatchOrderResult = await matchOrder(matchOrderParams);
    // console.log('matchOrderResult', matchOrderResult);

    // close order can be opposite match order, in order to avoid dust use this function
    // const closeOrderParams: CloseOrderParams = {
    //     // @ts-ignore
    //     signer: wallet as Signer,
    //     marginAccountId: 86, // id of margin account
    //     orderBase: -0.3, // PositionEntity['base'] // use base value from position entity inside margin account
    //     owner: {
    //         coreSigNonce: ownerMetadata.coreSigNonce,
    //     },
    //     market: {
    //         counterpartyAccountIds: market.orderInfo.counterpartyAccountIds,
    //         id: market.id,
    //         exchangeId: market.orderInfo.exchangeId,
    //         currentPrice: market.markPrice,
    //         minOrderSizeBase: market.minOrderSizeBase,
    //         baseSpacing: market.baseSpacing,
    //     },
    // };
    // const closeOrderResult: CloseOrderResult = await closeOrder(closeOrderParams);
    // console.log('closeOrderResult', closeOrderResult);
  } catch (error) {
    console.error('Error running script:', error);
  }
};

run();
```