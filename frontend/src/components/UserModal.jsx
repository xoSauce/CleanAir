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
  isSelected(key, preference){
    if(this.props.preferences[preference] == key){
      return "checked";
    }
    return "";
  }
  isChecked(key, preference){
    if(this.props.preferences[preference].includes(key)){
      return "checked";
    }
    return "";
  }
  updatePreferences(event){
    var key = event.target.name;
    var value = event.target.value;
    var obj = {};
    obj[key] = value;
    this.props.updatePreferences(obj);
  }
  updateRespPreferences(event){
    var key = event.target.name;
    var value = event.target.value;
    var isChecked = event.target.checked;
    console.log(key, value, isChecked);
    if(value == 'none'){
      this.props.updatePreferences({'respiratory_issues': ['none']});
    }
    else{
      var newprefs = this.props.preferences['respiratory_issues'];
      if(newprefs.includes('none')){
          newprefs.splice(newprefs.indexOf('none'), 1);
      }
      if(!isChecked){
        newprefs.splice(newprefs.indexOf(value), 1);
      }
      if(isChecked){
        console.log('hello');
        if(newprefs.includes(value)){
          newprefs.splice(newprefs.indexOf(value),1);
        }
        newprefs.push(value);
      }
      console.log(newprefs);
      this.props.updatePreferences({'respiratory_issues': newprefs});
    }
  }
  render(){
    return(
       <div className="modal-wrapper" onClick={this.close.bind(this)}>
        <div className="modal-inner" onClick={this.stop}>
          <Link className="modal-close" to={"/map"}>Close</Link>
          <h2>User Information</h2>
          <p>What is your age?</p>
          <div className="input-group-wrapper">
            <div className="input-group">
              <input type="radio" name="age" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('20', 'age')} value="20"/>&nbsp;<label>&lt;20</label>
            &nbsp;&nbsp;<input type="radio" name="age" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('20-30', 'age')} value="20-30"/>&nbsp;<label>20-30</label>
          &nbsp;&nbsp;<input type="radio" name="age" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('30-40', 'age')} value="30-40"/>&nbsp;<label>30-40</label>
        &nbsp;&nbsp;<input type="radio" name="age" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('40-50', 'age')} value="40-50"/>&nbsp;<label>40-50</label>
      &nbsp;&nbsp;<input type="radio" name="age" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('50-60', 'age')} value="50-60"/>&nbsp;<label>50-60</label>
    &nbsp;&nbsp;<input type="radio" name="age" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('60', 'age')} value="60"/>&nbsp;<label>&gt;60</label>
            </div>
          </div>
          <p>Do you have any children?</p>
          <div className="input-group-wrapper">
            <div className="input-group">
              <from>
                <input type="radio" name="children" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('yes', 'children')} value="yes"/><label>&nbsp;Yes</label>
                &nbsp;&nbsp;<input type="radio" name="children" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('expecting', 'children')} value="expecting"/><label>&nbsp;Expecting</label>
                &nbsp;&nbsp;<input type="radio" name="children" onChange={this.updatePreferences.bind(this)} checked={this.isSelected('no', 'children')} value="no"/><label>&nbsp;No</label>
              </from>
            </div>
          </div>
          <p>Do you have any respiratory conditions?</p>
          <div className="input-group-wrapper">
            <div className="input-group">
                <input type="checkbox" name="respiratory_issues" onChange={this.updateRespPreferences.bind(this)} checked={this.isChecked('asthma', 'respiratory_issues')} value="asthma"/><label>&nbsp;Asthma</label>
                &nbsp;&nbsp;<input type="checkbox" name="respiratory_issues" onChange={this.updateRespPreferences.bind(this)} checked={this.isChecked('copd', 'respiratory_issues')} value="copd"/><label>&nbsp;COPD</label>
              &nbsp;&nbsp;<input type="checkbox" name="respiratory_issues" onChange={this.updateRespPreferences.bind(this)} checked={this.isChecked('none', 'respiratory_issues')} value="none"/><label>&nbsp;None</label>
            </div>
          </div>
          <hr/>
          <div className="input-group-wrapper">
            <div className="input-group">
              <Link className="btn btn-success" to={"/map/info-modal"}>Submit</Link>
            </div>
          </div>
        </div>
      </div>
      )
  }
}
