import { Component } from "react";
import Header from "../Header/Header";
import SingleProduct from "../SingleProduct/SingleProduct";
import {withRouter} from "react-router-dom"
import {getProductInfo} from '../../actions/actions'

class SingleProductPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            productId: this.props.match.params.product_id,
            data: {}
        }
    }

    getData = async () => {
        await getProductInfo(this.state.productId).then(items => items.data.product).then(items => {
            this.setState({
                data: items
            })
        })
    }

    componentDidMount () {
        this.getData()
    }

    render () {
        const {data} = this.state

        return (
            <>
                <Header/>
                {data.name ? <SingleProduct data={data}/> : 'loading'}
            </>
        )
    }
}

export default withRouter(SingleProductPage)