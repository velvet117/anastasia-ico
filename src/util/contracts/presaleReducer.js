const initialState = {
  presaleInstance: null
}

const presaleReducer = (state = initialState, action) => {
  if (action.type === 'PRESALE_INITIALIZED' || action.type === 'PRESALE_SAVED')
  {
    return {
      ...action.payload,
    }
  }

  if (action.type === 'TOTAL_SOLD_UPDATED') {
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}

export default presaleReducer
