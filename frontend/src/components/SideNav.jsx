'use strict';

var React = require('react');
var Link = require('react-router').Link;
import GeoLocationButton from './GeoLocationButton.jsx';
import LocationField from './LocationField.jsx';


export default class SideNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {show: true, showCurrentLocation: true};
  }
  toggleShow(){
    this.setState({show: !this.state.show});
  }
  render(){
    return(
      <div id="sidebar">

        <div className={["sidebar-body", (this.state.show?'open':'closed')].join(" ")}>
          <h1>Search</h1>
          <label>Enter Location</label>
          <LocationField 
            storeLocation={this.props.storeLocation} 
            geolocation={this.props.geolocation}
            currentLocation={this.state.showCurrentLocation}/>
          <hr/>
          <GeoLocationButton text={this.props.geolocation.postcode} storeLocation={this.props.storeLocation}/>
          <hr/>
          <div>
            <Link to={'/map/property-modal'}>Property Search Edit</Link>
          </div>
          <div>
            List of things that we are looking for
          </div>
          <hr/>
          <div>
            <Link to={'/map/user-modal'}>User information</Link>
          </div>
          <hr/>
          <Link className="btn btn-default featured-btn" to={"/map"}>Search</Link>
          <div className="toggle-button" onClick={this.toggleShow.bind(this)}>{this.state.show? 'Close': 'Open'}</div>
        </div>
      </div>
      )
  }
}
