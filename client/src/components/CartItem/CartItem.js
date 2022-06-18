import { Component } from 'react';
import './CartItem.sass'
import arrow from '../../resources/icons/arrow.svg'
import * as actions from '../../reduxActions/reduxActions'
import { connect } from 'react-redux';
import ProductAttributesSelection from '../ProductAttributesSelection/ProductAttributesSelection';

class CartItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            slideIndex: 1
        }
    }

    onChangeQuantity = (value) => {
        let item = {...this.props};
        let {cart, quantity, id, updateCart} = this.props;

        if (quantity < 1) {
            item = {...item, quantity: 1};
        } else {
            item = {...item, quantity: quantity + value}
        }

        const itemId = cart.findIndex(elem => elem.id === id);
        
        updateCart([...cart.slice(0, itemId), item, ...cart.slice(itemId + 1)])
    }

    nextSlide = () => {
        const {slideIndex} = this.state
        const {gallery} = this.props;

        if (slideIndex !== gallery.length) {
            this.setState(state => ({
                slideIndex: state.slideIndex + 1
            }))
        } else if (slideIndex === gallery.length) {
            this.setState(state => ({
                slideIndex: 1
            }))
        }
    }

    prevSlide = () => {
        const {slideIndex} = this.state
        const {gallery} = this.props;
        
        if(slideIndex !== 1){
            this.setState(state => ({
                slideIndex: state.slideIndex - 1
            }))
        }
        else if (slideIndex === 1){
            this.setState(state => ({
                slideIndex: gallery.length
            }))
        }
    }

    render () {
        const {name, brand, gallery, type, quantity, prices, currency, id, attributes} = this.props;
        const {slideIndex} = this.state;

        let attributesItems = attributes.map(item => <ProductAttributesSelection type={type} key={item.id} data={item} />)

        let price = prices.filter(item => item.currency.symbol === currency)[0];

        return (
            <li key={id} className="cart__item">
                <div className="cart-info">
                     <h2 className="cart-info__name">{name}</h2>
                     <h3 className="cart-info__name cart-info__name_medium">{brand}</h3>
                     <h3 className="cart-info__price" style={{"marginBottom": "20px"}}>{price.currency.symbol}{(price.amount * quantity).toFixed(2)}</h3>
                    {attributesItems}

                </div>
                <div className="cart-amount">
                    <div onClick={() => this.onChangeQuantity(1)} className="cart-amount__btn cart-amount__btn_plus"></div>
                    <div className="cart-amount__text">{quantity}</div>
                    <div onClick={() => this.onChangeQuantity(-1)} className="cart-amount__btn"></div>
                </div>
                <div className="cart-images">
                    <img src={gallery[slideIndex - 1]} alt={name} className="cart-image"/>
                    <div className="cart-images__arrows" style={gallery.length > 1 ? {"display":"flex"} : {"display":"none"}}>
                        <div onClick={() => this.prevSlide()} className="cart-images__arrow cart-images__arrow_left"><img src={arrow} alt="arrow" /></div>
                        <div onClick={() => this.nextSlide()} className="cart-images__arrow"><img src={arrow} alt="arrow" /></div>
                    </div> 
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

export default connect(mapStateToProps, actions)(CartItem)