import { Component } from "react";
import Header from "../Header/Header";
import Catalog from "../Catalog/Catalog";

class CatalogPage extends Component {
    render () {
        return (
            <>
                <Header/>
                <Catalog/>
            </>
        )
    }
}

export default CatalogPage