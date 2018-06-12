import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import getWeb3 from './util/web3/getWeb3'
import initContracts from './util/initContracts'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'font-awesome/css/font-awesome.css';

// Layouts
import App from './App'
// Redux Store
import store from './store'

// Initialize web3 and set in Redux.

store.dispatch(getWeb3())
.then(results => {
  const web3 = results.payload.web3Instance
  const netId = results.payload.netId
  const injectedWeb3 = results.payload.injectedWeb3
  console.log('Web3 initialized! v1.03')
  store.dispatch(initContracts({web3, netId, injectedWeb3}))
})
.catch((e) => {
  console.log('Error in web3 initialization.',e)
})

ReactDOM.render((
    <Provider store={store}>
      <App></App>
    </Provider>
  ),
  document.getElementById('root')
)
registerServiceWorker();
