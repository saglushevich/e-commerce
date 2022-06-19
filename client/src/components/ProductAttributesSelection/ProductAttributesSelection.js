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

    render () {
        const {data, type, onSetAttributes} = this.props;
        
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
                    <input defaultChecked={chosen} disabled={onSetAttributes ? false : true} onChange={onSetAttributes ? () => onSetAttributes(data.name, value) : null} required type="radio" name={index} id={data.id+value+index} className="product-selection__input"/>
                    {data.name === 'Color' ?  
                    <label htmlFor={data.id+value+index} style={value === "#FFFFFF" ? {'border':"1px solid #D3D2D5", 'background': `${value}`} : {'background': `${value}`}} className={classes.productSelectionLabelClass}></label> : 
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
        cart: state.cart
    }
}
export default connect(mapStateToProps, actions)(ProductAttributesSelection)