import web3 from "./web3"
const compiledFactory = require("./build/CarShop");

const CONTRACT_ADDRESS = "0x046807337ca2c0af25d46628cc30835f3c7bd458";

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
    console.log("smartContractData err", err.message);
})






