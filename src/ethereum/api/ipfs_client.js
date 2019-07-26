
var ipfsAPI = require( 'ipfs-api')

//const ipfs = new ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'}); for local host running.
const ipfs = new ipfsAPI({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

export default ipfs;