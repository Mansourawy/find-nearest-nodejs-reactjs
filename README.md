# Overview
The app is about building a web application for users who want to find a gas
station in Berlin. The final goal is that a user can click on a map and the
application shows the attributes of the nearest gas station and the location of the
gas station on a map. The web-application has two parts.
 - The client (in the `client` directory). This is a react application showing the map.
 - The server (in the `server` directory). This is a nodejs server which is used to find the
   nearest gas station using turf library check <http://turfjs.org>. 

# Getting started
Before you start you should have a recent version of `npm` and `node`
installed.
To start the server go into the `server` directory and run
```
  npm install
  node index.js
```
To see whether the server works check <http://localhost:3000> and see if you get a JSON object
with information about a gas station.

To build the client go into the directory `client` and run
```
npm install
npm run start
```
Then open the file `client/dist/index.hmtl` in the browser. Make sure that the
server is still running! You should see a full screen map.

# Finding Nearest Gas station 
The map uses the leaflet library. 
When the user clicks on the map capture this event and convert the click into
geocoordinates (lat and lon). When the user clicks, make a request to the
server to get the nearest fuel station.

# Calculating the Distance in meters 
Calculating the distance between the coordinate and the gas station.  


