const CarShop = artifacts.require("CarShop");

module.exports = function(deployer) {
  deployer.deploy(CarShop);
};
