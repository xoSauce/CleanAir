'use strict';

var React = require('react');
var Link = require('react-router').Link;
import GeoLocationButton from './GeoLocationButton.jsx';
import LocationField from './LocationField.jsx';

export default class SelectLocation extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      <div id="search">
        <div id="searchbox">
          <div className="col-sm-12">
            <label>Search an area by specifying the place or postcode below</label>
          </div>
          <div className="col-sm-12 intro-search">
            <div className="row"><LocationField currentLocation={true} geolocation={this.props.geolocation} storeLocation={this.props.storeLocation}/></div>
            <GeoLocationButton history={this.props.history} storeLocation={this.props.storeLocation} geolocation={this.props.geolocation}/>
            <div className="row"><Link className="btn btn-primary featured-btn" role="button" to="/map">Search <i className={"icon-search"}></i></Link></div>
          </div>
        </div>
      </div>
    </div>);
  }
  updateLocation(event){
    console.log(event.target.value)
  }
}
