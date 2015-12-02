'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
//import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
//import {GoogleMap, Marker} from "react-google-maps";

var coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

export default class GMaps extends React.Component {
  constructor(props){
    super(props);
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }


//dummy heatmap data
  getPoints() {
  	var weightedLoc = {
        location: new google.maps.LatLng(51.5258541, -0.08040660000006028),
        weight: 12131312425
      };

	  return weightedLoc;
  }

componentDidMount(){

  console.log(this.props);

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

 

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: this.props.geolocation.lat, lng: this.props.geolocation.lon},
    disableDefaultUI: true,
    zoomControl: true
  });

  // window.setTimeout(function(){
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    map: map
  });
  heatmap.setMap(map);

	 // },2000 );
	
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
	heatmap.set('radius', 20);

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
      // <GoogleMap containerProps={{
      //     style: {
      //       height: "100%",
      //     },
      //   }}
      //   defaultZoom={15}
      //   defaultCenter={{lat: 37.775, lng: -122.434}}
      //   onClick={this.onCloseClick}
      // >
      // </GoogleMap>
