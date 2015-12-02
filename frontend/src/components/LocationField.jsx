'use strict';

var React = require('react');
import Geosuggest from 'react-geosuggest';

export default class LocationField extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentLocation: true}
  }
  change(){
    document.getElementsByClassName('geosuggest__input')[0].select();
  }
  setFalse(){
    this.setState({currentLocation: false});
  }
  componentDidUpdate(){
    if(!this.state.currentLocation)
    {
      //auto select on re-render
      document.getElementsByClassName('geosuggest__input')[0].select();
    }
  }
  locationSelected(suggest){
    var data = {
      postcode: suggest.label,
      lat: suggest.location.lat,
      lon: suggest.location.lng
    }
    this.props.storeLocation(data);
  }
  render(){
    return (
      <div><Geosuggest id="geo" country="gb" onFocus={this.change.bind(this)} onSuggestSelect={this.locationSelected.bind(this)} initialValue={this.props.geolocation.postcode}/></div>
      )
  }
}