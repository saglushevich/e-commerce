import { Component } from 'react';
import './Header.sass'
import {NavLink} from "react-router-dom";
import logo from '../../resources/logo/logo.svg'
import cartIcon from '../../resources/icons/cart.svg'
import { connect } from 'react-redux';
import * as actions from '../../reduxActions/reduxActions'
import { getProductsByCategories} from '../../actions/actions'

import Currency from '../Currency/Currency';
import Bag from '../Bag/Bag';

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
        sessionStorage.setItem('category', category)
    }

    onToggleBagStatus = () => {
        this.setState(({bagStatus}) => {
            return {
                bagStatus: !bagStatus
            }
        })
    }

    onToggleCurrenctStatus = () => {
        this.setState(({currencyStatus}) => {
            return {
                currencyStatus: !currencyStatus
            }
        })
    }


    render () {
        const {categories, currency, cart, products} = this.props;
        const {currencyStatus, bagStatus} = this.state;

        const menuItems = categories.map(item => {
            const {name} = item;
            return <li onClick={() => this.onSelectCategory(name)} key={name} className={products.name === name ? "menu__item menu__item_active"  : "menu__item"}>{name}</li>
        })

        let totalQuantity = 0;

        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
        })

        sessionStorage.setItem('totalQuantity', totalQuantity)
        
        return (
            <header className="header">
                <ul className="menu">
                    {menuItems}
                </ul>

                <NavLink to="/"><img src={logo} alt="logotype" className="logo" /></NavLink>

                <div className="tools">
                    <div onClick={this.onToggleCurrenctStatus} className="tools__currency">
                        {currency}<span style={currencyStatus ? {"transform" : "rotate(225deg)"} : {"transform" : "rotate(45deg)"}} className="tools__arrow"></span>
                    </div>

                    <div onClick={this.onToggleBagStatus} className="tools__cart">
                        <img src={cartIcon} alt="emptyCart" />
                        <span style={totalQuantity ? {"display":"flex"} : {"display":"none"}}>{totalQuantity}</span>
                    </div>
                </div>

                {currencyStatus ? <Currency onToggleCurrenctStatus={this.onToggleCurrenctStatus}/> : null}
                {bagStatus ? <Bag onToggleBagStatus={this.onToggleBagStatus}/> : null}
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        products: state.products,
        currency: state.currency,
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(Header)