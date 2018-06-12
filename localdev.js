var contract = require('truffle-contract');
var Web3 = require('web3');
var PresaleABI = require('aigang-contracts/build/contracts/PreSale.json')

var provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
console.log(web3.eth.accounts[0])
var presale = contract(PresaleABI)
presale.setProvider(provider)
presale.setNetwork(1337)
presale.defaults({
    from: web3.eth.accounts[0],
    gas: 1999999
})
var instance;
presale.deployed().then((i)=> {
    instance = i;
    return i.initialize(web3.eth.accounts[0], 1000000, 1, 13294234, 123123123213)
}).then((b) => {
    console.log('sdf', b)
    return instance.startBlock.call()
}).then((bb)=> {
    console.log(bb.toNumber())
})