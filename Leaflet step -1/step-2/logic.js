// Store our API endpoint inside queryUrl
// Where are we getting the data?
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
// Fetch the data from the API endpoint
d3.json(queryUrl).then(data => {
  // Once we get a response, send the data.features object to the createFeatures function

  // Zero in on the features property of your 
  earthquakeData = data['features'];

  // Use L.geoJSON to create a geoJSON layer
  //var earthquakeLayer = L.geoJSON(earthquakeData, {
  //onEachFeature: function (feature, layer) {
  //layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>${new Date(feature.properties.mag)}`);
  //  }
  //});

  // Define streetmap and darkmap layers need
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  //cities.forEach(data => {

  marker = L.circle(earthquakeData['location'], {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    radius: earthquakeData['magnitude'] / 50
  }).bindPopup("<h1>" + city['location'] + "</h1> <hr> <h3>Magnitude: " + city['magnitude'] + "</h3>").addTo(myMap);

  radius = marker.getRadius();
  markerRadius.push(radius);
})


var legend = L.control({ position: 'bottomright' });
// legend.onAdd = function (map) {

//   var div = L.DomUtil.create('div', 'info legend');
//   population = earthquakeData.map(c => cities['magnitude'])
//   labels = ['<strong>magnitude</strong>'];
//   //iterate through grades and create a scaled circle and label for each
//   for (var i = 0; i < magnitude.length; i++) {
//     from = magnitude[i];
//     to = magnitude[i + 1];
//     labels.push(
//       '<i class="circlepadding" style="width: ' + Math.max(0, (19 - 1.8 * markerRadius[i])) + 'px;"></i> <i style="background: #8080A0; width: ' + markerRadius[i] * 2 + 'px; height: ' + markerRadius[i] * 2 + 'px; border-radius: 50%; margin-top: ' + Math.max(0, (9 - markerRadius[i])) + 'px;"></i> ' + markerRadius[i]);
//   }
//   div.innerHTML = labels.join('<br>');
//   return div;
// };

// legend.addTo(myMap);


// Define a baseMaps object to hold our base layers
//var baseMaps = {
//"Street Map": streetmap,

//};

// Create overlay object to hold our overlay layer
//var overlayMaps = {
//Earthquakes: earthquakeLayer
//};

// Create our map, giving it the streetmap and earthquakes layers to display on load need
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmap, earthquakeLayer]
});

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    //L.control.layers(baseMaps, overlayMaps, {
      //collapsed: false
    //}).addTo(myMap);
