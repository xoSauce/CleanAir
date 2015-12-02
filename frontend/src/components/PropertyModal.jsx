'use strict';

var React = require('react');
var Link = require('react-router').Link;
export default class PropertyModal extends React.Component {
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
          <h3>Property Search</h3>
          <div className="input-group">
            <input type="checkbox"/><label>To buy</label>
          </div>
          <div className="input-group">
            <input type="checkbox"/><label>To rent</label>
          </div>
          <hr/>
          <h3>Property type</h3>
          <div className="input-group">
            <input type="checkbox"/><label>Houses</label>
          </div>
          <div className="input-group">
            <input type="checkbox"/><label>Flats</label>
          </div>
          <hr/>
          <h3>Price Range</h3>
          <div className="input-group">
            <label>&pound;</label><input type="number"/><input type="number"/>
          </div>
          <hr/>
          <h3>Number of bedrooms</h3>
          <div className="input-group">
            <input type="number"/>
          </div>


        </div>
      </div>
      )
  }
}
