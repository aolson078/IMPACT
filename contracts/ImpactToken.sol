// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ImpactToken
 * @notice ERC20 token for ReFi project
 * @dev Extends OpenZeppelin ERC20 and Ownable.
 */
contract ImpactToken is ERC20, Ownable, Pausable {
    error BlackListed(address addr);

    error InsufficientTokens(address from, uint256 balanceAvailable);

    error IncorrectAmountToSend(uint256 sent, uint256 expected);

    error NotEnoughTokens(uint256 balanceAvailable, uint256 requiredAmount);

    error InsufficientAmountToRedeem();

    error InsufficientETH();

    error FailedTransaction();

    // --------------------------- What are the pros and cons of a max supply?
    //uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

    // Base rate for rewards per verification
    uint256 public rewardRate = 1;

    // Address for wallet containing funds for the DAO
    uint256 public constant TREASURY_ADDRESS = 0x00000000000000000000;

    /// @notice Address allowed to mint/burn via oracle-only functions
    address public oracle;

    /// @notice Tracks blacklisted addresses that cannot send/receive tokens.
    mapping(address => bool) public blacklist;

    /// @dev Mapping of user address to last claim time
    mapping(address => uint256) public lastClaimTime;

    /**
     * @notice Modifier to require that an address is not blacklisted.
     * @param _addr Address to check.
     */
    modifier notOnBlackList(address _addr) {
        if (blacklist[_addr]) revert BlackListed(_addr);
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not authorized: only oracle");
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

    // Is there a reason to set the oracle again?
    /// @notice Owner can set the oracle address
    function setOracle(address _oracle) public onlyOwner {
        oracle = _oracle;
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

    function mintTokens(address to, uint256 amount) public onlyOracle {
        _mint(to, amount);
    }

    function burnTokens(uint256 amount) public onlyOracle {
        _burn(msg.sender, amount);
    }

    function burnFrom(address from, uint256 amount) public onlyOracle {
        _burn(from, amount);
    }

    function setRewardRate(uint256 _rewardRate) public onlyOwner {
        rewardRate = _rewardRate;
    }

    function pauseTransfer() public onlyOwner {
        _pause();
    }

    function unpauseTransfer() public onlyOwner {
        _unpause();
    }
}
