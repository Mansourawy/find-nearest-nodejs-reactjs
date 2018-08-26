const express = require('express')
const app = express()
const turf = require('@turf/turf');

var url = require('url');


const fuelStations = require('./fuelstations.json');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  // TODO implement first server.
    console.log('calculating nearest');
    let parts = url.parse(req.url, true);
    let {query : {lat , lng , unit}} = parts;
     
    // getting the nearest station from the data 
    
    var clientPosition = turf.point([lng , lat]);
    var stations = turf.featureCollection(fuelStations.features);
    let nearest  = turf.nearest(clientPosition, stations);
    

    // calculate distance 
    var options = {units: unit};
    var distance = turf.distance(clientPosition, nearest, options);

    console.log('sending' , nearest);

    
    res.send({feature : nearest , distance : distance});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
