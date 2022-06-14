import { Component } from 'react';
import './SingleProduct.sass'
import {connect} from 'react-redux'
import * as actions from '../../reduxActions/reduxActions'
import ProductAttributesSelection from '../ProductAttributesSelection/ProductAttributesSelection';

class SingleProduct extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedPhoto: 0,
            itemId: Math.round(Math.random() * 500),
        }
    }

    onSelectPhoto = (i) => {
        this.setState({
            selectedPhoto: i
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState(({itemId}) => ({
            itemId: itemId + 1
        }))
        this.props.addProductToCart({...this.props.selectedProduct, quantity: 1, id: this.props.selectedProduct.id + this.state.itemId , attributes: this.props.selectedAttributes})
        this.props.setSelectedAttributes([])
    }

    render () {
        const {id, name, brand, prices, gallery, description, attributes, inStock} = this.props.selectedProduct
        const {currency} = this.props;

        const photos = gallery.map((item, i) => <li key={i} onClick={() => this.onSelectPhoto(i)} className="product-slider__item"><img src={item} alt={name} /></li>);

        const attributesItems = attributes.map(item => <ProductAttributesSelection key={item.id} data={item}/>)
        
        return (
            <div className="product" key={id}>
                <div className="product-block">
                    <div className="product-slider" >
                        <ul className="product-slider__container">
                            {photos.length > 1 ? photos : null}
                        </ul>
                    </div>
                    <div className="product-image"><img src={gallery[this.state.selectedPhoto]} alt={name} /></div>
                    <div className="product-details">
                        <h1 className="product-details__title">{name}</h1>
                        <h2 className="product-details__title product-details__title_small">{brand}</h2>
                        <form className="product-form" onSubmit={this.onFormSubmit}>
                            {attributesItems}
                            <h3 className="product-details__text" style={{"marginTop": "35px"}}>price:</h3>
                            <h3 className="product-details__price">{currency}{prices.filter(item => item.currency.symbol === currency)[0].amount}</h3>
                            <button disabled={!inStock} className="product-form__button">{inStock ? "add to cart" : "out of stock"}</button>
                        </form>
                        <div className="product-details__description" dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedProduct: state.selectedProduct,
        currency: state.currency,
        selectedAttributes: state.selectedAttributes,
        cart: state.cart
    }
}

export default connect(mapStateToProps, actions)(SingleProduct)