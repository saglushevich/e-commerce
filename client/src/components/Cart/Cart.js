import { Component } from 'react';
import './Cart.sass'
import {connect} from 'react-redux'
import * as actions from '../../reduxActions/reduxActions'
import CartItem from '../CartItem/CartItem';

class Cart extends Component {
    
    render () {
        const {currency, cart} = this.props;
        const cartItems = cart.map((item, i) => <CartItem key={item.id + i} {...item}/>)

        let totalPrice = +sessionStorage.getItem('totalPrice');
        let totalQuantity = +sessionStorage.getItem('totalQuantity');

        return (
            <section className="cart">
                <h1 className="cart__title">Cart</h1>
                <ul className="cart-list">
                    {cartItems}
                </ul>
                <div className="cart-order">
                    <div className="cart-order__description">
                        <div className="cart-order__text">Tax 21%: <span>{currency}{(totalPrice * 0.21).toFixed(2)}</span></div>
                        <div className="cart-order__text">Quantity: <span>{totalQuantity}</span></div>
                        <div className="cart-order__text cart-order__total">Total: <span>{currency}{totalPrice.toFixed(2)}</span></div>
                    </div>
                </div>
                <button className="cart__button">order</button>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        currency: state.currency
    }
}

export default connect(mapStateToProps, actions)(Cart)