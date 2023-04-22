let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

let c_stations = [];

var queryUrl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=vy7ZNs59wKUuCiGr9hdaHccauCsArDK93jzjN7Jl&fuel_type=E85,ELEC&state=all&limit=200"

d3.json(queryUrl).then(function(data){
  L.geoJSON(data,{
    pointToLayer:function (feature, latlng){
      return L.marker(latlng, {icon: charge_Icon}).addTo(myMap);
    }
  })
})


// make that your base layer that holds map
// let baseMaps = {
//     Streets: streets, 
//     Topographic: topo
//   };

// // let denny_layer = new L.layerGroup();

// let overlays = {
//     Dennys: denny_loc,
//     Stations: c_stations
//   };

var myMap = L.map("map", {
    center: [37.895256, -100.289855],
    zoom:5,
    layers: [streets]
  });

  //Create toggler for the map
// L.control.layers(baseMaps, overlays).addTo(myMap);

// var denny_loc = [];

//ORIGINAL MARKERS
// for (i=0;i<jsonstr.length;i++){
  
//     var loc_lat = jsonstr[i].latitude;
//     //console.log(loc_lat);
//     var loc_lng = jsonstr[i].longitude;
//     //console.log(loc_lng);
//     denny_loc.push(L.marker([loc_lat,loc_lng]).addTo(myMap));
//   }

//ICONS
var pancake_Icon = L.icon({
  iconUrl: 'static/js/pancakes.png',
  iconSize:     [38, 50], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var charge_Icon = L.icon({
  iconUrl: 'static/js/electric-station.png',
  iconSize:     [28, 38], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//CLUSTER
    var markers = new L.markerClusterGroup();
  
    // Loop through the data.
    for (var i = 0; i < jsonstr.length; i++) {
  
        var loc_lat = jsonstr[i].latitude;
      //console.log(loc_lat);
        var loc_lng = jsonstr[i].longitude;
        //console.log(loc_lng);
      // Check for the location property.
      
        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([loc_lat, loc_lng], {icon: pancake_Icon}));
      
  
    }
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);

//CHARGING STATIONS
