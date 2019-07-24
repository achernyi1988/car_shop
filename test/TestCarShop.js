const CarShop = artifacts.require("CarShop");


contract("CarShop test", async accounts => {

    it("buy a car", async () => {
        console.log("run buy a car");
        let instance;
        let vin = 3;
        let ether = 10;
        let image = "image";

        let admin  = accounts [0];
        let seller = accounts [1];
        let bayer  = accounts [2];

        return CarShop.deployed( {from: admin })
            .then(ins =>{
                //got contract's instance
                instance = ins;

                instance.addCar(vin, "Ford", 2013, ether,image, {from: seller});
                return instance.getCarByVin(vin)
             })
             .then(car =>{
                 console.log("added a new car", JSON.stringify(car));
             })
             .then(  () => {
                 return instance.buy(vin, {from: bayer, value: web3.toWei(ether, 'ether')})
             })
             .then(()=> {
                 return instance.getCarByVin(vin)
             })
             .then( car =>{
                 console.log("buy",JSON.stringify(  car ));
             })
             .then(()=>{
                 return instance.sendDelivery(vin, {from: seller});
             })
             .then(() =>{
                 return instance.confirmDelivery(vin, {from: bayer});
             })
             .then( () =>{
                 return instance.getCarByVin(vin)
             })
             .then((car) =>{
                 console.log("confirmDelivery",JSON.stringify(  car ));
             }).catch(error =>{
                 console.log("catch", error)
            })

        });
});