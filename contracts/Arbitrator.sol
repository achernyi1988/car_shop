pragma solidity ^0.4.24;

contract Arbitrator{

    //Owner of the contract
    //and third side who can help to solve the issue beetwen saller and buyer if needed
    address public arbitrator;

    constructor() public {
        arbitrator = msg.sender;
    }
    modifier onlyOwner {
        require(arbitrator == msg.sender, "arbitrator is allowed only");
        _;
    }
}
