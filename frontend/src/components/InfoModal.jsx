'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class InfoModal extends React.Component {
  render(){
    return(
      <div className="modal-wrapper">
        <div className="modal-inner">
          Info Modal
          <Link id="close-info" to={"/map"}>Close</Link>
        </div>
      </div>
      )
  }
}
