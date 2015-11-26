'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class Home extends React.Component {
  render(){
    return(
      <div>
        <p>Child View 1</p>
        <Link to={`/App`}>blaah</Link>
      </div>
    )
  }
}