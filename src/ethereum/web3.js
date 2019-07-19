import Web3 from "web3";
import HWWalletProvider from  "truffle-hdwallet-provider";
let web3;


// if(typeof window !== "undefined" && typeof window.web3 !== "undefined") {
// // we are in the browser and metamask is running.
//
//     web3 = new Web3(window.web3.currentProvider);
// } else{

    // console.log("we are on the server OR the user is not running metamask");
    // const provider = new Web3.providers.HttpProvider(
    //     'https://rinkeby.infura.io/v3/57028538b43b43ba80e3f61b7e6b5390'
    // );

// const provider = new HWWalletProvider(
//     // 'velvet weasel owner rookie agree fit cushion like burden dance tragic lock',
//     // 'https://rinkeby.infura.io/v3/57028538b43b43ba80e3f61b7e6b5390',
//
//     "diagram alcohol plate absurd phone again right child muffin praise rose tell",
//     "HTTP://127.0.0.1:8545",
//     0,
//     10
// );
//
// if( typeof window !== "undefined" &&
//     typeof window.web3 !== "undefined" &&
//     typeof window.web3.currentProvider.selectedAddress !== "undefined" ) {
// // we are in the browser and metamask is running.
//     console.log("use current address  ", window.web3);
//     web3 = new Web3(window.web3.currentProvider);
// }else{
//     web3 = new Web3(provider);
// }

 web3 = new Web3('http://localhost:8545');

console.log("web3 web3 web3 ", web3);
// }

export default web3;
