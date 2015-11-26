'use strict';

var React = require('react');
var Link = require('react-router').Link;
import SideNav from './SideNav.jsx';
import GMaps from './GMaps.jsx';

export default class Map extends React.Component {
  render(){
    return (
      <div>
        <h1>MAP</h1>
        <SideNav/>
        <GMaps/>
      </div>
      )
  }
}