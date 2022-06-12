import { Component } from "react";
import Header from "../Header/Header";
import SingleProduct from "../SingleProduct/SingleProduct";
import {connect} from 'react-redux'

class SingleProductPage extends Component {
    render () {
        return (
            <>
                <Header/>
                {this.props.selectedProduct.name ? <SingleProduct/> : 'loading'}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedProduct: state.selectedProduct,
    }
}

export default connect(mapStateToProps)(SingleProductPage)