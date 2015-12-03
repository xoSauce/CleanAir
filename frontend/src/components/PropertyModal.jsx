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
            <div className="input-group-wrapper">
              <div className="input-group">
                <from>
                  <input type="radio" name="property" onclick="check(this.value)" value="toBuy"/><label>&nbsp;&nbsp;To buy</label>
                  &nbsp;&nbsp;<input type="radio" name="property" onclick="check(this.value)" value="toRent"/><label>&nbsp;&nbsp;To rent</label>
                </from>
              </div>
            </div>
          <hr/>
          <h3>Property Type</h3>
            <div className="input-group-wrapper">
              <div className="input-group">
                <from>
                  <input type="checkbox" name="type" onclick="check(this.value)" value="Houses"/><label>&nbsp;&nbsp;Houses</label>
                  &nbsp;&nbsp;<input type="checkbox" name="type" onclick="check(this.value)" value="Flats"/><label>&nbsp;&nbsp;Flats</label>
                </from>
              </div>
            </div>
          <hr/>
          <h3>Price Range</h3>
          <div className="input-group-wrapper">
            <div className="input-group">
              <label>&pound;&nbsp;</label><input type="number"/><label>&nbsp;to&nbsp;</label><input type="number"/>
            </div>
          </div>
          <hr/>
          <h3>Number of bedrooms</h3>
          <div className="input-group-wrapper">
            <div className="input-group">
              <input type="number"/>
            </div>
          </div>

        </div>
      </div>
      )
  }
}
