import { Component } from 'react';
import './ProductQuantitySelection.sass'
import { connect } from "react-redux";
import * as actions from '../../reduxActions/reduxActions'

class ProductQuantitySelection extends Component {
    onChangeQuantity = (value) => {
        let item = this.props.data;
        let {cart, updateCart} = this.props;

        item = {...item, quantity: item.quantity + value}
        
        if (value < 0 && item.quantity < 2) {

            updateCart([...cart.filter(elem => elem.id !== item.id)])
        } else {
            const itemId = cart.findIndex(elem => elem.id === item.id);
            updateCart([...cart.slice(0, itemId), item, ...cart.slice(itemId + 1)]);
        }
    }

    render () {
        const {quantity} = this.props.data;

        if (this.props.type === "large") {
            return (
                <div className="cart-amount">
                    <div onClick={() => this.onChangeQuantity(1)} className="cart-amount__btn cart-amount__btn_plus"></div>
                    <div className="cart-amount__text">{quantity}</div>
                    <div onClick={() => this.onChangeQuantity(-1)} className="cart-amount__btn"></div>
                </div>
            )
        } else {
            return (
                <div className="cart-amount">
                    <div onClick={() => this.onChangeQuantity(1)} className="cart-amount__btn cart-amount__btn_plus cart-amount__btn_small cart-amount__btn_plus_small"></div>
                    <div className="cart-amount__text cart-amount__text_small">{quantity}</div>
                    <div onClick={() => this.onChangeQuantity(-1)} className="cart-amount__btn cart-amount__btn_small"></div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(ProductQuantitySelection)