import { Component } from "react";
import Header from "../Header/Header";
import Cart from '../Cart/Cart'

class CartPage extends Component{
    render () {
        return (
            <>
                <Header/>
                <Cart/>
            </>
        )
    }
}

export default CartPage