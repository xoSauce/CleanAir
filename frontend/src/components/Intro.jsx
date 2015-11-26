'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class Intro extends React.Component {
  render(){
    return(
      <div>
        <h1>CleanAir</h1>
        <h2>Getting Started</h2>
        <p>This page will give lots of information about the site</p>
        <Link className="button" role="button" to={'/select-location'}>Let's Go</Link>
      </div>
    )
  }
}