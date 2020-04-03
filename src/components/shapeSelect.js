import React, { Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {shapeChangeAction} from '../actions';

class shapeSelect extends Component {
    constructor(props){
        super(props);
        this.state={
            currentShape:''
        }
    }
    render() {
        console.log('props in render',this.props);
        
        return (
            <div>
                <button id='line' onClick={this.shapeChange}>Line</button>
                <button id='rectangle' onClick={this.shapeChange}>Rectangle</button>
            </div>
        )
    }

    shapeChange=(e)=>{
        this.props.currentShape(e.target.id)
        // this.setState({
        //     state:e.target.id
        // },()=>{
        //     console.log('changed state',this.state);
        // })
    }
}

// function mapStateToProps(state){
//     console.log('maps state',state);
//     return(
//         {
//             currentShape:state
//         }
       
//     )
// }

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        currentShape: shapeChangeAction
    }, dispatch)
}

export default connect(null,matchDispatchToProps)(shapeSelect)
