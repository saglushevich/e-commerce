import { Component } from "react";
import '../../styles/styles.sass'
import CatalogPage from "../Pages/CatalogPage";
import SingleProductPage from "../Pages/SingleProductPage";
import CartPage from "../Pages/CartPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {getCurrencies, getCategories, getProductsByCategories} from '../../actions/actions'
import * as actions from '../../reduxActions/reduxActions'
import {connect} from 'react-redux'
import Spinner from "../Spinner/Spinner";


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            dataLoading: true
        }
    }

    toggleDataLoading = (value) => {
        this.setState({
            dataLoading: value
        })
    }

    getData = async () => {
        this.toggleDataLoading(true)

        const {setCurrencies, setCategories, setProducts} = this.props;

        await getCurrencies().then(items => items.currencies).then(items => setCurrencies(items));
        await getCategories().then(items => items.categories).then(items => setCategories(items));
        await getProductsByCategories(sessionStorage.getItem('category') || 'all').then(items => items.category).then(items => setProducts(items));

        this.toggleDataLoading(false)
    }

    componentDidMount() {
        this.getData()
    }

    render () {
        return (
            <BrowserRouter>
                <div className="container">
                    {this.state.dataLoading ? <Spinner/> :
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
                    </Switch>}
                </div>
            </BrowserRouter>
        )
    }
}


export default connect(null, actions)(App);