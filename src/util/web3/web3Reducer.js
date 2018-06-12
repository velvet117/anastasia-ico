const initialState = {
  web3Instance: null
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    return {
      ...state,
      ...action.payload,
    }
  }

  return state
}

export default web3Reducer
