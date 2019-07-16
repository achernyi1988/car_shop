pragma solidity ^0.4.24;

import "./Arbitrator.sol";
import "./Car.sol";

contract CarShop is Arbitrator{
    //---------------------events--------------------------//
    event Delete(uint vin, bool success);
    event Edit(uint vin, bool success);
    event Add (address owner,uint vin, string model, bool success);
      
    event ConfirmSelling(uint vin, bool success); 
    
    //---------------------members--------------------------//
                                //uint - VIN
    mapping (address => mapping (uint => bool)) public carAccessibility;
    
             //vin => index
    mapping(uint => uint) public carIndex;
 
                                //vin => amount
    mapping(address => mapping (uint => uint)) buyer;
    
 
    
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
    
    function setCar(address owner, uint vin, string model, uint year, uint price) private{
        
         Car car = new Car( owner,vin, model, year, price );
         carsArr.push(car);
         
         carIndex[vin] = carsArr.length;
         carAccessibility[owner][vin] = true;
    }
    
    constructor( )   public {
        setCar(msg.sender, 0, "Honda", 2008,  1 * 10 ** uint256(18));
        setCar(msg.sender, 1, "BMW",   2010,  2 * 10 ** uint256(18));
        setCar(msg.sender, 2, "Merc",   2012, 3 * 10 ** uint256(18));
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
    
    function editCar(uint vin, string model, uint year, uint price) external isOwnerVinAvailability(msg.sender, vin) {
        
        Car car = carsArr[ getCarIndex(vin)];
 

        car.edit( model, year, price);
        
        emit Edit(vin, true);
    }
    
    function addCar(uint vin, string model, uint year, uint price) external {
    
        setCar(msg.sender, vin, model, year, price);

        emit Add (msg.sender,vin, model,  true);
    }
      
    function buy(uint vin) external payable {
          
       Car car = carsArr[ getCarIndex(vin)];
      
       require(!car.sold(),"car is already sold");
      
       car.buying(msg.value);
       
       buyer[msg.sender][vin] = msg.value;
    }
    
    function sendDelivery(uint vin)  external isOwnerVinAvailability(msg.sender, vin){
          
       Car car = carsArr[ getCarIndex(vin)];
       
       car.sendDelivery();
    }
    
    function confirmDelivery(uint vin) external isBuyerAvailability(msg.sender, vin){
        Car car = carsArr[ getCarIndex(vin)];
    
        car.confirmDelivery();
        
        delete buyer[msg.sender][vin];
        
        uint companyReward = car.price() * 10 / 100;
        
        car.owner().transfer(car.price() - companyReward);
        
        rewardAllowed += companyReward;
        
        emit ConfirmSelling(vin, true);
    }
    
    function withdrawAllReward() public onlyOwner{
        require(rewardAllowed > 0, "reward is empty");
        
        msg.sender.transfer(rewardAllowed);
        rewardAllowed = 0;
    }
    
    function getCarByVin( uint _vin) external view isVINAvailability(_vin) 
    returns (  address  owner, uint vin, uint year, uint price, string model,bool sold, Car.State state ){
            
        Car car = carsArr[ getCarIndex(_vin)];
        
        return (car.owner(), car.vin(),car.year(),car.price(),car.model(), car.sold(), car.state());
    }
    
    function getCarByIndex(uint index) external view 
    returns ( address  owner, uint vin, uint year, uint price, string model, bool sold ){
        require(index < carsArr.length, "index is out of range");
        
        Car car = carsArr[index];
              
        return (car.owner(), car.vin(),car.year(),car.price(),car.model(), car.sold());
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
}