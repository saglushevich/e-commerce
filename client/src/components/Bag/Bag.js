import { Component } from 'react';
import './Bag.sass'
import CartItem from '../CartItem/CartItem'
import { connect } from 'react-redux';
import * as actions from '../../reduxActions/reduxActions'
import {NavLink} from "react-router-dom";

class Bag extends Component {
    render () {
        const {cart} = this.props;
        const bagItems = cart.map((item, i) => <CartItem key={item.id + i} type="small" itemId={item.id+i} price={item.prices.filter(item => item.currency.symbol === this.props.currency)[0]} {...item}/>)
        return (
            <div className="bag">
                <div className="bag-dialog">
                    <div className="bag-content">
                        <div className="bag__header">My bag, <span>{cart.length > 1 ? `${cart.length} items` : `${cart.length} item`}</span></div>
                        <ul className="bag-list">
                            {bagItems}
                        </ul>
                        <div className="bag__total">Total <span>$200.00</span></div>
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
        categories: state.categories,
        currencies: state.currencies,
        products: state.products,
        currency: state.currency,
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(Bag)