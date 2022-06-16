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
        let {cart} = this.props;

        if (this.props.quantity < 1) {
            item = {...this.props, quantity: 1};
        } else {
            item = {...this.props, quantity: this.props.quantity + value}
        }

        const itemId = cart.findIndex(elem => elem.id === this.props.id);
        
        this.props.updateCart([...cart.slice(0, itemId), item, ...cart.slice(itemId + 1)])
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

        const classes = {
            cartMainClass: type === 'small' ? " cart__item_small" : "", 
            cartHeaderClass: type === 'small' ? " cart-info__name_small" : "", 
            cartPriceClass: type === 'small' ? " cart-info__price_small" : "",
            cartPlusBtnClass: type === 'small' ? " cart-amount__btn_small cart-amount__btn_plus_small" : "",
            cartMinusBtnClass: type === 'small' ? " cart-amount__btn_small" : "",
            cartAmountTextClass: type === 'small' ? " cart-amount__text_small" : "",
            cartImagesClass: type === 'small' ? " cart-images_small" : "",
            cartImageClass: type === 'small' ? " cart-image_small" : ""
        }

        return (
            <li key={id} className={"cart__item" + classes.cartMainClass}>
                <div className="cart-info">
                     <h2 className={"cart-info__name" + classes.cartHeaderClass}>{name}</h2>
                     <h3 className={"cart-info__name cart-info__name_medium" + classes.cartHeaderClass}>{brand}</h3>
                     <h3 className={"cart-info__price" + classes.cartPriceClass} style={{"marginBottom": "20px"}}>{price.currency.symbol}{price.amount * quantity}</h3>
                    {attributesItems}

                </div>
                <div className="cart-amount">
                    <div onClick={() => this.onChangeQuantity(1)} className={"cart-amount__btn cart-amount__btn_plus" + classes.cartPlusBtnClass}></div>
                    <div className={"cart-amount__text" + classes.cartAmountTextClass}>{quantity}</div>
                    <div onClick={() => this.onChangeQuantity(-1)} className={"cart-amount__btn" + classes.cartMinusBtnClass}></div>
                </div>
                <div className={"cart-images" + classes.cartImagesClass}>
                    <img src={gallery[slideIndex - 1]} alt={name} className={"cart-image" + classes.cartImageClass}/>
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