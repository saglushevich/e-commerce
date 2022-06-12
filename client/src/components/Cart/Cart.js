import { Component } from 'react';
import './Cart.sass'
import {connect} from 'react-redux'
import * as actions from '../../reduxActions/reduxActions'
import CartItem from '../CartItem/CartItem';

class Cart extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tax: 0,
            quantity: this.props.cart.length,
            total: 0,
        }
    }

    onChangeTotalQuantity = (value) => {
        this.setState(({quantity}) => ({
            quantity: quantity + value
        }))
        if (this.state.quantity <= 0 && value < 0) {
            this.setState({
                quantity: 0
            })
        }
    }

    // onChangeTotal = (value) => {
    //     this.setState(({total}) => ({
    //         total: [...total, value]
    //     }))
    // }

    render () {
        const {tax, quantity, total} = this.state

        const cartItems = this.props.cart.map((item, i) => <CartItem type="large" key={item.id + i} onChangeTotal={this.onChangeTotal} onChangeTotalQuantity={this.onChangeTotalQuantity} itemId={item.id+i} price={item.prices.filter(item => item.currency.symbol === this.props.currency)[0]} {...item}/>) 
        return (
            <section className="cart">
                <h1 className="cart__title">Cart</h1>
                <ul className="cart-list">
                    {cartItems}
                </ul>
                <div className="cart-order">
                    <div className="cart-order__description">
                        <div className="cart-order__text">Tax 21%: <span>${tax}</span></div>
                        <div className="cart-order__text">Quantity: <span>{quantity}</span></div>
                        <div className="cart-order__text cart-order__total">Total: <span>${total}</span></div>
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