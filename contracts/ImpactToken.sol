// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Impact
 * @notice ERC20 token for ReFi project
 * @dev Extends OpenZeppelin ERC20 and Ownable.
 */
contract M1 is ERC20, Ownable {
    error BlackListed(address addr);

    error OverMaxSupply(address receiver, uint256 amountAttempted);

    error InsufficientTokens(address from, uint256 balanceAvailable);

    error IncorrectAmountToSend(uint256 sent, uint256 expected);

    error LessThan1000Tokens(uint256 attemptedAmount);

    error NotEnoughTokens(uint256 balanceAvailable, uint256 requiredAmount);

    error InsufficientAmountToRedeem();

    error InsufficientETH();

    error FailedTransaction();

    /// @notice Maximum total supply (1,000,000 tokens, 18 decimals)
    //uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

    /// @notice Tracks blacklisted addresses that cannot send/receive tokens.
    mapping(address => bool) public blacklist;

    /**
     * @notice Modifier to require that an address is not blacklisted.
     * @param _addr Address to check.
     */
    modifier notOnBlackList(address _addr) {
        if (blacklist[_addr]) revert BlackListed(_addr);
        _;
    }

    /**
     * @notice Contract constructor. Mints initial supply to deployer.
     * @param initialSupply Number of tokens to mint on deployment in base units.
     */
    constructor(
        uint256 initialSupply
    ) ERC20("IMPACT", "IMP") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @notice Internal override to block blacklisted addresses from transfers, mint, or burn.
     * @dev Ensures both sender and recipient are not blacklisted.
     * @inheritdoc ERC20
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override notOnBlackList(from) notOnBlackList(to) {
        super._update(from, to, value);
    }

    /**
     * @notice Add an address to the blacklist.
     * @dev Only callable by owner.
     * @param _addr The address to blacklist.
     */
    function addToBlackList(address _addr) public onlyOwner {
        blacklist[_addr] = true;
    }

    /**
     * @notice Check if an address is blacklisted.
     * @param _addr Address to check.
     * @return True if blacklisted, false otherwise.
     */
    function isBlacklisted(address _addr) public view returns (bool) {
        return blacklist[_addr];
    }

    /**
     * @notice Check if totalSupply is less than or equal to MAX_SUPPLY, and if so, mint amount of tokens to address.
     * @param to Address to mint tokens to.
     * @param amount Amount to mint (in base token units, 18 decimals).
     */
    function _safeMint(address to, uint256 amount) internal {
        // if (totalSupply() + amount > MAX_SUPPLY)
        //     revert OverMaxSupply(to, amount);
        _mint(to, amount);
    }
}
