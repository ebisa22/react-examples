import { Component } from "react";

class Count extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <p>Total number of todo: {this.props.numberOfTodos}</p>
        )
    }
}

export default Count;