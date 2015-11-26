'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class SelectLocation extends React.Component {
  render(){
    return (<div>
      <h1>Search</h1>
      <div style={{width: '500px', margin: 'auto'}}>
        <div style={{width: '50%', float: 'left'}}>
          <Link to="/map">Use Current Location</Link>
        </div>
        <div style={{width: '50%', float: 'left'}}>
          <label>Enter Location:</label>
          <input type="text" placeholder="Enter a PostCode"/>
          <Link to="/map">Search</Link>
        </div>
      </div>
    </div>);
  }
}