import { Component } from 'react';
import './Bag.sass'
import { connect } from 'react-redux';
import * as actions from '../../reduxActions/reduxActions'
import CartItem from '../CartItem/CartItem'
import {NavLink} from "react-router-dom";

class Bag extends Component {
    
    onCloseTool = (e) => {
        const {onToggleBagStatus} = this.props;
        if (e.target.classList.contains("bag") || e.target.classList.contains("bag-dialog")) {
            onToggleBagStatus();
        }
    }

    render () {
        const {cart, currency} = this.props;

        const bagItems = cart.map((item, i) => <CartItem key={item.id + i} {...item}/>);

        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice = totalPrice + (item.prices.filter(item => item.currency.symbol === currency)[0].amount * item.quantity);
        })

        sessionStorage.setItem('totalPrice', totalPrice)

        let totalQuantity = +sessionStorage.getItem('totalQuantity');

        return (
            <div onClick={this.onCloseTool} className="bag">
                <div className="bag-dialog">
                    <div className="bag-content">
                        <div className="bag__header">My bag, <span>{totalQuantity > 1 ? `${totalQuantity} items` : `${totalQuantity} item`}</span></div>
                        <ul className="bag-list">
                            {bagItems}
                        </ul>
                        <div className="bag__total">Total <span>{currency}{totalPrice.toFixed(2)}</span></div>
                        <div className="bag-buttons">
                            <NavLink to="/cart"><button className="bag__button">View bag</button></NavLink>
                            <button className="bag__button bag__button_green">Check out</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency,
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(Bag)