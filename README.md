
The best experience to use this application is to have Metamask(my case) or Mist. The idea, you can change dynamically the wallet's addresses(bayers/ sellers) much easier to have fun.

How to:

Note: We bring up the ethereum private network here. But, Of course, instead we can use ganache or event public network. No issue with that.

1) got to src\ethereum\private_network_config\genesis.json 
2) geth --datadir datadir init genesis.json
3) geth --rpc  --rpcapi "admin,debug,miner,shh,txpool,personal,eth,net,web3" --datadir datadir --networkid 15 --rpccorsdomain "*" console
4) personal.newAccount("1")   				 
5) personal.unlockAccount(eth.accounts[0],"1", 0)   // the account is unlocked untill geth stops running
5) miner.start(1)

6) OPTIONAL.   Add RPC connetion with  localhost HTTP://127.0.0.1:8545 to metaMask. Also you need to import UTC*.json file(your account) in metamask. Check there if you already have ether after mining:) . One more point, if metamask doesn't show confirmation popup during transactions, please, go to matamask settings->privacy->privacy mode should be off. Reload the website.

7) run a new console.
8) truffle migrate --reset compile --all
9) copy paste the generated CarShop address to src\ethereum\contractInstance.js      // const CONTRACT_ADDRESS = "XXXXX"

10) OPTIONAL: truffle test . Please, use Ganache which is the best one here as it has many addresses and it's fast. Please, don't forget to shutdown the private network where is the same port has beeb used (8545)

11) npm install 
12) npm start  //which run the browser page. By default: localhost:3000

First of all, I didn't spend time on design. Sorry for that :)
The application allows you to put in trade your car and get money. Please, add your car. A Car image could be appeared in some time 2-3 minutes as we use IPFS technology.

Actions on website:
1)View cars.
2)Edit/Delete yours.(Only owner of the car is allowed to do it)
3)Search car by VIN code.
4)withdraw money if you are company owner. Otherwise the button is not present.
5)And of course, buy/ send car(delivery) / confirm car (delivery) .

Note: you can find a website image in root of project. (website_image folder )

If I can be of assistance, please do not hesitate to contact me.