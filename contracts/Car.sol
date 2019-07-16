pragma solidity ^0.4.24;

contract Car{

    enum State  {IDLE, BUY, SEND_DELIVERY, CONFIRM_DELIVERY}

    address public owner;
    uint public vin; // Vehicle Identification Number
    uint public  year;
    uint public price;
    string public model;
    State public state;
    bool public sold;

    constructor( address _owner, uint _vin, string _model, uint _year, uint _price) public {
        owner = _owner;
        vin =   _vin;
        year =  _year;
        price = _price;
        model = _model;
        sold = false;
        state = State.IDLE;
    }

    function edit( string _model, uint _year, uint _price) public {
        year =  _year;
        price = _price;
        model = _model;
    }

    function buying(uint amount) isValidState(State.IDLE) public payable{

        require(amount == price , "amount is not equal to price");

        state = State.BUY;

    }

    function sendDelivery() isValidState(State.BUY) public{
        state = State.SEND_DELIVERY;
    }

    function confirmDelivery() isValidState(State.SEND_DELIVERY) public{
        state = State.CONFIRM_DELIVERY;
        sold = true;
    }


    modifier isValidState(State _state){
        require(state == _state, "not valid state");
        _;
    }
}