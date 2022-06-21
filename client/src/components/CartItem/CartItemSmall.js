import { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../reduxActions/reduxActions'
import ProductAttributes from '../ProductAttributes/ProductAttributes';
import ProductQuantitySelection from "../ProductQuantitySelection/ProductQuantitySelection";

class CartItemSmall extends Component {
    
    render () {
        const {prices, name, brand, quantity, gallery, attributes, currency} = this.props;

        const price = prices.filter(item => item.currency.symbol === currency)[0];

        sessionStorage.setItem('cart', JSON.stringify(this.props.cart))
        const attributesItems = attributes.map(item => <ProductAttributes type="small" key={item.id} data={item} />)
        
        return (
            <li className="cart__item cart__item_small">
                <div className="cart-info">
                    <h2 className="cart-info__name cart-info__name_small">{name}</h2>
                    <h3 className="cart-info__name cart-info__name_small">{brand}</h3>
                    <h3 className="cart-info__price cart-info__price_small" style={{"marginBottom": "20px"}}>{price.currency.symbol}{(price.amount * quantity).toFixed(2)}</h3>
                    {attributesItems}

                </div>
                <ProductQuantitySelection type="small" data={this.props}/>
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