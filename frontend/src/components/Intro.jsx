'use strict';

var React = require('react');
var Link = require('react-router').Link;

export default class Intro extends React.Component {
  constructor(props){
    super(props);
    if(this.props.pollution.length > 0){
      this.props.history.replaceState(null, '/select-location');
    }
  }
  componentDidUpdate(){
    if(this.props.pollution.length > 0){
      this.props.history.replaceState(null, '/select-location');
    }
  }
  render(){
    return(
      <div id="intro">
        <div id="product-logo"></div>
        <p>Live A Cleaner Life</p>
        <Link className="btn btn-default featured-btn" role="button" to={'/select-location'}>Let's Go</Link>
      </div>
    )
  }
}
