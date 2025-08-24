// Processes verified claims, issues IMPACT tokens

// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Verifier {
    address verifier = address(0);

    mapping(uint256 => Action) public actions;

    struct Action {
        uint256 id;
        address user;
        uint256 timestamp;
        string ipfsLink;
        bool verified;
    }

    event ActionSubmitted(
        uint256 indexed id,
        address indexed user,
        uint256 timestamp,
        string ipfsLink,
        bool verified
    );

    event ActionVerified(
        uint256 indexed id,
        address indexed user,
        uint256 timestamp,
        string ipfsLink,
        bool verified
    );

    modifier onlyVerifier() {
        require(msg.sender == verifier);
        _;
    }

    constructor() {}

    function submitActionVerification(Action memory _action) public {
        actions[_action.id] = _action;
        emit ActionSubmitted(
            _action.id,
            _action.user,
            _action.timestamp,
            _action.ipfsLink,
            _action.verified
        );
    }

    function verifySubmittedAction(uint256 _actionId) public onlyVerifier {
        actions[_actionId].verified = true;
        emit ActionVerified(
            actions[_actionId].id,
            actions[_actionId].user,
            actions[_actionId].timestamp,
            actions[_actionId].ipfsLink,
            actions[_actionId].verified
        );
    }

    function setVerifier(address _verifier) public {
        verifier = _verifier;
    }

    function getVerifier() public view returns (address) {
        return verifier;
    }

    function distributeRewards() public {}
}
