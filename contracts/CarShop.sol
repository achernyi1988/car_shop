pragma solidity ^0.4.24;

import "./Arbitrator.sol";
import "./Car.sol";

contract CarShop is Arbitrator{

    //convert from ether to wei
    uint private WEI = 10 ** uint256(18);

    //---------------------events--------------------------//
    event Delete(uint vin, bool success);
    event Edit(uint vin, bool success);
    event Add (address owner,uint vin, string model, bool success);

    event ConfirmSelling(uint vin, uint price,  bool success);

    //---------------------members--------------------------//
    //uint - VIN
    mapping (address => mapping (uint => bool)) public carAccessibility;

    //vin => index
    mapping(uint => uint) public carIndex;

    //vin => amount
    mapping(address => mapping (uint => uint)) buyer;

    // all  history chain of the car
    mapping (uint => Car []) public carLogger;
    //car list
    Car [] public carsArr;

    // reward which is allowed to be withdrawn by shop.
    uint public rewardAllowed;

    //---------------------functions--------------------------//

    function getContractBalance() external view returns (uint balance){
        return address(this).balance;
    }

    function getNumberOfCars() external view returns(uint index){
        return carsArr.length;
    }

    function createCar(address owner, uint vin, string model, uint year, uint price) private{

        Car car = new Car( owner,vin, model, year, price, false );
        carsArr.push(car);

        //create a copy in order to track a full car history.Expensive
        carLogger[vin].push(new Car( owner,vin, model, year, price, false ));

        carIndex [vin] = carsArr.length;
        carAccessibility[owner][vin] = true;
    }

    constructor( )   public {
        createCar(msg.sender, 0, "Honda", 2008, 1 * WEI);
        //createCar(msg.sender, 1, "BMW",   2010, 2 * WEI);
        //createCar(msg.sender, 2, "Merc",  2012, 3 * WEI);
    }

    function deleteCar(uint vin) public isOwnerVinAvailability(msg.sender, vin) {

        uint index = getCarIndex(vin);

        for(uint i = index; i < carsArr.length - 1; ++i){
            carsArr[i] = carsArr[i+1];
            //update car index respectively
            carIndex[carsArr[i].vin()]--;
        }

        delete carsArr[carsArr.length-1];
        carsArr.length--;

        delete carIndex[vin];

        emit Delete(vin, true);
    }

    function editCar(uint vin, string model, uint year, uint price) external isOwnerVinAvailability(msg.sender, vin)  {

        Car car = carsArr[ getCarIndex(vin)];

        car.edit( model, year, price * WEI);

        //create a copy in order to track a full car history.Expensive
        carLogger[vin].push(new Car( msg.sender,vin, model, year, price * WEI, false ));

        emit Edit(vin, true);
    }

    function addCar(uint vin, string model, uint year, uint price) external {

        createCar(msg.sender, vin, model, year, price * WEI);

        emit Add (msg.sender,vin, model,  true);
    }

    function buy(uint vin) external payable {

        Car car = carsArr[ getCarIndex(vin)];

        require(!car.sold(),"car is already sold");

        car.buy(msg.value);

        buyer[msg.sender][vin] = msg.value;
    }

    function sendDelivery(uint vin)  external isOwnerVinAvailability(msg.sender, vin){

        Car car = carsArr[ getCarIndex(vin)];

        car.sendDelivery();
    }

    function confirmDelivery(uint vin) external isBuyerAvailability(msg.sender, vin){
        Car car = carsArr[ getCarIndex(vin)];

        delete buyer[msg.sender][vin];

        //company takes 10 percent for service :)
        uint companyReward = car.price() * 10 / 100;
        //send money to seller
        car.owner().transfer(car.price() - companyReward);

        //change owner
        car.confirmDelivery(msg.sender);

        rewardAllowed += companyReward;

        //create a copy in order to track a full car history.Expensive
        carLogger[vin].push(new Car( msg.sender,vin, car.model(), car.year(), car.price(), true ));

        emit ConfirmSelling(vin, car.price(), true);
    }

    function withdrawAllReward() public onlyOwner{
        require(rewardAllowed > 0, "reward is empty");

        msg.sender.transfer(rewardAllowed);
        rewardAllowed = 0;
    }

    function getCarByVin( uint _vin) external view isVINAvailability(_vin)
    returns (  address  owner, uint vin, uint year, uint price, string model,bool sold, Car.State state, uint timestamp ){

        Car car = carsArr[ getCarIndex(_vin)];

        return (car.owner(), car.vin(),car.year(),car.price(),car.model(), car.sold(), car.state(), car.timestamp());
    }

    function getCarByIndex(uint index) external view
    returns ( address  owner, uint vin, uint year, uint price, string model,bool sold, Car.State state, uint timestamp ){
        require(index < carsArr.length, "index is out of range");

        Car car = carsArr[index];

        return (car.owner(), car.vin(),car.year(),car.price(),car.model(), car.sold(), car.state(), car.timestamp());
    }

    function getHistoryLogCarLength(uint _vin) external view isVINAvailability(_vin) returns( uint length){
        return carLogger[_vin].length;
    }

    function getHistoryLogCar(uint _vin, uint _idx) external view isCarLoggerVINAvailability(_vin)
    returns ( address  owner, uint vin, uint year, uint price, string model,bool sold, Car.State state, uint timestamp ){

        //use storage to save gas
        Car  [] storage carArray  = carLogger[_vin];

        require(_idx < carArray.length,"out of range");

        Car car = carArray[_idx];

        return (car.owner(), car.vin(),car.year(),car.price(),car.model(), car.sold(), car.state(), car.timestamp());
    }


    function getCarIndex(uint vin) private view returns(uint){
        require(0 < carIndex[vin] && carIndex[vin] - 1 < carsArr.length , "not valid car's vin ");
        return carIndex[vin] - 1; // on purpuse to have a correct index
    }


    modifier isOwnerVinAvailability(address sender, uint vin) {
        require(carAccessibility[sender][vin] || arbitrator == sender, "no car found by address/vin");
        _;
    }

    modifier isBuyerAvailability(address sender, uint _vin) {
        require(0 < buyer[sender][_vin] || arbitrator == sender, "no bayer found by address/vin");
        _;
    }

    modifier isVINAvailability( uint vin) {
        require(0 < carIndex[vin], "no car found by vin");
        _;
    }

    modifier isCarLoggerVINAvailability( uint vin) {
        require(0 < carLogger[vin].length, "no car logger found by vin");
        _;
    }
}