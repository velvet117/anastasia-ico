import React, { Component } from 'react';
import {PulseLoader} from 'halogen';
const Loader = PulseLoader;

export default class Loading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            percent: 25
        }
        this.increase = this.increase.bind(this);
    }
    componentDidMount() {
        this.increase();
    }
    componentWillUnmount() {
        clearTimeout(this.tm);
    }

    increase() {
        const percent = this.state.percent + 1;
        if (percent >= 100) {
            clearTimeout(this.tm);
            return;
        }
        this.setState({ percent });
        this.tm = setTimeout(this.increase, 10);
    }

    render() {
        return (
            <div className="pure-g" className="loading" style={{alignItems: 'center', height: '100%', opacity: '0.95'}}>
                <div className="pure-u-1 purple" style={{ textAlign: 'center', backgroundColor: '#BAC7FC'}}>
                    Loading data from Ethereum (Make sure you are on a Main Net).<br/>
                    It might take up to few minutes... <br/>
                 <Loader color="#485592" size="50px" margin="4px"/>
                </div>
            </div>
        )
    }
}
