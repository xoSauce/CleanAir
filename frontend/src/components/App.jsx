import React, { Component } from 'react';
const ls = window.localStorage

function ajax(url, cb){
  url = "http://ca.jedge.co.uk" + url;
  var r = new XMLHttpRequest();
  r.open("GET", url, true);
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    console.log("Success hitting: " + url);
    cb(JSON.parse(r.responseText));
  };
  r.send();
}

var AjaxQueries = React.createClass({
  render: function(){
    if(this.props.pollution.length==0){
      ajax("/req/db/pollution_data", this.props.storePollution);
    }
    if(this.props.londonProperties.length == 0){
      ajax("/req/api/property_listings", this.props.storeLondonProperties);
    }
    return(
      <span/>
      )
  }
});
var App = React.createClass({
  getInitialState: function(){
    //initialise with empty object
    var obj = {
      pollution: [],
      geolocation: {
        postcode: null,
        lat: null,
        lon: null
      },
      londonProperties:[]
    }

    //parse from localstorage if not undefined
    if (ls.pollution != undefined){
      obj.pollution = JSON.parse(ls.pollution)
    }
    if(ls.geolocation!= undefined){
      obj.geolocation = JSON.parse(ls.geolocation);
    }
    if(ls.londonProperties!=undefined){
      obj.londonProperties = JSON.parse(ls.londonProperties)
    }
    return obj;
  },
  storePollution: function(data){
    var data = data.slice(1,300);
    this.setState({pollution: data, displayPollution: data});
    ls.pollution = JSON.stringify(data);
  },
  storeLocation: function(data){
    //Data has the form
    // {postcode,lat,lon}
    this.setState({geolocation: data});
    ls.geolocation = JSON.stringify(data);
    ajax('/req/api/property_listings/' + data.lat +'/' + data.lon, this.storeLocationProperties);
  },
  storeLocationProperties: function(data){
    console.log(data);
    this.setState({locationProperties: data});
    // ls.locationProperties = JSON.stringify(data);
  },
  storeLondonProperties: function(data){
    this.setState({londonProperties: data});
    ls.londonProperties = JSON.stringify(data);
  },
  updateFilters: function(options){
    console.log(options);
  },
  render: function() {
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
        <AjaxQueries 
          londonProperties={this.state.londonProperties}
          storeLondonProperties={this.storeLondonProperties}
          pollution={this.state.pollution}
          storePollution={this.storePollution}/>
        {children}
      </div>
    );
  }
});

module.exports = App
