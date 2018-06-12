import { combineReducers } from 'redux'
import web3Reducer from './util/web3/web3Reducer'
import presaleRecuder from './util/contracts/presaleReducer'
import AccountReducer from './util/web3/loadAccountReducer'
import {investButton} from './util/investButton'

const popupMsg = (state = {}, action) => {
  switch(action.type){
    case 'DISPLAY_ALERT':
      return {
        ...action
      }
    default:
      return state
  }
}


const balance = (state = {}, action) => {
  switch(action.type){
    case 'SET_BALANCE':
      return {
        ...action
      }
    default:
      return state
  }
}


const reducer = combineReducers({
  web3: web3Reducer,
  presale: presaleRecuder,
  account: AccountReducer,
  investButton,
  popupMsg,
  balance
})

export default reducer
