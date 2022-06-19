import { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../reduxActions/reduxActions'
import ProductAttributesSelection from '../ProductAttributesSelection/ProductAttributesSelection';

class CartItemSmall extends Component {

    onChangeQuantity = (value) => {
        let item = {...this.props};
        let {cart, updateCart, quantity, id} = this.props;

        if (quantity < 1) {
            item = {...this.props, quantity: 1};
        } else {
            item = {...this.props, quantity: quantity + value}
        }

        const itemId = cart.findIndex(elem => elem.id === id);
        
        updateCart([...cart.slice(0, itemId), item, ...cart.slice(itemId + 1)])
    }
    
    render () {
        const {prices, name, brand, quantity, gallery, attributes, currency} = this.props;

        const price = prices.filter(item => item.currency.symbol === currency)[0];

        sessionStorage.setItem('cart', JSON.stringify(this.props.cart))
        const attributesItems = attributes.map(item => <ProductAttributesSelection type="small" key={item.id} data={item} />)
        
        return (
            <li className="cart__item cart__item_small">
                <div className="cart-info">
                    <h2 className="cart-info__name cart-info__name_small">{name}</h2>
                    <h3 className="cart-info__name cart-info__name_small">{brand}</h3>
                    <h3 className="cart-info__price cart-info__price_small" style={{"marginBottom": "20px"}}>{price.currency.symbol}{(price.amount * quantity).toFixed(2)}</h3>
                    {attributesItems}

                </div>
                <div className="cart-amount">
                    <div onClick={() => this.onChangeQuantity(1)} className="cart-amount__btn cart-amount__btn_plus cart-amount__btn_small cart-amount__btn_plus_small"></div>
                    <div className="cart-amount__text cart-amount__text_small">{quantity}</div>
                    <div onClick={() => this.onChangeQuantity(-1)} className="cart-amount__btn cart-amount__btn_small"></div>
                </div>
                <div className="cart-images cart-images_small">
                    <img src={gallery[0]} alt={name} className="cart-image cart-image_small"/>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        currency: state.currency
    }
}

export default connect(mapStateToProps, actions)(CartItemSmall);