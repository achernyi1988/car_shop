pragma solidity ^0.4.24;

contract Car{

    enum State  {IDLE, BUY, SEND_DELIVERY, SOLD}

    address public owner;
    uint public vin; // Vehicle Identification Number
    uint public  year;
    uint public price;
    string public model;
    State public state;
    bool  public sold;
    uint  public timestamp; //create or edit update




    constructor( address _owner, uint _vin, string _model, uint _year, uint _price, bool _sold) public {
        owner = _owner;
        vin =   _vin;
        year =  _year;
        price = _price;
        model = _model;
        timestamp = now;
        sold = _sold;
        state = State.IDLE;
    }


    function edit( string _model, uint _year, uint _price) public {
        year =  _year;
        price = _price;
        model = _model;
        timestamp = now;
    }

    function buy(uint amount) isValidState(State.IDLE) public payable{

        require(amount == price , "amount is not equal to price");

        state = State.BUY;
    }

    function sendDelivery() isValidState(State.BUY) public{
        state = State.SEND_DELIVERY;
    }

    function confirmDelivery(address newOwner) isValidState(State.SEND_DELIVERY) public{
        state = State.SOLD;
        sold = true;
        owner = newOwner;
    }


    modifier isValidState(State _state){
        require(state == _state, "not valid state");
        _;
    }
}