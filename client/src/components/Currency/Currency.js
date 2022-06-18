import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../reduxActions/reduxActions'
import './Currency.sass'

class Currency extends Component {

    onSetCurrency  = (symbol) => {
        const {setCurrency, onToggleCurrenctStatus} = this.props;

        setCurrency(symbol);
        sessionStorage.setItem('currency', symbol)
        onToggleCurrenctStatus()

    }

    onCloseTool = (e) => {
        const {onToggleCurrenctStatus} = this.props;

        if(e.target.classList.contains("currency") || e.target.classList.contains("currency-dialog")) {
            onToggleCurrenctStatus()
        }
    }

    render () {
        const {currencies, currency} = this.props;

        const currencySelection = currencies.map(item => {
            const {symbol, label} = item
            return (
                <li key={symbol} onClick={() => this.onSetCurrency(symbol)} className="currency-selection__item">
                    <input defaultChecked={currency === symbol ? true : false} type="radio" name='currency' id={label} className="currency-selection__input"/>
                    <label htmlFor={label} className="currency-selection__label">{symbol} {label}</label>
                </li>
            )
        })

        return (
            <div onClick={this.onCloseTool} className="currency">
                <div className="currency-dialog" >
                    <div className="currency-content">
                        <ul className="currency-selection">
                            {currencySelection}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies,
        currency: state.currency,
    }
}

export default connect(mapStateToProps, actions)(Currency)