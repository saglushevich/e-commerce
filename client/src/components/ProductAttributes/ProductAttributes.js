import { Component } from 'react';
import './ProductAttributes.sass'

class ProductAttributes extends Component {
    render () {
        const {data, type} = this.props;

        let listClass = "attributes-list";
        const elements = data.items.map(item => {
            const {id, chosen, value} = item;
            let classes = ''
            const styles = value === "#FFFFFF" ? {'border':"1px solid #D3D2D5", 'background': value} : {'background': value};

            if (type === "small") {
                if (data.name === 'Color') {
                    classes = chosen ? "attributes__item_colored_small attributes__item_colored_small_active" : "attributes__item_colored_small";
                    listClass = "attributes-list";
                    return <li key={id} style={styles} className={classes}></li>;
                } else {
                    classes = chosen ? "attributes__item attributes__item_active attributes__item_small" : "attributes__item attributes__item_small";
                    listClass = "attributes-list attributes-list_column";
                    return <li key={id} className={classes}>{value}</li>;
                }
            } else {
                if (data.name === 'Color') {
                    classes = chosen ? "attributes__item_colored attributes__item_colored_active" : "attributes__item_colored";
                    listClass = "attributes-list";
                    return <li key={id} style={styles} className={classes}></li>
                } else {
                    classes = chosen ? "attributes__item attributes__item_active" : "attributes__item";
                    listClass = "attributes-list";
                    return <li key={id} className={classes}>{value}</li>;
                }
            }
            
            
        })
        
        return (
            <div className="attributes">
                <h3 className="attributes-header">{data.name}</h3>
                <ul className={listClass}>
                    {elements}
                </ul>
            </div>
        )
    }
}

export default ProductAttributes;