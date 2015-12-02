'use strict';

var React = require('react');
var Link = require('react-router').Link;
import GeoLocationButton from './GeoLocationButton.jsx';

export default class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {show: true};
  }
  toggleShow(){
    this.setState({show: !this.state.show});
  }
  render(){
    return(
      <div id="sidebar">

        <div className={["sidebar-body", (this.state.show?'open':'closed')].join(" ")}>
          <div className={"sidebar-grid"}>
            Search <i className={"icon-search"}></i>
          </div>
          <label>Enter Location</label>
          <input type="text" placeholder="Enter Location" value={(this.props.geolocation.postcode)? this.props.geolocation.postcode : ''}/>
          <hr/>
          <GeoLocationButton storeLocation={this.props.storeLocation}/>
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
          <div className="toggle-button" onClick={this.toggleShow.bind(this)}>{this.state.show? <i className={"icon-chevron-left"}></i>: <i className={"icon-chevron-right"}></i>}</div>
        </div>
      </div>
      )
  }
}
