import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {setInvestButton} from './util/investButton'
import {sendTransaction, displayAlert} from './util/web3/sendTx'
import Header from './layouts/home/Header'
import Table from './Table'
import sweetAlert from 'sweetalert';
// import 'sweetalert/dist/sweetalert.min.css';
// Styles
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.onClickBuy = this.onClickBuy.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popupMsg.msg) {
      const modal = nextProps.popupMsg;
      var slider = document.createElement("div");
      slider.innerHTML = modal.msg;
      sweetAlert({
        title: modal.title,
        content: slider,
        closeOnClickOutside: true,
        icon: modal.alert_type,
        buttons: [false, "OK"],
        timer: 30000
      }).then(() => {
        this.props.displayAlert({});
      })
    }
  }


  onClickBuy(e) {
    e.preventDefault()
    let amount = Number(this.refs.amount.value);
    if (!isNaN(amount)) {
      this.props.setInvestButton({ isDisabled: true})
      this.props.sendTransaction({ amount })
    }
  }
  render() {
    const disabledBtn = this.props.investButton.isDisabled;
    const metamask_not_found = !this.props.web3.injectedWeb3 ? (
      <div className="purple">Metamask, Parity or other Web3 client was not found, please install the extension or check your settings</div>
    ) : ''
    return (
      <div className="App">
        <Header />
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-1">
              <h1 className="purple font-50">
                Let's build it together!
              </h1>
            </div>
            <div className="pure-u-1 pure-u-md-1-1 pure-u-lg-18-24">
              <p className="lightGrey">
                Contribute directly from your <a className="purple bold-link" href="https://metamask.io" target="_blank">Metamask</a> or <a className="purple bold-link" href="https://parity.io" target="_blank">Parity</a> wallet by selecting the amount and clicking contribute, or copy
                the address and send Ethers from any other wallet you own. For best contribution experience we suggest using Chrome Web browser with Metamask plugin.<br/>
                <b>Do not send Ethers(ETH) from exchanges. This includes Kraken, Poloniex, Coinbase, and others.<br/>
                Do not send Ethers(ETH) from Multisig wallets, only transactions from regular accounts will be accepted.</b> <br/>
                </p>
            </div>
          </div>
          <div className="pure-g">
            <Table
              netIdName={this.props.web3.netIdName}
              injectedWeb3={this.props.web3.injectedWeb3}
            />
            <div className="pure-u-1 pure-u-lg-1-24">
            </div>
            <div className="pure-u-1 pure-u-lg-5-24 pure-u-md-1 form-container">
              <form className="pure-form pure-form-aligned">
                <div style={{ marginBottom: '15px' }}>Choose amount to contribute</div>
                <input id="amount" className="pure-input-2-3" ref="amount" type="number" step="0.00001" placeholder="0" /><br/>
                <button id="buy" className="pure-button pure-button-primary pure-input-2-3" disabled={disabledBtn} onClick={this.onClickBuy}>CONTRIBUTE</button>
              </form>
              {metamask_not_found}
              <div className="lightGrey" style={{ margin: "10px 0px" }}>Recommended gas limit 200,000</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    ...bindActionCreators({setInvestButton, sendTransaction, displayAlert}, dispatch),
    dispatch
  })
}

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3,
    investButton: state.investButton,
    popupMsg: state.popupMsg
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)


// export default App
