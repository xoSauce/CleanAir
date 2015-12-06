'use strict';

var React = require('react');
var Link = require('react-router').Link;
import GeoLocationButton from './GeoLocationButton.jsx';
import LocationField from './LocationField.jsx';


export default class SideNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {show: (window.innerWidth > 768), showCurrentLocation: true};
  }
  toggleShow(){
    this.setState({show: !this.state.show});
  }
  render(){
    return(
      <div id="sidebar">

        <div className={["sidebar-body", (this.state.show?'open':'closed')].join(" ")}>
          <div className={"sidebar-grid sidebar-green"}>
             <i className={"icon-search"}></i> Search
            <LocationField
              storeLocation={this.props.storeLocation}
              geolocation={this.props.geolocation}
              currentLocation={this.state.showCurrentLocation}/>
            <GeoLocationButton history={this.props.history} text={this.props.geolocation.postcode} storeLocation={this.props.storeLocation}/>
          </div>
          <div className={"sidebar-grid sidebar-grey"}>
            <i className={"icon-filter"}></i> Search Filter
            <Link className={"btn btn-default btn-xs searchgrid-btn"} to={'/map/property-modal'}>Property Search Edit <i className={"icon-home"}></i></Link>
          </div>
          <div className={"sidebar-grid sidebar-grey"}>
            <i className={"icon-user"}></i> User Information
            <Link className={"btn btn-default btn-xs searchgrid-btn"} to={'/map/user-modal'}>Personal Info Edit <i className={"icon-info"}></i></Link>
          </div>
          <hr/>
          <Link className="btn btn-success sidebar-bigbtn" to={"/map"}>Search <i className={"icon-search"}></i></Link>
          <div className="toggle-button" onClick={this.toggleShow.bind(this)}>{this.state.show? <i className={"icon-chevron-left"}></i>: <i className={"icon-chevron-right"}></i>}</div>
        </div>
      </div>
      )
  }
}
