import React, { Component } from 'react';
import $ from 'jquery';
import * as d3 from "d3";
import PropTypes from 'prop-types';

import{connect} from 'react-redux';

class ImageViewer extends Component {
    constructor(props){
        super(props);
        this.state={
            imageHeight:0,
            imageWidth:0
        }
        this.allowedClicks=0;
        this.svg={};
        this.coods=[];
        this.clicks=0;this.shapesNumber=0;
        this.coordinates={};this.draw={};
        this.currentShape='';

        this.viewerStyle={
            position: 'relative',
            overflow: 'auto',
            maxWidth: '80%',
            maxHeight: '70vh'
        }

        this.svgStyle={
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex:2
        }
    }

    render() {  
        console.log('props in image viewer render',this.props);
        const{shapeDetails,image}=this.props;
        if(Object.keys(shapeDetails).length>0){            
            let keys=Object.keys(shapeDetails);
            keys.forEach((ele)=>{
                shapeDetails[ele].forEach((element,index,array) => {
                    drawPoints(element[0],element[1],this.draw)
                    if(index<array.length-1){
                        drawLines(element[0],element[1], array[index+1][0],array[index+1][1],this.draw)
                    }else{
                        drawLines(element[0],element[1],array[0][0],array[0][1],this.draw)
                    }
                });
            })       
        }      
        const {shape}=this.props;        
        switch(shape){
            case 'line':this.allowedClicks=2;
            break;
            case 'rectangle':this.allowedClicks=4; 
            break;
            default:
        }
        return (
            <div>
                <div id='viewer' style={this.viewerStyle} >
                <img id='image' src={image} alt=''></img>
                <svg id='svg' style={ this.svgStyle} onClick={this.svgClicked} height={this.state.imageHeight}
                width={this.state.imageWidth}></svg>               
            </div>
            <button onClick={this.submitAction}>Submit</button>
            </div>
        )
    }

    componentDidMount(){
        let image=document.getElementById('image');
        this.svg=$('svg');
        this.draw=d3.select('#svg')
        this.setState({
            imageHeight:image.naturalHeight,
            imageWidth:image.naturalWidth
        });
    }

    svgClicked=(event)=>{  
        const {shape}=this.props;      
        const x = Math.round(event.pageX - $('#svg').offset().left);
        const y = Math.round(event.pageY - $('#svg').offset().top);
        if(this.clicks===0){           
            this.clicks++;
            drawPoints(x,y,this.draw);
            this.coods.push([x,y]);  
            this.coordinates[ `${shape}${this.shapesNumber}`]=this.coods;            
        }
        else if(this.clicks<this.allowedClicks-1){          
            this.clicks++;
            drawPoints(x,y,this.draw);
            this.coods.push([x,y]);  
            this.coordinates[ `${shape}${this.shapesNumber}`]=this.coods;
            let xcood=this.coordinates[ `${shape}${this.shapesNumber}`][this.clicks-2][0];
            let ycood=this.coordinates[ `${shape}${this.shapesNumber}`][this.clicks-2][1];
            drawLines(xcood,ycood,x,y,this.draw);                      
        }
        else{ 
            drawPoints(x,y,this.draw); 
            if(this.currentShape!=='line'){
                this.draw
                .append('line')
                .attr('x1', this.coordinates[ `${shape}${this.shapesNumber}`][this.clicks-1][0])
                .attr('y1', this.coordinates[ `${shape}${this.shapesNumber}`][this.clicks-1][1])
                .attr('x2', x)
                .attr('y2', y)
                .attr('stroke-width', 2)
                .attr('stroke', 'blue')
            }
                   
            this.draw
            .append('line')
            .attr('x1', x)
            .attr('y1', y)
            .attr('x2', this.coordinates[ `${shape}${this.shapesNumber}`][0][0])
            .attr('y2', this.coordinates[ `${shape}${this.shapesNumber}`][0][1])            
            .attr('stroke-width', 2)
            .attr('stroke', 'blue');
            this.coods=[];
            this.shapesNumber++;
            this.clicks=0;
        }        
    }

    submitAction=()=>{
        this.props.getCoordinates(this.coordinates);       
    }
}

ImageViewer.propTypes = {
    shapeDetails: PropTypes.object,
    image: PropTypes.string,
    shape: PropTypes.string,
    getCoordinates: PropTypes.func
  };

function drawPoints(x,y,draw){
    draw
    .append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 3)
    .attr('fill', 'red');
}

function drawLines(x1,y1,x2,y2,draw){    
    draw
    .append('line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('stroke-width', 2)
    .attr('stroke', 'blue')
}

function mapStateToProps(state) {
    return state
}


export default connect(mapStateToProps)(ImageViewer)
