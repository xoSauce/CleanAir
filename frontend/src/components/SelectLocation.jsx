'use strict';

var React = require('react');
var Link = require('react-router').Link;
import GeoLocationButton from './GeoLocationButton.jsx';
import LocationField from './LocationField.jsx';

export default class SelectLocation extends React.Component {
  constructor(props){
    super(props);
    // if(this.props.geolocation.postcode != null){
    //   this.props.history.replaceState(null, '/map');
    // }
  }
  render(){
    return (<div>
      <div id="search">
        <div id="searchbox">
          <div className="col-sm-12">
            <label>Search an area by specifying the postcode below</label>
          </div>
          <div className="col-sm-6">
            <GeoLocationButton storeLocation={this.props.storeLocation}/>
          </div>
          <div className="col-sm-6">
            <div className="row"><LocationField currentLocation={true}/></div>
            <div className="row"><Link className="btn btn-primary featured-btn" role="button" to="/map">Search</Link></div>
          </div>
        </div>
      </div>
    </div>);
  }
  updateLocation(event){
    console.log(event.target.value)
  }
}
