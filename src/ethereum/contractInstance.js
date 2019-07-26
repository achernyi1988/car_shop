import web3 from "./web3"
const compiledFactory = require("./build/CarShop");

const CONTRACT_ADDRESS = "0x0cc784494f8883b54bbae50a4db8cc25cd603a56";

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






