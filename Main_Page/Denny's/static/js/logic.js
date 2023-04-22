  //create layer call for streets
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//create layer call for streets in the dark
// let darkview = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18
//     });

// make that your base layer that holds both maps.
let baseMaps = {
    "Streets": streets 
    //"NightTime": darkview
  };

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes
};

//Create map variable 
var myMap = L.map("map", {
    center: [37.895256, -100.289855],
    zoom:2,
    layers: [streets]
  });

//Create toggler for the map
L.control.layers(baseMaps, overlays).addTo(myMap);

//create variable for url link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//getting the json data
d3.json(link).then(function(data){
    //console.log(data);

    //create geoJson layer
    L.geoJSON(data,{
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng).bindPopup(`<h1>Earthquake Magnitude: ${feature.properties.mag}<h1>`);
        },
        style: styleInfo,
    }).addTo(earthquakes);
})

earthquakes.addTo(myMap);

function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

  function getColor(depth) {
    if (depth > 100) {
      return "#800000";
    }
    if (depth > 50) {
      return "#DC143C";
    }
    if (depth > 25) {
      return "#FFA500";
    }
    if (depth > 12.5) {
      return "#FFFF00";
    }
    if (depth > 1) {
      return "#008000";
    }
    return "#ADFF2F";
  }

  var legend = L.control({
    position: 'bottomright'
  });
  
  legend.onAdd = function () {
    //adding details for the legend
    let div = L.DomUtil.create("div", "info legend");
      const magnitudes = [0, 1, 12.5, 25, 50, 100];
      const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
      ];
  
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
   }
    return div;
  };
  
  legend.addTo(myMap);



