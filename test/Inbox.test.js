const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

// This part is for deployment on local server
beforeEach(async () => {
   // Get a list of all accounts from ganache
   accounts = await web3.eth.getAccounts()

   // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ["Hi there!"] })
      .send({ from: accounts[0], gas:'1000000' })
   
})

// This part is for testing
describe('Inbox', () => {
   it('Deployed the contract', () => {
      assert.ok(inbox.options.address);
   });

   it('Has a default message',async () => {
      const message = await inbox.methods.message().call();
      assert.equal(message, 'Hi there!');
   })
})
















// class Car {
//    park() {
//       return "stopped";
//    }
//    drive() {
//       return "vroom";
//    }
// }

// let car;

// beforeEach(() => {
//    console.log("a");
//    car = new Car();
// })

// describe('Car', () => {
//    it('can park', () => {
//       assert.equal(car.park(), 'stopped');
//    });

//    it('can drive', () => {
//       assert.equal(car.drive(), 'vroom');
//    })
// })