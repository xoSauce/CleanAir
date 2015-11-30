'use strict';

var React = require('react');
var Link = require('react-router').Link;
export default class PropertyModal extends React.Component {
  close(){
    this.props.history.replaceState(null, '/map');
  }
  render(){
    return(
      <div className="modal-wrapper" onClick={this.close.bind(this)}>
        <div className="modal-inner">
          Property Modal
          <Link id="close-property" to={"/map"}>Close</Link>
        </div>
      </div>
      )
  }
}
