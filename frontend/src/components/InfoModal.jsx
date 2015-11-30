'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class InfoModal extends React.Component {
  close(){
    this.props.history.replaceState(null, '/map');
  }
  render(){
    return(
      <div className="modal-wrapper" onClick={this.close.bind(this)}>
        <div className="modal-inner">
          Info Modal
          <Link id="close-info" to={"/map"}>Close</Link>
        </div>
      </div>
      )
  }
}
