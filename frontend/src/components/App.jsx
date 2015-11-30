import React, { Component } from 'react';
var Ajax = require('react-ajax');
const ls = window.localStorage

var App = React.createClass({
  getInitialState: function(){
    var obj = {
      pollution: [],
      geolocation: {
        postcode: null,
        lat: null,
        lon: null
      }
    }
    if (window.localStorage.pollution != undefined){
      obj.pollution = JSON.parse(ls.pollution)
    }
    if(window.localStorage.geolocation!= undefined){
      obj.geolocation = JSON.parse(ls.geolocation);
    }
    
    return obj;
  },
  storePollution: function(err, data){
    var someData = JSON.parse(data.text).slice(1,200);
    this.setState({pollution: someData, displayPollution: someData});
    ls.pollution = JSON.stringify(someData);
  },
  storeLocation: function(data){
    //Data has the form
    // {postcode,lat,lon}
    this.setState({geolocation: data});
    ls.geolocation = JSON.stringify(data);
  },
  updateFilters: function(options){
    console.log(options);
  },
  render: function() {
    var ajax =  '';
    if(this.state.pollution.length==0){
      ajax = <Ajax url="/req/db/pollution_data" onResponse={this.storePollution}/>;
    }
    var _this = this;
    var children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, { 
          pollution: _this.state.pollution, 
          geolocation: _this.state.geolocation, 
          storeLocation: _this.storeLocation, 
          updateFilters: _this.updateFilters });
    });
    return (
      <div>
        {ajax}
        {children}
      </div>
    );
  }
});

module.exports = App
