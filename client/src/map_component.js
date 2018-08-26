import React from 'react';

class MapComponent extends React.Component {
  constructor(props){
    super(props);
      
    this.getPopupContent  = this.getPopupContent.bind(this);
    this.addMarker  = this.addMarker.bind(this);
    this.hockClickEvent = this.hockClickEvent.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.appendZoomButton = this.appendZoomButton.bind(this);
      
    this.state = {
      fields : ['name' , 'man_made' , 'surveillance' , 'wheelchair' , 'amenity']
    };
  }
  componentDidMount() {

      
    this.map = new L.Map('mapid');
    const osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
    const osm = new L.TileLayer(osmUrl, {
      minZoom: 8,
      maxZoom: 12,
      attribution,
    });
    this.map.setView(new L.LatLng(52.51, 13.40), 9);
    this.map.addLayer(osm);
      
    // hock click event to map 
    this.hockClickEvent();
      
  }
    hockClickEvent(){
        const _self = this;
        const unit = 'meters';
        this.map && this.map.on('click', function(e) { 
            var mapCoords = e.latlng;
            fetch('http://localhost:3000?lat='+ mapCoords.lat +'&lng='+ mapCoords.lng + '&unit=' + unit)
              .then(response => response.json())
              .then((json) => {
                const { feature  , distance } = json;
                const { properties, geometry } = feature;
                _self.addMarker(properties , distance , geometry.coordinates);
            });
        });
    }
    addMarker(properties , distance , coordinates){
         
        if(this.map){
            // remove previous marker 
            this.marker && this.map.removeLayer(this.marker);
            
            // create new marker 
            this.marker = L.marker([coordinates[1] , coordinates[0]]).addTo(this.map)

            const content = this.getPopupContent(properties);
            content && this.marker.bindPopup(this.getPopupContent(properties , distance , coordinates))
            .openPopup();
            this.appendZoomButton(coordinates);
        }
    }
    getPopupContent(properties , distance , coordinates){
        const {fields} = this.state;
        let html = "";
        if(fields){  
            // append distance row
            distance && (html += "<div class='field-item'> <label> distance : </label> <span>"+ parseInt(distance) +" meters<span> </div>");
            
            // map fields & extract values from properties
            fields.map(function(field){
                html += properties[field] ? "<div class='field-item'> <label> "+field+": </label> <span>"+properties[field]+"<span> </div>" : ""; 
            });
            
            html += "<div class='btns-holder' id='btns-holder'></div>";
        }
        return html;
    }
    appendZoomButton(coordinates){
        let holder = document.getElementById("btns-holder");
        
        if(holder){
            let btn = document.createElement("span" , {
            });
            
            btn.className  = "btn";
            
            btn.onclick  = () => this.zoomToFeature(coordinates);
            var content = document.createTextNode("Zoom"); 
            // add the text node to the newly created btn
            btn.appendChild(content);  

            // append to holder
            holder.appendChild(btn);
        }
    }
    zoomToFeature(coordinates){
        this.map.flyTo([coordinates[1],  coordinates[0]], 10);
    }
    
    
  render() {
    return (
        <div id="mapid"></div>);
  }
};

export default MapComponent;
