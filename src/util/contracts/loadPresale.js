import contract from 'truffle-contract'
import * as types from '../../ActionTypes'
import {setBalance} from '../web3/sendTx'

export const presaleContractInitialized = (params, type) => ({
    type: type || types.PRESALE_SAVED,
    payload: { ...params }
})

function latestTime() {
    return Math.floor(Date.now()/1000);
}

export const loadPresale = ({ presale, token, ICO_ADDRESS, fromWei, account }) => {
    return async (dispatch, getState) => {
        const presaleInstance = await presale.at(ICO_ADDRESS)

        let startTime = await presaleInstance.openingTime.call()
        startTime = startTime.toNumber()

        let endTime = await presaleInstance.closingTime.call()
        endTime = endTime.toNumber()

        let presaleStatus = await presaleInstance.hasClosed.call()
        if (presaleStatus === true) {
            presaleStatus = "Ended"
        }
        if (presaleStatus === false) {
            presaleStatus = "Active"
        }
        let totalSold = await presaleInstance.weiRaised.call()
        totalSold = fromWei(totalSold.toString(10), 'ether')

        let exchangeRate = await presaleInstance.rate.call()
        exchangeRate = exchangeRate.toNumber()

        const tokenAddress = await presaleInstance.token()
        const tokenInstance = await token.at(tokenAddress)
        const symbol = await tokenInstance.symbol.call()
        let balance;
        if(account){
            balance = await tokenInstance.balanceOf(account);
            balance = fromWei(balance.toString(10), 'ether');
        }
        dispatch(setBalance({balance}))
        dispatch(presaleContractInitialized({
            presaleInstance,
            tokenInstance,
            ICO_ADDRESS,
            startTime,
            endTime,
            symbol,
            exchangeRate,
            totalSold,
            presaleStatus,
            balance,
            tokenAddress,
        }))
        return {
            type: types.PRESALE_INITIALIZED
        }

    }
}
