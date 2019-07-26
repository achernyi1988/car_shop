
The best experience to use this application is to have Metamask(my case) or Mist. The idea, you can change dynamically the wallet addresses(bayer/ seller) much easier to have fun.

How to:

1) got to src\ethereum\private_network_config\genesis.json 
2) geth --datadir datadir init genesis.json
3) geth --rpc  --rpcapi "admin,debug,miner,shh,txpool,personal,eth,net,web3" --datadir datadir --networkid 15 --rpccorsdomain "*" console
4) personal.newAccount("1")
5) personal.unlockAccount(eth.accounts[0])   // from time to time you need to unlock account if you don't use metamask.
5) miner.start(1)
6) optional.   Add RPC connetion with  localhost HTTP://127.0.0.1:8545 to metaMask. Check there if you already have ether :)
7) run a new console.
8) truffle migrate --reset compile --all
9) copy paste the generated CarShop address to src\ethereum\contractInstance.js      | const CONTRACT_ADDRESS = "XXXXX"
10) optional: truffle test . Please, use Ganache which is the best one here as it has many addresses and it's fast. 

11) npm install 
12) npm start  //which run the browser page. Default is localhost:3000

First of all, I didn't spend time on design. Sorry for that :)
The application allows you to put in trade your car and get money.

Actions:
1)View cars.
2)Edit/Delete yours.(Only owner of the car is allowed)
3)Search car by VIN code.
4)withdraw money if you are company owner. Otherwise the button is not present.
5)And of course, buy/ send car(delivery) / confirm car (delivery) .

If I can be of assistance, please do not hesitate to contact me.