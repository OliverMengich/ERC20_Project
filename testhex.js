const HDWalletProvider = require('@truffle/hdwallet-provider');
const ethereumjsWallet = require('ethereumjs-wallet');

const Web3 = require('web3');
const {exit} = require('process')
const privateKeys = [
    'eaf1128847a9b3295e52d1f9542328393c1cbd91b8c08e7dd3bf9287e37030ce',
    '5953d4f4ade838714a9f0ceb7135e39f17749fe45bdfef0df5c3efa578b0d6ec'
]
const provider = new HDWalletProvider(privateKeys, 'http://localhost:7545', 0, 2);
// const provider = new HDWalletProvider('provider');
const web3 = new Web3(provider);
var valInWei = web3.utils.toWei('1.4','ether');
var HexInEthers = web3.utils.toHex(valInWei);
console.log(HexInEthers);
// console.log(web3.utils.randomHex(3));
provider.engine.stop();
exit(0);