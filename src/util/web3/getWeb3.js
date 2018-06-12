import Web3 from 'web3'
import { setInvestButton } from '../investButton'
export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'

function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = () => (dispatch) => {
  return new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function () {
      var results
      var web3 = window.web3

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider)
        web3.version.getNetwork((err, netId) => {
          let netIdName;
          switch (netId) {
            case "1":
              netIdName = 'MAINNET'
              console.log('This is mainnet')
              break
            case "2":
              netIdName = 'MORDEN'
              console.log('This is the deprecated Morden test network.')
              break
            case "3":
              netIdName = 'ROPSTEN'
              console.log('This is the ropsten test network.')
              break
            case "4":
              netIdName = 'RINKEBY'
              console.log('This is rinkeby')
              break
            case "42":
              netIdName = 'KOVAN'
              console.log('This is kovan')
              break
            default:
              netIdName = 'LOCAL'
              console.log('This is an unknown network.')
          }
          results = {
            web3Instance: web3,
            netIdName,
            netId,
            injectedWeb3: true
          }
          resolve(dispatch(web3Initialized(results)))
        })

        console.log('Injected web3 detected.');

      } else {
        dispatch(setInvestButton({ isDisabled: true }))
        // Fallback to localhost if no web3 injection.
        const { RPC_URL, netIdName, netId } = { RPC_URL: 'https://kovan.infura.io/metamask', netIdName: 'KOVAN', netId: '42' }
        // const {RPC_URL, netIdName, netId} = {RPC_URL: 'https://mainnet.infura.io/metamask', netIdName: '', netId: '1'}
        // const {RPC_URL, netIdName, netId} = {RPC_URL: 'https://ropsten.infura.io/metamask', netIdName: 'ROPSTEN', netId: '2'}
        // const {RPC_URL, netIdName, netId} = {RPC_URL: 'https://rinkeby.infura.io/metamask', netIdName: 'RINKEBY', netId: '4'}
        var provider = new Web3.providers.HttpProvider(RPC_URL)
        web3 = new Web3(provider)

        results = {
          web3Instance: web3,
          netIdName,
          netId,
          injectedWeb3: false,
        }

        console.log('No web3 instance injected, using Local web3.');

        resolve(dispatch(web3Initialized(results)))
        
      }
    })
  })
}

export default getWeb3

