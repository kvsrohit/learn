const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

console.log('PHRASE IS ', process.env.ETHERIUM_PHRASE);
const provider = new HDWalletProvider(
    process.env.ETHERIUM_PHRASE, 
    'https://rinkeby.infura.io/v3/07dddbfde0aa41959ebb3effbfc59b3b'); 

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments:['Hi There!']})
      .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed at ', result.options.address, ' BY ', accounts[0]);
}
deploy();
