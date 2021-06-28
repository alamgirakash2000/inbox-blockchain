const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mnemonic = 'furnace ripple plunge snow direct author extra sample very case bike payment';
const rinkebyEnd = 'https://rinkeby.infura.io/v3/15ebeb02363149d697d492aabeb7a6cf'

const provider = new HDWalletProvider(
   {
      mnemonic: mnemonic,
      providerOrUrl: rinkebyEnd,
      addressIndex: 1
    }
)
const web3 = new Web3(provider);



const deploy = async () => {
   const accounts = await web3.eth.getAccounts();

   console.log("Attempting to deploy from account:", accounts[0]);
   
 let result = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data: bytecode, arguments: ["Hi there!"] })
   .send({ from: accounts[0], gas:'1000000' })
   console.log('Contract deployed to : ', result.options.address);
}
deploy();