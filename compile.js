const path = require('path');
const fs = require('fs');
const solc = require('solc');

const educTokenPath = path.resolve(__dirname,'contract','ERC20.sol');
const source = fs.readFileSync(educTokenPath,'utf-8');
var input = {
    language: 'Solidity',
    sources:{
        'ERC20.sol':{
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
var contract = output.contracts['ERC20.sol']['EDUCTOKEN'];
var dirName = 'bin';
const contractByteCodePath = path.join(dirName,'ERC20.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);
const contractAbiPath = path.join(dirName,'ERC20.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));
