import web3 from "./web3"
const compiledFactory = require("./build/CarShop");

const CONTRACT_ADDRESS = "0xc8e920b19957fcaa03ed5939e5904426f81b44c5";

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






