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
          <p>What is your age?</p>
          <div className="input-group-wrapper">
            <div className="input-group">
              <from>
                <input type="radio" name="age" onclick="check(this.value)" value="18"/>&nbsp;<label>&lt;18</label>
                &nbsp;&nbsp;<input type="radio" name="age" onclick="check(this.value)" value="18-20"/>&nbsp;<label>18-20</label>
                &nbsp;&nbsp;<input type="radio" name="age" onclick="check(this.value)" value="20-30"/>&nbsp;<label>20-30</label>
                &nbsp;&nbsp;<input type="radio" name="age" onclick="check(this.value)" value="30-40"/>&nbsp;<label>30-40</label>
                &nbsp;&nbsp;<input type="radio" name="age" onclick="check(this.value)" value="40-50"/>&nbsp;<label>40-50</label>
                &nbsp;&nbsp;<input type="radio" name="age" onclick="check(this.value)" value="50-60"/>&nbsp;<label>50-60</label>
                &nbsp;&nbsp;<input type="radio" name="age" onclick="check(this.value)" value="60"/>&nbsp;<label>&gt;60</label>
              </from>
            </div> 
          </div>
          <p>Do you have any children?</p>
          <div className="input-group-wrapper">
            <div className="input-group">
              <from>
                <input type="radio" name="children" onclick="check(this.value)" value="Yes"/><label>&nbsp;Yes</label>
                &nbsp;&nbsp;<input type="radio" name="children" onclick="check(this.value)" value="No"/><label>&nbsp;No</label>
              </from>
            </div> 
          </div>
          <p>Do you have any respiratory?</p>
          <div className="input-group-wrapper">
            <div className="input-group">
             <from>
                <input type="radio" name="resp" onclick="check(this.value)" value="Asthma"/><label>&nbsp;Asthma</label>
                &nbsp;&nbsp;<input type="radio" name="resp" onclick="check(this.value)" value="COPD"/><label>&nbsp;COPD</label>
                &nbsp;&nbsp;<input type="radio" name="resp" onclick="check(this.value)" value="None"/><label>&nbsp;None</label>
             </from>
            </div> 
          </div>
        </div>
      </div>
      )
  }
}

