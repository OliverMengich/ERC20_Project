const path = require('path');
const fs = require('fs');
const solc = require('solc');

const educTokenPath = path.resolve(__dirname,'contract','USDC.sol');
const source = fs.readFileSync(educTokenPath,'utf-8');
var input = {
    language: 'Solidity',
    sources:{
        'USDC.sol':{
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*':{
                '*': ['*']
            }
        }
    }
};
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
var contract = output.contracts['USDC.sol']['USDC'];
var dirName = 'bin';
const contractByteCodePath = path.join(dirName,'USDC.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);
const contractAbiPath = path.join(dirName,'USDC.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));
