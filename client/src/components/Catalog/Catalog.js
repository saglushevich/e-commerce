import './Catalog.sass'
import { Component } from 'react';
import store from '../../store/store'
import CatalogItem from '../CatalogItem/CatalogItem';
import {connect} from 'react-redux'
import * as actions from '../../reduxActions/reduxActions'

class Catalog extends Component {

    render () {
        const {products} = this.props;

        const catalogItems = products.products ? 
            products.products.map(item => <CatalogItem key={item.id} {...item}/>)
        : 'loading'

        return (
            <section className="catalog">
                <h1 onClick={() => console.log(store.getState())} className="catalog__header">{products.name} products</h1>
                <ul className="catalog-list">
                    {catalogItems}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        currency: state.currency
    }
}

export default connect(mapStateToProps, actions)(Catalog)