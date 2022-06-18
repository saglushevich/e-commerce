import { Component } from 'react';
import './CatalogItem.sass'
import cartIcon from '../../resources/icons/cart_white.svg'
import {NavLink} from "react-router-dom";
import * as actions from '../../reduxActions/reduxActions'
import {connect} from 'react-redux'

class CatalogItem extends Component {

    onCheckProductQuantity = (newItem) => {
        const {cart, updateCart} = this.props;

        cart.map(cartItem => {

            if (cartItem.id === newItem.id && JSON.stringify(cartItem.attributes) === JSON.stringify(newItem.attributes)) {
                
                const index = cart.findIndex(cartItem => JSON.stringify(cartItem.attributes) === JSON.stringify(newItem.attributes))

                const before = cart.slice(0, index);
                const after = cart.slice(index + 1);

                updateCart([...before, {...cartItem, quantity: cartItem.quantity + 1}, ...after])
                
            }
            return cartItem;
        })    
    }

    onAddProductToCart = () => {
        const {data, addProductToCart} = this.props;

        if (!data.attributes.length) {

            let newItem = {...data, quantity: 1};
            addProductToCart(newItem);
            this.onCheckProductQuantity(newItem);

        } else {

            const newAttributes = data.attributes.map(attr => {
                return {...attr, items: attr.items.map((item, i) => i === 0 ?  {...item, chosen: true} :  {...item, chosen: false})}
            })

            let newItem = {...data, quantity: 1, attributes: newAttributes};

            addProductToCart(newItem)
            this.onCheckProductQuantity(newItem)
        }
    }

    
    render () {
        const {name, prices, id, inStock, brand, gallery} = this.props.data;
        const {currency, cart} = this.props;

        sessionStorage.setItem('cart', JSON.stringify(cart))

        let price = prices.filter(item => item.currency.symbol === currency)[0]

        return (
            <li key={id} className="catalog__item" >
                <NavLink to={`/product/${id}`}>
                    <div className="catalog__image"><img src={gallery[0]} alt={name} /></div>
                    <h2 className="catalog__title">{name}, {brand}</h2>
                    <h3 className="catalog__price">{price.currency.symbol}{price.amount}</h3>
                    <div className="catalog__covering" style={inStock ? {"display":"none"} : {"display":"flex"}}>OUT OF STOCK</div>
                </NavLink>
                <div onClick={this.onAddProductToCart} style={inStock ? {"display":"flex"} : {"display":"none"}} className="catalog__cart"><img src={cartIcon} alt="cart" /></div>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency,
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(CatalogItem)