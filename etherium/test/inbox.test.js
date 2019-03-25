const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();

const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');
let accounts;
let inbox;

describe('Inbox', () => {
  beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
  
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments:['Hi There!']})
      .send({from: accounts[1], gas: '1000000'});
    
    inbox.setProvider(provider);
  });
  
  it('deploys a contract', () => {
    console.log(inbox.options.address);
  });
});
