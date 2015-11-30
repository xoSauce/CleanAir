'use strict';

var React = require('react');
var Link = require('react-router').Link;
import GeoLocationButton from './GeoLocationButton.jsx';

export default class SelectLocation extends React.Component {
  constructor(props){
    super(props);
    if(this.props.geolocation.postcode != null){
      this.props.history.replaceState(null, '/map');
    }
  }
  componentDidUpdate(){
    if(this.props.geolocation.postcode != null){
      this.props.history.replaceState(null, '/map');
    } 
  }
  render(){
    return (<div>
      <div id="search">
        <div id="searchbox">
          <label>Search an area by specifying the postcode below</label>
          <input type="text" className="form-control featured-input" placeholder="Postcode" value={(this.props.geolocation.postcode)? this.props.geolocation.postcode: ''} onChange={this.updateLocation.bind(this)}/>
          <GeoLocationButton storeLocation={this.props.storeLocation}/>
          <Link className="btn btn-primary featured-btn" role="button" to="/map">Search</Link>
        </div>
      </div>
    </div>);
  }
  updateLocation(event){
    console.log(event.target.value)
  }
}
