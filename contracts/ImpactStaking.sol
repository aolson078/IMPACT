// Manages IMPACT staking, interacts with carbon credit systems

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {ImpactToken} from "./ImpactToken.sol";

/**
 * @title ImpactStaking
 * @notice Manages staking of Impact tokens, interacts with carbon credit systems.
 */
contract ImpactStaking {
    error NotOwner(address caller, address owner);
    error NotStaked();
    error NotStakedLongEnough(uint256 stakedDuration, uint256 requiredInterval);
    error NoRewardsToClaimYet();

    ImpactToken public immutable impactToken;

    /// @dev Mapping of token contract to user address to track staking ownership (token contract ➜ user ➜ owner)
    mapping(address => mapping(address => address)) public originalOwner;
    /// @dev Mapping of token contract to user address to last claim timestamp (token contract ➜ user ➜ timestamp)
    mapping(address => mapping(address => uint256)) public lastClaimed;
    /// @dev When the current staking period started (token contract ➜ user ➜ timestamp)
    mapping(address => mapping(address => uint256)) public stakeStart;
    /// @dev Mapping of user address to amount staked
    mapping(address => uint256) public amountStaked;

    /// @notice Interval of reward payout
    uint256 public constant INTERVAL = 1 seconds;

    /// @notice Reward amount per interval (10 tokens)
    uint256 public constant REWARD_PER_INTERVAL = 10 * 1e18;

    /**
     * @notice Contract constructor. Sets reward token
     */
    constructor(ImpactToken _token) {
        impactToken = _token;
    }

    /**
     * @notice Stakes impact tokens.
     * @param amount Amount of impact tokens to stake.
     */
    function depositTokens(uint256 amount) external {
        impactToken.transferFrom(msg.sender, address(this), amount);

        // TODO: Add mapping of tokenId to amount staked
        tokenIdToAmountStaked[address(impactToken)][msg.sender] = amount;
        originalOwner[address(impactToken)][msg.sender] = msg.sender;
        stakeStart[address(impactToken)][msg.sender] = block.timestamp;
        lastClaimed[address(impactToken)][msg.sender] = block.timestamp;
    }

    /**
     * @notice Safely withdraws impact tokens into owners account. Clears mappings tracking ownership and rewards.
     */
    function withdrawTokens() external {
        if (msg.sender != originalOwner[address(impactToken)][msg.sender])
            revert NotOwner(
                msg.sender,
                originalOwner[address(impactToken)][msg.sender]
            );

        uint256 amount = impactToken.balanceOf(address(this));
        impactToken.transfer(msg.sender, amount);

        delete originalOwner[address(impactToken)][msg.sender];
        delete stakeStart[address(impactToken)][msg.sender];
        delete lastClaimed[address(impactToken)][msg.sender];
    }

    /**
     * @notice Claims staking rewards to owner's account.
     * Checks how many INTERVAL periods has passed, transfers accrued rewards, then updates stakedTime and lastClaimed.
     */
    function claimStakeRewards() public {
        if (stakeStart[address(impactToken)][msg.sender] == 0)
            revert NotStaked();

        uint256 elapsed = block.timestamp -
            lastClaimed[address(impactToken)][msg.sender];

        if (elapsed < INTERVAL) revert NotStakedLongEnough(elapsed, INTERVAL);

        uint256 fullIntervals = elapsed / INTERVAL;

        if (fullIntervals == 0) revert NoRewardsToClaimYet();

        uint256 tokensToReward = fullIntervals * REWARD_PER_INTERVAL;

        impactToken.transfer(msg.sender, tokensToReward);

        lastClaimed[address(impactToken)][msg.sender] = block.timestamp;
    }

    /**
     * @notice Handles the receipt of impact tokens
     */
    function onERC20Received(
        address,
        address from,
        uint256 amount
    ) external returns (bytes4) {
        originalOwner[address(impactToken)][from] = from;
        stakeStart[address(impactToken)][from] = block.timestamp;
        lastClaimed[address(impactToken)][from] = block.timestamp;
        return this.onERC20Received.selector;
    }
}
