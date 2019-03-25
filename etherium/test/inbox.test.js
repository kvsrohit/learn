const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();

const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');
let accounts;
let inbox;
const initialMessage = 'Hi There!';
describe('Inbox', () => {
  beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
  
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments:[initialMessage]})
      .send({from: accounts[1], gas: '1000000'});
    
    inbox.setProvider(provider);
  });
  
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async() => {
    assert.equal(initialMessage, await inbox.methods.message().call());
  });

  it('can change the message', async() => {
    const newMessage = 'Bye!'
    let transaction = await inbox.methods.setMessage(newMessage).send({from: accounts[1], gas: '1000000'});

    assert.equal(newMessage, await inbox.methods.message().call());

  });

});
