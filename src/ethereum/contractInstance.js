import web3 from "./web3"
const compiledFactory = require("./build/CarShop");



// PRIVATE_KEY = "109D58463D2A21022382C21C9A4FA0CDDAA6E20B4FDF9CFD2304E182DCC56CBE";
//const CONTRACT_ADDRESS = "0xb9258f83C6c3339Dab568D356A77dd22c6B00042";  //rinkby
//const CONTRACT_ADDRESS = "0x40a03f3c2022102f861479d8ed466f7aab8ded17";    //ganache
const CONTRACT_ADDRESS = "0x7eedc9501447a823378d3ceb2af391a08605c9c2";    //private network

const createInstance = async() => {

    let accounts = await web3.eth.getAccounts();

    let instanceSM =  await new web3.eth.Contract((compiledFactory.abi), CONTRACT_ADDRESS);

    return {instanceSM, accounts }
}

export const smartContractData =  createInstance().then( contractObj => {

    console.log("smartContractData", contractObj);
    return contractObj;
    }
).catch(err => {
    console.log("instanceSM", err.message);
})






