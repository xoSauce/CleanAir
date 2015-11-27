'use strict';

var React = require('react');
var Link = require('react-router').Link;
export default class UserModal extends React.Component {
  close(){
    this.props.history.replaceState(null, '/map');
  }
  render(){
    return(
      <div className="modal-wrapper" onClick={this.close.bind(this)}>
        <div className="modal-inner">
          User Modal
          <Link id="close-user" to={"/map"}>Close</Link>
        </div>
      </div>
      )
  }
}
