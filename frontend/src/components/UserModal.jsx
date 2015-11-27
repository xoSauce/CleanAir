'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class UserModal extends React.Component {
  render(){
    return(
      <div className="modal-wrapper">
        <div className="modal-inner">
          User Modal
          <Link id="close-user" to={"/map"}>Close</Link>
        </div>
      </div>
      )
  }
}
