// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Mintable.sol";
import "./TC02Mock.sol";

contract OffsetMock is Ownable {
    ERC20 public inputToken;
    ERC20 public nctToken;
    TCO2Mock public tco2Token;

    constructor(
        address _inputToken,
        address _nctToken,
        address _tco2Token,
        address initialOwner
    ) Ownable(initialOwner) {
        inputToken = ERC20(_inputToken);
        nctToken = ERC20(_nctToken);
        tco2Token = TCO2Mock(_tco2Token);
    }

    function autoOffsetExactInToken(uint256 amount) external {
        require(
            inputToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        ERC20Mintable(address(nctToken)).mint(address(this), amount);
        ERC20Mintable(address(tco2Token)).mint(address(this), amount);
        tco2Token.approve(address(tco2Token), amount);
        tco2Token.burn(amount);
    }
}
