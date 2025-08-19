// Processes verified claims, issues IMPACT tokens

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Verifier {
    address verifier = address(0x00000000000000000000);

    modifier onlyVerifier() {
        require(msg.sender == verifier);
        _;
    }

    constructor() {}

    function submitActionVerification() public {}

    function verifySubmittedAction() public view {}

    function setVerifier(address _verifier) public {
        verifier = _verifier;
    }

    function getVerifier() public view returns (address) {
        return verifier;
    }

    function distributeRewards() public {}
}
