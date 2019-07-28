import web3 from "./web3"
const compiledFactory = require("./build/CarShop");

const CONTRACT_ADDRESS = "0xeea264d5bba827db59e2aec47189bda78ba48e91";

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






