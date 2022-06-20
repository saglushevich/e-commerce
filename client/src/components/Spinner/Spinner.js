import { Component } from "react";
import spinner from '../../resources/spinner/spinner.svg'

class Spinner extends Component {
    render () {
        return (
            <div className="spinner" style={{"paddingTop":"120px"}}>
                <img src={spinner} alt="Loading spinner" style={{"display":"block", "margin":"0 auto"}}/>
            </div>
        )
    }
    
}

export default Spinner