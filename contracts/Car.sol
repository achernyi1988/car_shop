pragma solidity ^0.4.24;

contract Car{

    enum State  {IDLE, BUY, SEND_DELIVERY, SOLD}

    address public owner;
    address public buyer;
    uint public vin; // Vehicle Identification Number
    uint public  year;
    uint public price;
    bytes32 public model;
    string public image_hash; //IPFS
    State public state;
    bool  public sold; //possible not need this variable as we have State
    uint  public timestamp; //create or edit update

    constructor( address _owner, uint _vin, bytes32 _model, uint _year, uint _price, bool _sold, string _image_hash, State _state) public {
        owner = _owner;
        buyer = 0x00;
        vin =   _vin;
        year =  _year;
        price = _price;
        model = _model;
        image_hash = _image_hash;
        timestamp = now;
        sold = _sold;
        state = _state;
    }


    function edit( bytes32 _model, uint _year, uint _price, string _image_hash) public {
        year =  _year;
        price = _price;
        model = _model;
        image_hash = _image_hash;
        timestamp = now;
    }

    function buy(address _buyer, uint amount) isValidState(State.IDLE) public payable{

        require(amount == price , "amount is not equal to price");

        buyer = _buyer;

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
        require(state == _state, "invalid state");
        _;
    }
}