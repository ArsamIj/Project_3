// Creating the map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
//   var link = "https://andrewcarlson.dev/wp-content/uploads/jsonstates.min_.js";
  var link = "https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json"

// The function that will determine the color of a neighborhood based on the borough that it belongs to
// function chooseColor(state) {
//     if (state == "Brooklyn") return "yellow";
//     else if (state == "Bronx") return "red";
//     else if (state == "Manhattan") return "orange";
//     else if (state == "Queens") return "green";
//     else if (state == "Staten Island") return "purple";
//     else return "black";
//   };

function checkState(state){
    if (states.includes(state)){
        return "red";
    } else {
        return "blue";
    }
}

// Getting our GeoJSON data
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a neighborhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
          fillColor: checkState(feature.properties.NAME),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
  
      }
    }).addTo(myMap);
  });

  var queryUrl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.geojson?api_key=vy7ZNs59wKUuCiGr9hdaHccauCsArDK93jzjN7Jl&fuel_type=E85,ELEC&state=all&limit=200"

  d3.json(queryUrl).then(function(data){
    L.geoJSON(data,{
      pointToLayer:function (feature, latlng){
        return L.marker(latlng, {icon: charge_Icon}).addTo(myMap);
      }
    })
  })

  var charge_Icon = L.icon({
    iconUrl: 'electric-station.png',
    iconSize:     [28, 38], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });