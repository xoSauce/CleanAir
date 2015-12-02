'use strict';

var React = require('react');
var Link = require('react-router').Link;
import SideNav from './SideNav.jsx';
import GMaps from './GMaps.jsx';

export default class Map extends React.Component {
  constructor(){
    super();
    this.state = {'showSideNav': true};
  }
  render(){
    return (
      <div id="panel">
        <div id="panel-logo"></div>
        <Link className="floating-button" to="/map/info-modal">?</Link>
        <GMaps geolocation={this.props.geolocation} pollution={this.props.pollution}/>
        <SideNav geolocation={this.props.geolocation} pollution={this.props.pollution} storeLocation={this.props.storeLocation}/>
        {this.props.children}
      </div>
      )
  }
}
