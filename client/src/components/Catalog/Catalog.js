import './Catalog.sass'
import { Component } from 'react';
import CatalogItem from '../CatalogItem/CatalogItem';
import {connect} from 'react-redux'
import * as actions from '../../reduxActions/reduxActions'

class Catalog extends Component {

    render () {
        const {products} = this.props;

        return (
            <section className="catalog">
                <h1 className="catalog__header">{products.name} products</h1>
                <ul className="catalog-list">
                    {products.products.map(item => <CatalogItem key={item.id} data={item}/>)}
                </ul>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    }
}

export default connect(mapStateToProps, actions)(Catalog)