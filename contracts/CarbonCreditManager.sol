// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IUniswapV2Pair {
    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

contract CarbonCreditManager {
    IUniswapV2Pair public pair;
    AggregatorV3Interface internal priceFeedUSDC;

    constructor() {
        /**
         * Network: Polygon
         * Aggregator: USDC/USD
         * Address: 0xfE4A8cc5b5b2366C1B58Bea3858e81843581b2F7
         **/
        priceFeedUSDC = AggregatorV3Interface(
            0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7
        );

        /**
         * Network: Polygon
         * LP: BCT/USDC
         * Scan: https://www.geckoterminal.com/polygon_pos/pools/0x1e67124681b402064cd0abe8ed1b5c79d2e02f64
         * Address: 0x1e67124681b402064cd0abe8ed1b5c79d2e02f64
         **/
        pair = IUniswapV2Pair(0x1E67124681b402064CD0ABE8ed1B5c79D2e02f64);
    }

    function getLatestPrice() public view returns (uint256) {
        (uint112 reserve0, uint112 reserve1, ) = pair.getReserves();

        // reserve0 = BCT, reserve1 = USDC
        uint256 bctUsdc = (uint256(reserve1) * 1e18) / uint256(reserve0);

        // read USDC/USD from chainlink
        (, int priceUsdc, , , ) = priceFeedUSDC.latestRoundData();

        return (bctUsdc * uint256(priceUsdc)) / 1e8;
    }
}

//  Interfaces with Toucan carbon offset markets

// 1. Purchase Toucan carbon tokens using stablecoins from staking pool (Use chainlink oracle for prices)

// 2. Call retire() or autoRetire() on Toucan contracts to remove carbon tokens from circulation and mark the ecological action as complete

// 3. Split carbon credit sales and rewards generated based on percentages defined in the protocol

// 4. Emit CarbonCreditRetired / CreditsPurchased etc. (include metadata hash to IPFS proof-of-offset certificate ((store beneficiary, project, amount, date)))
