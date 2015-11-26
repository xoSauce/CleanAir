'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class UserModal extends React.Component {
  render(){
    return(
      <div>
      User Modal
      <Link to={"/map"}>Close</Link>
      </div>
      )
  }
}