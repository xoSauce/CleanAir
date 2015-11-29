'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class Intro extends React.Component {
  render(){
    return(
      <div id="intro">
        <div id="product-logo"></div>
        <p>Live A Cleaner Life</p>
        <Link className="btn btn-default featured-btn" role="button" to={'/select-location'}>Let's Go</Link>
      </div>
    )
  }
}
