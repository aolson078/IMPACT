// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IUniswapV2Pair {
    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

contract BctUsdOracle {
    // --- constants (Polygon) ---
    address constant BCT = 0x2F800Db0fdb5223b3C3f354886d907A671414A7F;
    address constant USDCe = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174; // bridged USDC (6d)
    address constant BCT_USDCe_PAIR =
        0x1E67124681b402064CD0ABE8ed1B5c79D2e02f64;

    AggregatorV3Interface public usdcUsdFeed;

    constructor(address _usdcUsdFeed) {
        uint256 sz;
        assembly {
            sz := extcodesize(_usdcUsdFeed)
        }
        require(sz > 0, "feed has no code");
        usdcUsdFeed = AggregatorV3Interface(_usdcUsdFeed);
        // also sanity check it behaves like a feed
        (, int256 ans, , , ) = usdcUsdFeed.latestRoundData();
        require(ans > 0, "feed not answering");
    }

    // --- the price function (overflow-safe, 8 decimals output) ---
    function bctUsdPrice()
        external
        view
        returns (uint256 price, uint256 lastUpdatedAt)
    {
        (uint112 r0, uint112 r1, ) = IUniswapV2Pair(BCT_USDCe_PAIR)
            .getReserves();
        address t0 = IUniswapV2Pair(BCT_USDCe_PAIR).token0();

        // In this pair: token0 = USDC.e (6d), token1 = BCT (18d)
        (uint256 reserveUSDC, uint256 reserveBCT) = t0 == USDCe
            ? (uint256(r0), uint256(r1))
            : (uint256(r1), uint256(r0));
        require(reserveUSDC > 0 && reserveBCT > 0, "empty reserves");

        (, int256 ans, , uint256 updatedAt, ) = usdcUsdFeed.latestRoundData();
        require(ans > 0, "bad feed");
        uint8 feedDec = usdcUsdFeed.decimals();
        lastUpdatedAt = updatedAt;

        // USDC 6d -> 18d
        uint256 usdc18 = reserveUSDC * 1e12;
        uint256 usdFactor18 = (usdc18 * uint256(ans)) / (10 ** feedDec);

        price = (usdFactor18 * 1e8) / reserveBCT;
    }
}
