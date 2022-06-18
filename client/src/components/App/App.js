import { Component } from "react";
import '../../styles/styles.sass'
import CatalogPage from "../Pages/CatalogPage";
import SingleProductPage from "../Pages/SingleProductPage";
import CartPage from "../Pages/CartPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {getCurrencies, getCategories, getProductsByCategories} from '../../actions/actions'
import * as actions from '../../reduxActions/reduxActions'
import {connect} from 'react-redux'


class App extends Component {

    getData = async () => {
        await getCurrencies().then(items => items.data.currencies).then(items => this.props.setCurrencies(items));
        await getCategories().then(items => items.data.categories).then(items => this.props.setCategories(items));
        await getProductsByCategories(sessionStorage.getItem('category') || 'all').then(items => items.data.category).then(items => this.props.setProducts(items));
    }

    componentDidMount() {
        this.getData()
    }

    render () {
        return (
            <BrowserRouter>
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <CatalogPage/>
                        </Route>
                        <Route path="/product/:product_id">
                            <SingleProductPage/>
                        </Route>
                        <Route path="/cart">
                            <CartPage/>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, actions)(App);