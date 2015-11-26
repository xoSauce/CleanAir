'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class SideNav extends React.Component {
  render(){
    return(
      <div style={{width: '100px', float: 'left', height: window.height + 'px'}}>
        This is actually the SideNav
      </div>
      )
  }
}