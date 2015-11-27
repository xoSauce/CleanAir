'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {show: true};
  }
  toggleShow(){
    this.setState({show: !this.state.show});
  }
  render(){
    return(
      <div id="sidebar">

        <div className={["sidebar-body", (this.state.show?'open':'closed')].join(" ")}>
          <h1>Search</h1>
          <label>Enter Postcode</label>
          <input type="text" placeholder="Enter Postcode"/>
          <hr/>
          <label>Use current location</label>
          <input type="checkbox"/>
          <hr/>
          <div>
            <Link to={'/map/property-modal'}>Property Search Edit</Link>
          </div>
          <div>
            List of things that we are looking for
          </div>
          <hr/>
          <div>
            <Link to={'/map/user-modal'}>User information</Link>
          </div>
          <hr/>
          <Link to={"/map"}>Search</Link>
          <div className="toggle-button" onClick={this.toggleShow.bind(this)}>{this.state.show? 'Close': 'Open'}</div>
        </div>
      </div>
      )
  }
}
