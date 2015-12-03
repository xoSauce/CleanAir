'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
//import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
//import {GoogleMap, Marker} from "react-google-maps";

const defaultcoords = {
  lat: 51.5258541,
  lon: -0.15040660000006028
};

export default class GMaps extends React.Component {
  constructor(props){
    super(props);
    var heatmapData = [];

    for (var i = this.props.pollution.length - 1; i >= 0; i--) {
      var lat = this.props.pollution[i].Latitude;
      var lng = this.props.pollution[i].Longitude;
      var Idx = this.props.pollution[i].idx;

      heatmapData.push({
          location: new google.maps.LatLng(lat, lng),
          weight: Idx
       });
    };
    this.state = {heatmapData: heatmapData};
  }

  initMap(){
    var coords = (this.props.geolocation.lat != undefined && this.props.geolocation.lon != undefined)? {lat: this.props.geolocation.lat,lon: this.props.geolocation.lon} : defaultcoords;
    var _this = this;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: coords.lat, lng: coords.lon},
      disableDefaultUI: true,
      zoomControl: true
    });

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: _this.state.heatmapData,
      map: map
    });
    heatmap.setMap(map);

    for (var i = this.props.londonProperties.length - 1; i >= 0; i--) {
      var lat = this.props.londonProperties[i].latitude;
      var lng = this.props.londonProperties[i].longitude;
      var title =this.props.londonProperties[i].displayable_address;

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: title
      });
     }

    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];

  	heatmap.set('radius', 20);
  	//heatmap.set('gradient', gradient);
  	heatmap.set('opacity', 0.5);
  	//heatmap.set('dissipating', false);
  	heatmap.set('radius', 40);

    _this.setState({map: map, heatmap: heatmap});
  }

  componentDidMount(){
    this.initMap();
  }
  componentDidUpdate(){
    var coords = (this.props.geolocation.lat != undefined && this.props.geolocation.lon != undefined)? {lat: this.props.geolocation.lat,lon: this.props.geolocation.lon} : defaultcoords;
    this.state.map.panTo({lat: coords.lat, lng: coords.lon});
  }

  render() {
    return (
      <section style={{height: "100%"}}>
      <div id="map" containerProps={{
          style: {
            height: "100%",
            width: "100%",
          },
        }}>
      </div>
    </section>
    );
  }
}
