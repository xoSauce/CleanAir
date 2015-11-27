import React, { Component } from 'react';
import LocalStorageMixin from 'react-localstorage';
var Ajax = require('react-ajax');

var App = React.createClass({
  mixins: [LocalStorageMixin],
  getInitialState: function(){
    return {
      pollution: []
    }
  },
  storePollution: function(err, data){
    var someData = JSON.parse(data.text).slice(1,200);
    this.setState({pollution: someData});
  },
  render: function() {
    let {children} = this.props;
    var ajax =  '';
    if(this.state.pollution.length==0){
      ajax = <Ajax url="/req/db/pollution_data" onResponse={this.storePollution}/>;
    }
    return (
      <div>
        {ajax}
        {children}
      </div>
    );
  }
});

module.exports = App
