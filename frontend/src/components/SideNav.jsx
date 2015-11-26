'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class SideNav extends React.Component {
  render(){
    return(
      <div style={{width: '100px', position: 'absolute', left: 0, top: 0, height: window.height + 'px'}}>
        <h1>Search</h1>
        <label>Enter Postcode</label>
        <input type="text" placeholder="Enter Postcode"/>
        <hr/>
        <label>Use current location</label>
        <input type="checkbox"/>
        <hr/>
        <div>
          <Link to={'/map/property-modal'}>Property Search Edit</Link>
        </div>
        <div>
          List of things that we are looking for
        </div>
        <hr/>
        <div>
          <Link to="/map/user-modal">User information</Link>
        </div>
        <hr/>
        <Link to={"/map"}>Search</Link>
      </div>
      )
  }
}