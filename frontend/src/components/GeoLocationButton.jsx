'use strict';

var React = require('react');


export default class GeoLocationButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {geolocation: navigator.geolocation};
  }
  render(){
    var button = (this.state.geolocation)? <div className="btn btn-default btn-xs btn-success searchgrid-btn" role="button" onClick={this.storeGeoLocation.bind(this)}>Use current location <i className={"icon-location-arrow"}></i></div> : '';
    return (
      <span>{button}</span>
    )
  }
  storeGeoLocation(){
    if(this.props.history != undefined){
      this.props.history.pushState(null, '/map');
    }
    var _this = this;
    this.state.geolocation.getCurrentPosition(function(location){
      _this.props.storeLocation({
        postcode: 'Current Location',
        lat: location.coords.latitude,
        lon: location.coords.longitude
      });
    },function(){return 0}, function(){return {maximumAge:5*60*1000}});
  }
}
