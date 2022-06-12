import { Component } from 'react';
import './CatalogItem.sass'
import cartIcon from '../../resources/icons/cart_white.svg'
import {NavLink} from "react-router-dom";
import * as actions from '../../reduxActions/reduxActions'
import {connect} from 'react-redux'
import {getProductInfo} from '../../actions/actions'

class CatalogItem extends Component {

    onProductSelect = async () => {
        await getProductInfo(this.props.id).then(items => items.data.product).then(items => this.props.setSelectedProduct(items))
    }

    render () {
        const {image, name, price, id, inStock, brand} = this.props;
        return (
            <NavLink to={`/product`}>
                <li key={id} className="catalog__item" onClick={() => this.onProductSelect(id)}>
                    <div className="catalog__image"><img src={image} alt={name} /></div>
                    <h2 className="catalog__title">{name}, {brand}</h2>
                    <h3 className="catalog__price">{price.currency.symbol}{price.amount}</h3>
                    <div style={inStock ? {"display":"flex"} : {"display":"none"}} className="catalog__cart"><img src={cartIcon} alt="cart" /></div>
                    <div className="catalog__covering" style={inStock ? {"display":"none"} : {"display":"flex"}}>OUT OF STOCK</div>
                </li>
            </NavLink>
        )
    }
}

export default connect(null, actions)(CatalogItem)