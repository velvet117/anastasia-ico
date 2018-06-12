import contract from 'truffle-contract'
import { loadPresale } from './contracts/loadPresale'
import { loadAccount } from './web3/loadAccount'
import PresaleABI from 'AnastasiaIco/build/contracts/AnastasiaICO.json'
import TokenABI from 'AnastasiaIco/build/contracts/AnastasiaToken.json'
const ICO_ADDRESS = '0xA7E47C6c40Cd60b62c270DB32262b5871A3B5314'

export default ({ web3, netId, injectedWeb3 }) => (dispatch) => {
    const presale = contract({abi: PresaleABI.abi})
    const token = contract({abi: TokenABI.abi})
    presale.setProvider(web3.currentProvider)
    token.setProvider(web3.currentProvider)
    presale.setNetwork(netId)
    token.setNetwork(netId)
    presale.defaults({
        from: web3.eth.accounts[0],
        gas: 300000,
    })
    token.defaults({
        from: web3.eth.accounts[0],
    })

    if(injectedWeb3){
        dispatch(loadAccount({ web3 }))
    }
    dispatch(loadPresale({ presale, token, ICO_ADDRESS, fromWei: web3.fromWei, account: web3.eth.accounts[0] }))
}