'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class InfoModal extends React.Component {
  render(){
    return(
      <div>
      Info Modal
      <Link to={"/map"}>Close</Link>
      </div>
      )
  }
}