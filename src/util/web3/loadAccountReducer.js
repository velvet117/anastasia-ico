const initialState = {
    metamaskAcc: null
  }
  
  const AccountReducer = (state = initialState, action) => {
    if (action.type === 'ACCOUNT_LOADED')
    {
      return {
        ...state,
        ...action.payload,
      }
    }
  
    return state
  }
  
  export default AccountReducer
  