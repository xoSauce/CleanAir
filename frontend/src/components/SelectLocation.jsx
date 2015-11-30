'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class SelectLocation extends React.Component {
  render(){
    if(this.props.location.length > 0){
      this.props.history.replaceState(null, '/map');
    }
    return (<div>
      <div id="search">
        <div id="searchbox">
          <label>Search an area by specifying the postcode below</label>
          <input type="text" className="form-control featured-input" placeholder="Postcode"/>
          <Link className="btn btn-default featured-btn" role="button" to="/map">Use my current location</Link>
          <Link className="btn btn-primary featured-btn" role="button" to="/map">Search</Link>
        </div>
      </div>
    </div>);
  }
}
