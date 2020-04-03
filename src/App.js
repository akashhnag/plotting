import React,{Component} from 'react';
import './App.css';
import ImageViewer from './components/ImageViewer';
import ShapeSelect from './components/shapeSelect';
import {getShapes} from './utils';
import image from './1080.jpg'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      shapeDetails:{}
    }   
  }

  render(){    
    return (
      <div>       
        <ImageViewer shapeDetails={this.state.shapeDetails} image={image} getCoordinates={this.getCoordinates}></ImageViewer>
        <ShapeSelect></ShapeSelect>        
      </div>
    );
  }

  getCoordinates=(coordinates)=>{
    console.log('get coordinates',coordinates);
    
  }

  componentDidMount(){
    getShapes.then((res)=>{
      console.log('res in app',res);
      for(let i in res){
        console.log('i',i);
        
      }
      this.setState({
        shapeDetails:res
      },()=>{
        console.log('state changed',this.state.shapeDetails);
        
      })
    })
  }
}


export default App;
