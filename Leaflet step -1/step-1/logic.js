// Create a map object
var myMap = L.map("map", {
  center: [37.09, -5.71],
  zoom: 2
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(data => {

  data.features.forEach(obj => {
    var lat = obj.geometry.coordinates[1];
    var lng = obj.geometry.coordinates[0];
    var depth = obj.geometry.coordinates[2];
    var mag = obj.properties.mag;
    var place = obj.properties.place;

    L.circle([lat, lng], {
      color: getColor(depth),
      fillColor: getColor(depth),
      fillOpacity: 1,
      radius: mag * 25000
    }).bindPopup(`${place}<br>Magnetude: ${mag}`).addTo(myMap);
  });


  function getColor(depth) {
    switch (true) {
      case depth > 90:
        return 'red';
      case depth > 40:
        return 'yellow';
      case depth <= 40:
        return 'green';
    }
  }
})

var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend');
     labels = ['<strong>Population</strong>'];
     
     div.innerHTML += '<i style="background:red">90+</i><br>';
     div.innerHTML += '<i style="background:yellow">>40</i><br>';
     div.innerHTML += '<i style="background:green"><40</i>';

    return div;
 };
  legend.addTo(myMap);