const HDWalletProvider = require('@truffle/hdwallet-provider');
const secrets = require('./secretword.js');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const { exit } = require('process');
// const provider = new HDWalletProvider({
//     mnemonic:{
//         phrase: secrets.mnemonic,
//     },
//     providerOrUrl: 'http://localhost:7545',
// });
const privateKeys = [
    'eaf1128847a9b3295e52d1f9542328393c1cbd91b8c08e7dd3bf9287e37030ce',
    '5953d4f4ade838714a9f0ceb7135e39f17749fe45bdfef0df5c3efa578b0d6ec'
]
const provider = new HDWalletProvider(privateKeys, 'http://localhost:7545', 0, 2);
// const provider = new HDWalletProvider('provider');
const web3 = new Web3(provider);
web3.utils.toWei('1','ether');
//define the contract's ABI
const abiPath = path.resolve(__dirname,'bin','ERC20.abi');
const abi = JSON.parse(fs.readFileSync(abiPath,'utf-8'));
//define the bytecode
const bytecodePath = path.resolve(__dirname,'bin','ERC20.bin');
const bytecode = fs.readFileSync(bytecodePath,'utf-8');

(async () => {
    //get address associated with our mnemonic
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0]);
    const result = await new web3.eth.Contract(abi)
        .deploy({data: bytecode})
        .send({gas: '1000000', from: accounts[0]});
    console.log('Contract deployed to',result.options.address);
    exit(0);
})();
provider.engine.stop();