'use strict';

var React = require('react');
var Link = require('react-router').Link;
export default class UserModal extends React.Component {
  close(){
    this.props.history.replaceState(null, '/map');
  }
  stop(event){
    event.stopPropagation();
  }
  render(){
    return(
      <div className="modal-wrapper" onClick={this.close.bind(this)}>
        <div className="modal-inner" onClick={this.stop}>
          <Link className="modal-close" to={"/map"}>Close</Link>
          <h2>User Information</h2>
          <p>Do you have any respiratory issues?</p>
          <div className="input-group">
            <input type="checkbox"/><label>Asthma</label>
          </div>
          <div className="input-group">
            <input type="checkbox"/><label>Copd</label>
          </div>
        </div>
      </div>
      )
  }
}
