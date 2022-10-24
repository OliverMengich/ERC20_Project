const HDWalletProvider = require('truffle-hdwallet-provider');
const secrets = require('./secretword.js');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');

console.log(secrets.mnemonic);
const provider = new HDWalletProvider(
    secrets.mnemonic,
    ''
);
const web3 = new Web3(provider);
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
})();
