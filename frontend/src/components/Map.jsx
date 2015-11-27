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
        <h1>MAP</h1>
        <GMaps/>
        <SideNav/>
        {this.props.children}
      </div>
      )
  }
}
