import './Catalog.sass'
import { Component } from 'react';
import store from '../../store/store'
import CatalogItem from '../CatalogItem/CatalogItem';
import {connect} from 'react-redux'
import * as actions from '../../reduxActions/reduxActions'

class Catalog extends Component {

    render () {
        const catalogItems = this.props.products.products ? 
            this.props.products.products.map(item => {
                const {id, gallery, prices} = item
                return <CatalogItem key={id} image={gallery[0]} price={prices.filter(item => item.currency.symbol === this.props.currency)[0]} {...item}/>
            })
        : 'loading'

        return (
            <section className="catalog">
                <h1 onClick={() => console.log(store.getState())} className="catalog__header">{this.props.products.name} products</h1>
                {/* <div> */}
                    {/* <input type="radio" name='elephant' id="1"/>
                    <label htmlFor="1">1</label>

                    <input type="radio" name='elephant' id="2"/>
                    <label htmlFor="2">2</label>

                    <input type="radio" name='elephant' id="3"/>
                    <label htmlFor="3">3</label> */}

                    {/* <label><input type="radio" name='elephant1' id="1"/></label>
                    <label><input type="radio" name='elephant1' id="2"/></label>
                    <label><input type="radio" name='elephant1' id="3"/></label>
                </div> */}
                

                {/* <div>
                    <label><input type="radio" name='elephant1' id="1"/></label>
                    <label htmlFor="1">1</label>

                    
                    <label><input type="radio" name='elephant1' id="2"/></label>

                    <label><input type="radio" name='elephant1' id="3"/></label>
                    <input type="radio" name='elephant1' id="3"/>
                    <label htmlFor="3">3</label>
                </div> */}
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