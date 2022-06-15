import { Component } from 'react';
import './CatalogItem.sass'
import cartIcon from '../../resources/icons/cart_white.svg'
import {NavLink} from "react-router-dom";
import * as actions from '../../reduxActions/reduxActions'
import {connect} from 'react-redux'

class CatalogItem extends Component {

    render () {
        const {name, prices, id, inStock, brand, currency, gallery} = this.props;

        let price = prices.filter(item => item.currency.symbol === currency)[0]
        return (
            <NavLink to={`/product/${id}`}>
                <li key={id} className="catalog__item" >
                    <div className="catalog__image"><img src={gallery[0]} alt={name} /></div>
                    <h2 className="catalog__title">{name}, {brand}</h2>
                    <h3 className="catalog__price">{price.currency.symbol}{price.amount}</h3>
                    <div style={inStock ? {"display":"flex"} : {"display":"none"}} className="catalog__cart"><img src={cartIcon} alt="cart" /></div>
                    <div className="catalog__covering" style={inStock ? {"display":"none"} : {"display":"flex"}}>OUT OF STOCK</div>
                </li>
            </NavLink>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency
    }
}

export default connect(mapStateToProps, actions)(CatalogItem)