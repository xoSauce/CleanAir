'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class PropertyModal extends React.Component {
  render(){
    return(
      <div className="modal-wrapper">
        <div className="modal-inner">
          Property Modal
          <Link to={"/map"}>Close</Link>
        </div>
      </div>
      )
  }
}
