import { Component } from 'react';
import './Header.sass'
import {NavLink} from "react-router-dom";
import logo from '../../resources/logo/logo.svg'
import cartIcon from '../../resources/icons/cart.svg'
import { connect } from 'react-redux';
import * as actions from '../../reduxActions/reduxActions'
import { getProductsByCategories} from '../../actions/actions'
import CartItem from '../CartItem/CartItem'

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currencyStatus: false,
            bagStatus: false
        }
    }

    onSelectCategory = async (category) => {
        await getProductsByCategories(category).then(items => items.data.category).then(items => this.props.setProducts(items))
    }

    render () {
        const {currencies, categories, currency, cart, products, setCurrency} = this.props;
        const {currencyStatus, bagStatus} = this.state;

        const menuItems = categories.map(item => {
            const {name} = item;
            return <li onClick={() => this.onSelectCategory(name)} key={name} className={products.name === name ? "menu__item menu__item_active"  : "menu__item"}>{name}</li>
        })

        const currencySelection = currencies.map(item => {
            const {symbol, label} = item
            return (
                <li key={symbol} onClick={() => setCurrency(symbol)} className="currency-selection__item">
                    <input defaultChecked={currency === symbol ? true : false} type="radio" name='currency' id={label} className="currency-selection__input"/>
                    <label htmlFor={label} className="currency-selection__label">{symbol} {label}</label>
                </li>
            )
        })

        const bagItems = cart.map((item, i) => <CartItem key={item.id + i} type="small" itemId={item.id+i} price={item.prices.filter(item => item.currency.symbol === this.props.currency)[0]} {...item}/>)

        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice = totalPrice + (item.prices.filter(item => item.currency.symbol === currency)[0].amount * item.quantity)
        })

        sessionStorage.setItem('totalPrice', totalPrice)

        return (
            <header className="header">
                <ul className="menu">
                    {menuItems}
                </ul>
                <NavLink to="/"><img src={logo} alt="logotype" className="logo" /></NavLink>
                <div className="tools">
                    <div onClick={() => this.setState(state => ({currencyStatus: !state.currencyStatus}))} className="tools__currency">{currency}<span style={currencyStatus ? {"transform" : "rotate(225deg)"} : {"transform" : "rotate(45deg)"}} className="tools__arrow"></span></div>
                    <div onClick={() => this.setState(state => ({bagStatus: !state.bagStatus}))} className="tools__cart"><img src={cartIcon} alt="emptyCart" /><span style={cart.length ? {"display":"flex"} : {"display":"none"}}>{cart.length}</span></div>
                </div>
                <div className="currency" style={currencyStatus ? {"opacity": '1'} : {"opacity": "0"}}>
                    <div className="currency-dialog" style={currencyStatus ? {"display": 'block'} : {"display": "none"}}>
                        <ul className="currency-selection">
                            {currencySelection}
                        </ul>
                    </div>
                </div>

                <div className="bag" style={bagStatus ? {"display" : "block"} : {"display": "none"}}>
                    <div className="bag-dialog">
                        <div className="bag-content">
                            <div className="bag__header">My bag, <span>{cart.length > 1 ? `${cart.length} items` : `${cart.length} item`}</span></div>
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
            </header>
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

export default connect(mapStateToProps, actions)(Header)