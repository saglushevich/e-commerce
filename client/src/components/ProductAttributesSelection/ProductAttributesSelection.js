import { Component } from 'react';
import { connect } from 'react-redux';
import './ProductAttributesSelection.sass'
import * as actions from '../../reduxActions/reduxActions'

class ProductAttributesSelection extends Component{
    constructor (props) {
        super(props);
        this.state = {
            index: Math.round(Math.random() * 500)
        }
    }

    onSetAttributes = (name, value) => {
        const {selectedProduct, selectedAttributes, setSelectedAttributes, cartItem, cart, updateCart} = this.props;

        setSelectedAttributes([]);

        selectedProduct.attributes.map(attr => {
            if (attr.name === name) {
                const notChangedAttributes = selectedAttributes.filter(item => item.name !== name);
                const changedAttributes = {...attr, id: attr.id + Math.round(Math.random() * 500), items: attr.items.map(item => item.value === value ? {...item, chosen: true} : {...item, chosen: false})}
                setSelectedAttributes([...notChangedAttributes, changedAttributes])                     
            }
            return attr;
        })

        if (cartItem) {
            cart.map(item => {
                if (item.id === cartItem.id) {
                    item.attributes.map(attr => {
                        if (attr.name === name) {
                            const index = cart.findIndex(elem => elem.id === cartItem.id)
                            const attrIndex = item.attributes.findIndex(elem => elem.name === name)

                            const before = item.attributes.slice(0, attrIndex);
                            const after = item.attributes.slice(attrIndex + 1);

                            const updatedItem = {...item, attributes: [...before, {...attr, items: attr.items.map(item => item.value === value ? {...item, chosen: true} : {...item, chosen: false})}, ...after]};

                            const newCart = [...cart.slice(0, index), updatedItem, ...cart.slice(index + 1)]

                            updateCart(newCart)
                        }
                        return attr;
                    })
                }
                return item;
            })
        }
    }

    render () {
        const {data, type} = this.props;
        const {index} = this.state;

        const classes = {
            productSelectionBlockClass: type === 'small' ? "product-form__content_small" : "product-form__content",

            productSelectionListClass: type === 'small' ? 
                (data.name === 'Color' ? "product-selection" : "product-selection_column") : 
                (data.name === 'Color' ? "product-selection" : "product-selection product-selection_transparent"),

            productSelectionElementClass: data.name === 'Color' ? 
                "product-selection__item" : 
                "product-selection__item product-selection__item_transparent",

            productSelectionLabelClass: type === 'small' ? 
                (data.name ==='Color' ? "product-selection__label product-selection__label_color product-selection__label_color_small" : 
                "product-selection__label product-selection__label_transparent product-selection__label_transparent_small") : 
                (data.name === 'Color' ? "product-selection__label product-selection__label_color" : 
                "product-selection__label product-selection__label_transparent")
        }

        const elements = data.items.map(item => {
            const {id, value, chosen} = item;
            return (
                <li key={id} className={classes.productSelectionElementClass}>
                    <input defaultChecked={chosen} onChange={() => this.onSetAttributes(data.name, value)} required type="radio" name={index} id={data.id+value+index} className="product-selection__input"/>
                    {data.name === 'Color' ?  
                    <label htmlFor={data.id+value+index} style={{'background': `${value}`}} className={classes.productSelectionLabelClass}></label> : 
                    <label htmlFor={data.id+value+index} className={classes.productSelectionLabelClass}>{value}</label>}
                </li>
            )
        })

        return (
            <div className={classes.productSelectionBlockClass}>
                <h3 className="product-details__text">{data.name}</h3>
                <ul className={classes.productSelectionListClass}>
                    {elements}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        selectedProduct: state.selectedProduct,
        selectedAttributes: state.selectedAttributes
    }
}
export default connect(mapStateToProps, actions)(ProductAttributesSelection)