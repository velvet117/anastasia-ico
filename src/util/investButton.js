
export const investButton = (state = { isDisabled: false }, action) => {
    if (action.type === 'SET_INVEST_BUTTON') {
        return {
            ...action.payload,
        }
    }

    return state
}



export const setInvestButton = (params) => ({
    type: 'SET_INVEST_BUTTON',
    payload: { ...params }
})