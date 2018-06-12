import * as types from '../../ActionTypes'
export const saveAccount = (params) => ({
    type: types.ACCOUNT_LOADED,
    payload: { ...params }
})

export const loadAccount = ({ web3 }) => {
    return async (dispatch, getState) => {
        const accounts = await web3.eth.getAccounts((error, accounts) => {
            dispatch(saveAccount({
                metamaskAcc: accounts[0]
            }))
        });
        return {
            type: types.ACCOUNT_LOAD_INITIATED
        }

    }
}
