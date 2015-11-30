'use strict';

var React = require('react');
import Geosuggest from 'react-geosuggest';

export default class LocationField extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentLocation: true}
  }
  change(event){
    event.target.select();
  }
  setFalse(){
    this.setState({currentLocation: false});
  }
  render(){
    var obj = (this.state.currentLocation)? <input onChange={this.setFalse.bind(this)} onClick={this.change.bind(this)} value="Current Location"/> : <Geosuggest country="gb"/>
    return (
      <span>{obj}</span>
      )
  }
}