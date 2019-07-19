pragma solidity ^0.4.24;

contract Car{

    enum State  {IDLE, BUY, SEND_DELIVERY, SOLD}

    address public owner;
    uint public vin; // Vehicle Identification Number
    uint public  year;
    uint public price;
    bytes32 public model;
    string public image_hash; //IPFS
    State public state;
    bool  public sold;
    uint  public timestamp; //create or edit update




    constructor( address _owner, uint _vin, bytes32 _model, uint _year, uint _price, bool _sold, string _image_hash) public {
        owner = _owner;
        vin =   _vin;
        year =  _year;
        price = _price;
        model = _model;
        image_hash = _image_hash;
        timestamp = now;
        sold = _sold;
        state = State.IDLE;
    }


    function edit( bytes32 _model, uint _year, uint _price, string _image_hash) public {
        year =  _year;
        price = _price;
        model = _model;
        image_hash = _image_hash;
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