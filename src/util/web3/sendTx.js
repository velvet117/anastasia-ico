import { setInvestButton } from '../investButton'
import {presaleContractInitialized} from '../contracts/loadPresale';

export const sendTransaction = ({ amount }) => {
    return (dispatch, getState) => {
        console.log(getState(), amount);
        const web3 = getState().web3.web3Instance;
        const currentAccount = getState().account.metamaskAcc;
        const presaleAddress = getState().presale.ICO_ADDRESS;
        amount = web3.toWei(amount, 'ether');
        web3.eth.sendTransaction({ value: amount, from: currentAccount, to: presaleAddress }, (error, result) => {
            if (!error) {
                console.log(result);
                dispatch(checkTransaction({ txId: result, web3 }))
            } else {
                console.error(error.message)
                const rejectedCLicked = error.message.includes('User denied transaction signature')
                if (rejectedCLicked) {
                    dispatch(setInvestButton({ isDisabled: false }))
                    //   dispatch(displayAlert({msg: "The transaction was rejected", alert_type: "error", title: "Rejected"}))
                }
            }
        })
    }
}
export const updateBalance = () => {
    return async (dispatch, getState) => {
        const web3 = getState().web3.web3Instance;
        const currentAccount = getState().account.metamaskAcc;
        const tokenInstance = getState().presale.tokenInstance;
        const presaleInstance = getState().presale.presaleInstance;
        let totalSold = await presaleInstance.weiRaised.call()
        totalSold = web3.fromWei(totalSold.toString(10), 'ether')
        let balance = await tokenInstance.balanceOf(currentAccount);
        balance = web3.fromWei(balance.toString(10), 'ether');
        dispatch(setBalance({balance}));
        dispatch(presaleContractInitialized({totalSold}, 'TOTAL_SOLD_UPDATED'));

    }
}
export const checkTransaction = ({ txId, web3, counter }) => {
    counter = counter || 0
    console.log('checking tx status', txId, counter)
    return (dispatch, getState) => {
      const currentAccount = getState().account.metamaskAcc;
    //   const lockedMetamask = getState().setAccount.lockedMetamask
      const netIdName = getState().web3.netIdName
      const domain = netIdName === "mainnet" ? '' : netIdName + '.'
      const currentTxLink = !currentAccount ? '#' : `https://${domain}etherscan.io/tx/${txId}`
      web3.eth.getTransaction(txId, (error, res) => {
        console.log('resss', res)
          if (res && res.blockNumber) {
            // dispatch(setCurrentStatus("Active"))
            dispatch(updateBalance());
            dispatch(displayAlert({msg: `Mined at block number ${res.blockNumber} <a href="${currentTxLink}" target="_blank">Check in Etherscan</a>` ,title: "Mined Successful", alert_type: "success"}))
            dispatch(setInvestButton({isDisabled: false}))
          } else {
            // dispatch(setCurrentStatus("mining your current transaction"))
            // if(!counter){
            //   dispatch(displayAlert({msg: `${SUCCESS_TX_MESSAGE} <a href="${currentTxLink}" target="_blank">Check in Etherscan</a>` ,title: "Contribution Successful", alert_type: "success"}))
            // }
            counter += 1
            console.log('Not mined yet')
            setTimeout(()=> {
              dispatch(checkTransaction({txId, web3, counter}))
            }, 500)
          }
      })
    }
  }


  export const displayAlert = ({msg, alert_type, title}) => ({
    type: 'DISPLAY_ALERT',
    msg,
    alert_type,
    title
  })
  
  export const setBalance = ({balance, totalSold}) => ({
    type: 'SET_BALANCE',
    balance,
    totalSold
  })
  