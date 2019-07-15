pragma solidity ^0.4.25;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CarShop.sol";

contract TestCarShop {
    CarShop carShop;
    function beforeAll() public{
        carShop = CarShop(DeployedAddresses.CarShop());
    }

    function testAddCar() public {

        uint expectedNumbers = carShop.getNumberOfCars();

        carShop.addCar(3, "Ford", 2013, 5 * 10 ** uint256(18));
        //increase size after adding
        expectedNumbers++;
        uint newNumbers = carShop.getNumberOfCars();

        Assert.equal(newNumbers, expectedNumbers, "expectedNumbers is not equal");

    }

    function testEditCar() public {

        uint expectedNumbers = carShop.getNumberOfCars();

        carShop.addCar(3, "Ford", 2013, 5 * 10 ** uint256(18));
        //increase size after adding
        expectedNumbers++;
        uint newNumbers = carShop.getNumberOfCars();

        Assert.equal(newNumbers, expectedNumbers, "expectedNumbers is not equal");


        string memory expectedModel = "Ford2";
        uint expectedPrice = 6 * 10 ** uint256(18);

        carShop.editCar(3, expectedModel, 2013, expectedPrice);

        (, , , uint price, string memory model,,) = carShop.getCarByVin(3);

        Assert.equal( model, expectedModel ,"expectedModel is not equal");
        Assert.equal( price, expectedPrice ,"expectedPrice is not equal");

    }



    function testDeleteCar() public {

        uint expectedNumbers = carShop.getNumberOfCars();

        carShop.addCar(3, "Ford", 2013, 5 * 10 ** uint256(18));
        //increase size after adding
        expectedNumbers++;
        uint newNumbers = carShop.getNumberOfCars();

        Assert.equal(newNumbers, expectedNumbers, "expectedNumbers is not equal");

        carShop.deleteCar(3);
        //decrease size after deleting
        expectedNumbers--;

        newNumbers = carShop.getNumberOfCars();

        Assert.equal(newNumbers, expectedNumbers, "expectedNumbers is not equal after deleting");

    }
}