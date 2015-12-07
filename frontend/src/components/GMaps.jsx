'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const defaultcoords = {
  lat: 51.4964238,
  lon: -0.14392069999996693
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

    //init and center google map

    var coords = (this.props.geolocation.lat != undefined && this.props.geolocation.lon != undefined)? {lat: this.props.geolocation.lat,lon: this.props.geolocation.lon} : defaultcoords;
    var _this = this;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: coords.lat, lng: coords.lon},
      disableDefaultUI: true,
      zoomControl: true
    });

    //init Heatmap layer

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: _this.state.heatmapData,
      map: map
    });
    heatmap.setMap(map);

    //set zoopla property markers

    var markers = [];
    var infoWindows = [];
    var infoWindowContent = []
    console.log(this.props.londonProperties);
    for (var i = this.props.londonProperties.length - 1; i >= 0; i--) {
      var lat = this.props.londonProperties[i].latitude;
      var lng = this.props.londonProperties[i].longitude;
      var title =this.props.londonProperties[i].displayable_address;

      var contentString = '<div class="infoBoxContent">'+
        '<img src="'+this.props.londonProperties[i].agent_logo+'" alt="Agent Logo" width="42" height="42">'+
        '<h2 class="firstHeading">'+ this.props.londonProperties[i].displayable_address + '</h2>'+
        '<img src="'+this.props.londonProperties[i].thumbnail_url+'" alt="property Logo" width="42" height="42">'+
        '<div id="bodyContent">'+
        '<p>'+ this.props.londonProperties[i].description+
        '</p>'+
        '<p><a target="_blank" href="'+ this.props.londonProperties[i].details_url+'">'+
        'more details</a> '+
        '</p>'+
        '</div>'+
        '</div>';

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          title: title,
          icon: 'http://cleanair.me.uk/assets/images/marker.png'
        });

      markers.push(marker);
      infoWindowContent.push(contentString)
     }
    //set info windows

    var prev_infowindow = false;

    for (var i = 0; i < markers.length; i++) {

        var infowindow = new google.maps.InfoWindow({
          content: infoWindowContent[i]
        });

        infoWindows.push(infowindow);

        google.maps.event.addListener(markers[i], 'click', function(i) {
          return function() {
            if( prev_infowindow ) {
               prev_infowindow.close();
            }

            prev_infowindow = infoWindows[i];
            infoWindows[i].open(map, markers[i]);
          }
        }(i));
    }



    //map config options

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

    _this.setState({map: map, heatmap: heatmap, markers: markers});
  }

  componentDidMount(){
    this.initMap();
  }
  componentWillReceiveProps(){
    //Cleanup map
    var markers = this.state.markers;
    for(var i =0; i < markers.length; i++){
      markers[i].setMap(null);
    }
    this.setState({markers: []});

    //add new markers
    var _this = this;
    var markers = [];
    var infoWindows = [];
    var infoWindowContent = []

    for (var i = this.props.londonProperties.length - 1; i >= 0; i--) {
      var lat = this.props.londonProperties[i].latitude;
      var lng = this.props.londonProperties[i].longitude;
      var title =this.props.londonProperties[i].displayable_address;
      var contentString = '<div class="infoBoxContent">'+
        '<img src="'+this.props.londonProperties[i].agent_logo+'" alt="Agent Logo" width="42" height="42">'+
        '<h2 class="firstHeading">'+ this.props.londonProperties[i].displayable_address + '</h2>'+
        '<img src="'+this.props.londonProperties[i].thumbnail_url+'" alt="property Logo" width="42" height="42">'+
        '<div id="bodyContent">'+
        '<p>'+ this.props.londonProperties[i].description+
        '</p>'+
        '<p><a target="_blank" href="'+ this.props.londonProperties[i].details_url+'">'+
        'more details</a> '+
        '</p>'+
        '</div>'+
        '</div>';

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: _this.state.map,
          title: title,
          icon: 'http://cleanair.me.uk/assets/images/marker.png'
        });

      markers.push(marker);
      infoWindowContent.push(contentString)
     }
     var prev_infowindow = false;
     for (var i = 0; i < markers.length; i++) {

         var infowindow = new google.maps.InfoWindow({
           content: infoWindowContent[i]
         });

         infoWindows.push(infowindow);

         google.maps.event.addListener(markers[i], 'click', function(i) {
           return function() {
             if( prev_infowindow ) {
                prev_infowindow.close();
             }

             prev_infowindow = infoWindows[i];
             infoWindows[i].open(_this.state.map, markers[i]);
           }
         }(i));
     }
     this.setState({markers: markers});
  }
  componentDidUpdate(){
    var coords = (this.props.geolocation.lat != undefined && this.props.geolocation.lon != undefined)? {lat: this.props.geolocation.lat,lon: this.props.geolocation.lon} : defaultcoords;
    this.state.map.panTo({lat: coords.lat, lng: coords.lon});
  }

  render() {
    return (
      <section style={{height: "calc(100% - 50px)"}}>
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
