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
  updatePreferences(event){
    var key = event.target.value;
    var value = event.target.checked;
    var obj = {};
    obj[key] = value;
    this.props.updateFilters(obj);
  }
  updateNumberPreference(event){
    var key = event.target.name;
    var value = parseInt(event.target.value);
    var obj = {};
    obj[key] = value;
    this.props.updateFilters(obj);
  }
  isChecked(key){
    if(this.props.filters[key] == true){
      return "checked";
    }
    return "";
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
                  <input type="checkbox" name="property" checked={this.isChecked('toBuy')} onChange={this.updatePreferences.bind(this)} value="toBuy"/><label>&nbsp;&nbsp;To buy</label>
                  &nbsp;&nbsp;<input type="checkbox" name="property" checked={this.isChecked('toRent')} onChange={this.updatePreferences.bind(this)} value="toRent"/><label>&nbsp;&nbsp;To rent</label>
                </from>
              </div>
            </div>
          <hr/>
          <h3>Property Type</h3>
            <div className="input-group-wrapper">
              <div className="input-group">
                <from>
                  <input type="checkbox" name="type" checked={this.isChecked('houses')} onChange={this.updatePreferences.bind(this)} value="houses"/><label>&nbsp;&nbsp;Houses</label>
                  &nbsp;&nbsp;<input type="checkbox" name="type" checked={this.isChecked('flats')} onChange={this.updatePreferences.bind(this)} value="flats"/><label>&nbsp;&nbsp;Flats</label>
                </from>
              </div>
            </div>
          <hr/>
          <h3>Price Range</h3>
          <div className="input-group-wrapper">
            <div className="input-group">
              <label>&pound;&nbsp;</label><input type="number" name='minprice' onChange={this.updateNumberPreference.bind(this)} placeholder="No min" value={(this.props.filters.minprice != undefined)? this.props.filters.minprice : ''}/><label>&nbsp;to&nbsp;</label><input type="number" placeholder="No max" name='maxprice' onChange={this.updateNumberPreference.bind(this)} value={(this.props.filters.maxprice != undefined)? this.props.filters.maxprice : ''}/>
            </div>
          </div>
          <hr/>
          <h3>Number of bedrooms</h3>
          <div className="input-group-wrapper">
            <div className="input-group">
              <input type="number" name='minbeds' onChange={this.updateNumberPreference.bind(this)} placeholder="No min" value={(this.props.filters.minbeds != undefined)? this.props.filters.minbeds : ''}/>
            </div>
          </div>

        </div>
      </div>
      )
  }
}
