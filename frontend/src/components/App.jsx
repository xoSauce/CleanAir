import React, { Component } from 'react';
const ls = window.localStorage;
var GoogleAnalytics = require('react-g-analytics');
var cacheNumber = 1;

function ajax(url, cb){
  url = "http://cleanair.me.uk" + url;
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
      ajax("/req/db/traffic_data", this.props.storePollution);
    }
    if(this.props.londonProperties.length < 100){
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
      londonProperties:[],
      filteredProperties: [],
      filters: {
        toBuy: true,
        toRent: true,
        houses: true,
        flats: true,
        minprice: null,
        maxprice: null,
        minbeds: null
      }
    }

    //parse from localstorage if not undefined
    if (ls.pollution != undefined){
      obj.pollution = JSON.parse(ls.pollution)
    }
    if(ls.geolocation!= undefined){
      obj.geolocation = JSON.parse(ls.geolocation);
    }
    if(ls.londonProperties!=undefined){
      var ls_value = JSON.parse(ls.londonProperties);
      if(ls_value[0] == 1){
          obj.londonProperties = JSON.parse(ls.londonProperties)
      }
    }
    for(var key in obj.filters){
      var ls_key = 'settings_' + key;
      if(ls[ls_key]!= undefined){
        var ls_value = JSON.parse(ls[ls_key]);
        if(ls_value == obj.filters[key]){
          ls.removeItem(ls_key);
        }
        else{
          obj.filters[key] = ls_value;
        }
      }
    }
    if(obj.londonProperties.length>0){
      var filters = obj.filters;
      var flat_types = ['Flat', 'Block of flats', 'Studio']
      var filteredProperties = obj.londonProperties.filter(function(obj){
        if(filters.toBuy && !filters.toRent && obj.status!="for_sale"){
          return false;
        }
        if(filters.toRent && !filters.toBuy && obj.status!="to_rent"){
          return false;
        }
        if(!filters.toRent && !filters.toBuy){
          return false;
        }
        if(filters.houses && !filters.flats && flat_types.includes(obj.property_type)){
          return false;
        }
        if(filters.flats && !filters.houses && !flat_types.includes(obj.property_type)){
          return false;
        }
        if(!filters.flats && !filters.houses){
          return false;
        }
        if(filters.minprice != undefined && (filters.minprice*1000 > parseInt(obj.price))){
          return false;
        }
        if(filters.maxprice != undefined && ((filters.minprice*1000) < parseInt(obj.price))){
          return false;
        }
        if(filters.minbeds != undefined && (filters.minbeds > parseInt(obj.num_bedrooms))){
          return false;
        }
        return true;
      });
      obj.filteredProperties = filteredProperties;
    }
    return obj;
  },
  storePollution: function(data){
    var data = data.slice(0,3000);
    this.setState({pollution: data, displayPollution: data});
    ls.pollution = JSON.stringify(data);
  },
  storeLocation: function(data){
    //Data has the form
    // {postcode,lat,lon}
    this.setState({geolocation: data});
    ls.geolocation = JSON.stringify(data);
  },
  storeLondonProperties: function(data){
    this.setState({londonProperties: data, filteredProperties: data});
    var obj = [cacheNumber, data];
    ls.londonProperties = JSON.stringify(obj);
  },
  updateFilters: function(options){
    var filters = this.state.filters;
    for(var key in this.state.filters){
      for(var option_key in options){
        if(key == option_key){
          filters[option_key] = options[option_key]
          ls['settings_' + option_key] = JSON.stringify(options[option_key])
        }
      }
    }
    this.setState({filters: filters});
    this.filterProperties();
  },
  filterProperties: function(){
    var filters = this.state.filters;
    var flat_types = ['Flat', 'Block of flats', 'Studio']
    var filteredProperties = this.state.londonProperties.filter(function(obj){
      if(filters.toBuy && !filters.toRent && obj.status!="for_sale"){
        return false;
      }
      if(filters.toRent && !filters.toBuy && obj.status!="to_rent"){
        return false;
      }
      if(!filters.toRent && !filters.toBuy){
        return false;
      }
      if(filters.houses && !filters.flats && flat_types.includes(obj.property_type)){
        return false;
      }
      if(filters.flats && !filters.houses && !flat_types.includes(obj.property_type)){
        return false;
      }
      if(!filters.flats && !filters.houses){
        return false;
      }
      if(filters.minprice != undefined && (filters.minprice*1000 > parseInt(obj.price))){
        return false;
      }
      if(filters.maxprice != undefined && ((filters.minprice*1000) < parseInt(obj.price))){
        return false;
      }
      if(filters.minbeds != undefined && (filters.minbeds > parseInt(obj.num_bedrooms))){
        return false;
      }
      return true;
    });
    console.log(this.state.londonProperties.length, filteredProperties.length);
    this.setState({filteredProperties: filteredProperties});
  },
  render: function() {
    var _this = this;
    var children = React.Children.map(this.props.children, function(child) {
        return React.cloneElement(child, {
          pollution: _this.state.pollution,
          geolocation: _this.state.geolocation,
          londonProperties: _this.state.filteredProperties,
          storeLocation: _this.storeLocation,
          updateFilters: _this.updateFilters,
          filters: _this.state.filters});
    });
    return (
      <div>
        <AjaxQueries
          londonProperties={this.state.londonProperties}
          storeLondonProperties={this.storeLondonProperties}
          pollution={this.state.pollution}
          storePollution={this.storePollution}
          filter={this.filterProperties}/>
        <GoogleAnalytics id="UA-70987418-1"/>
        {children}
      </div>
    );
  }
});

module.exports = App
