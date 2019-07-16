const HWWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/Election");
const fs = require('fs-extra');

const provider = new HWWalletProvider(
    'velvet weasel owner rookie agree fit cushion like burden dance tragic lock',
    'https://rinkeby.infura.io/v3/57028538b43b43ba80e3f61b7e6b5390',
    // "diagram alcohol plate absurd phone again right child muffin praise rose tell",
    // "HTTP://127.0.0.1:9545",
    0,
    10
);


const web3 = new Web3(provider);


const deploy = async () => {

    try {
        const accounts = await web3.eth.getAccounts();

        console.log("Attempting to deploy from account = ", accounts);


        const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({data: '0x' + compiledFactory.bytecode})
            .send({gas: "3000000", from: accounts[1]}); //create contract with second address as admin.


        console.log("Contract deployed at", result.options.address);
    }catch (e) {
        console.log(e.message);
    }

  //      fs.appendFileSync("ethereum/CONTRACT_ADDRESS", `\r\n${result.options.address}`);
};
deploy();