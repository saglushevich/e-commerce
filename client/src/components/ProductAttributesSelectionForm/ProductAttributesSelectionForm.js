import { Component } from 'react';
import './ProductAttributesSelectionForm.sass'

class ProductAttributesSelectionForm extends Component{

    render () {
        const {data, onSetAttributes} = this.props;

        const elements = data.items.map(item => {
            const {id, value} = item;

            let labelClass = (data.name === 'Color' ? "product-selection__label product-selection__label_color" : 
            "product-selection__label product-selection__label_transparent");

            if (data.name === 'Color') {
                let styles = value === "#FFFFFF" ? {'border':"1px solid #D3D2D5", 'background': `${value}`} : {'background': `${value}`}
                return (
                    <li key={id} className="product-selection__item">
                        <input onChange={() => onSetAttributes(data.name, value)} required type="radio" name={data.id} id={data.id+id} className="product-selection__input"/>
                        <label htmlFor={data.id+id} style={styles} className={labelClass}></label>
                    </li>
                )
            } else {
                return (
                    <li key={id} className="product-selection__item product-selection__item_transparent">
                        <input onChange={() => onSetAttributes(data.name, value)} required type="radio" name={data.id} id={data.id+id} className="product-selection__input"/>
                        <label htmlFor={data.id+id} className={labelClass}>{value}</label>
                    </li>
                )
            }
            
        })

        return (
            <div className="product-form__content">
                <h3 className="product-details__text">{data.name}</h3>
                <ul className={data.name === 'Color' ? "product-selection" : "product-selection product-selection_transparent"}>
                    {elements}
                </ul>
            </div>
        )
    }
}

export default ProductAttributesSelectionForm