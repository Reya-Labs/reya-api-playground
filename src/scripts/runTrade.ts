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