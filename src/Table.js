import React, { Component } from 'react'
import {connect} from 'react-redux'
import 'react-tooltip-component/lib/tooltip.css';
import Tooltip from 'react-tooltip-component';
import sweetAlert from 'sweetalert';
import Loading from './Loading'
import './Table.css'
import displayBigNumber from './displayBigNumber';

class Table extends Component {
  state = {
    tooltipTitle: 'Copy'
  }
  boundOnCopyClick = this.onCopyClick.bind(this)

  componentWillReceiveProps(nextProps){
    switch(nextProps.presaleStatus) {
      case "Ended":
      case "been Paused":
      case "not started yet":
        sweetAlert({
          title: "Attention!",
          text: `Contribution period has ${nextProps.presaleStatus}`,
          allowOutsideClick: true,
          type: "error",
        });
        break;
      default:
        return
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.refs.copyBtn) {
      const Clipboard = require('clipboard');
      this.clipboard = new Clipboard(this.refs.copyBtn);
    }
  }
  onCopyClick() {
    this.setState({ tooltipTitle: 'Copied!' })
  }

  render() {
    const whitelisted = this.props.presale.isWhitelisted ? "Yes" : "No"
    const loading = this.props.presale.presaleStatus && this.props.presale.presaleStatus !== "mining your current transaction" ? '' : (<Loading />)
    const domain = this.props.netIdName === "mainnet" ? '' : this.props.netIdName + '.'
    const currentAccountLink = this.props.lockedMetamask ? '#' : `https://${domain}etherscan.io/address/${this.props.account.metamaskAcc}`
    const crowdsaleAddressLink = `https://${domain}etherscan.io/address/${this.props.presale.ICO_ADDRESS}`
    const lockedMetamask = this.props.account.metamaskAcc ? 'purple' : ''
    const tokenAddressLink = `https://${domain}etherscan.io/address/${this.props.presale.tokenAddress}`; 
    let balanceRow
    if (this.props.injectedWeb3) {
      balanceRow = (<tr>
        <td>Your contribution balance <br/> 
        <small>To add Tokens to Metamask or other wallet, please use Token address: 
         <a href={tokenAddressLink} target="_blank">{this.props.presale.tokenAddress}</a> </small></td>
        <td className={lockedMetamask}>{this.props.balance.balance} {this.props.lockedMetamask ? '' : this.props.presale.symbol}</td>
      </tr>)
    }
    return (
      <div className="pure-u-1 pure-u-lg-18-24 pure-u-md-2-4">
        {loading}
        <table className="pure-table pure-table-horizontal">
          <tbody>
            <tr>
              <td><b>Contribution target</b></td>
              <td>
                Uncapped ICO
            </td>
            </tr>


            <tr>
              <td>Contract Status</td>
              <td>
                {this.props.presale.presaleStatus}
              </td>
            </tr>


            <tr>
              <td>Your wallet address</td>
              <td>
                <a href={currentAccountLink}>
                  <span className={lockedMetamask}>{this.props.account.metamaskAcc}</span>
                </a>
              </td>
            </tr>

            <tr>
              <td>Contribution Contract Address</td>
              <td><a href={crowdsaleAddressLink} target="_blank">{this.props.presale.ICO_ADDRESS}</a>
                <Tooltip title={this.state.tooltipTitle} position='top'>
                  <i ref="copyBtn" onClick={this.boundOnCopyClick} data-clipboard-text={this.props.presale.ICO_ADDRESS} className="fa fa-files-o fa-border" aria-hidden="true"></i>
                </Tooltip>
              </td>
            </tr>

            <tr>
              <td>Total Contributed</td>
              <td>
                {this.props.presale.totalSold} ETH
            </td>
            </tr>

            <tr>
              <td>Exchange Rate per 1 KETH</td>
              <td>{this.props.presale.exchangeRate} {this.props.presale.symbol}</td>
            </tr>
            {balanceRow}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
   }
 }

export default connect(mapStateToProps)(Table)