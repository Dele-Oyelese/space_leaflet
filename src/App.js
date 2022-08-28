import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import { useState, useEffect } from "react";


import './App.css';


export default function App() {

  const baseURL = "https://lldev.thespacedevs.com/2.2.0/launch/"

  const now = new Date();
  // Date in the next 2 months in the future
  const future = new Date();
  future.setMonth(now.getMonth()+1);
  const nowJSON = now.toJSON();
  const futureJSON =  now.toJSON();
  const apiRequest = baseURL+"?net__gte:"+{nowJSON}+"&net__lt:"+{futureJSON};

  const [launchData, setLaunchData] = useState(null)
 
  const [mapCenter, setMapCenter] = useState([57.430673, -152.353077])
  
  useEffect(() =>{
    fetch(apiRequest).then(res =>{
      return res.json()
    }).then(data => {
      console.log(data)
      setLaunchData(data)
      setMapCenter([launchData.results[1].pad.latitude,launchData.results[1].pad.longitude])
    })
  },[]);
  
  return(



<MapContainer center={mapCenter} zoom={8} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {launchData && launchData.results.map(site => (
        <Marker
          key={site.pad.id}
          position={[
            site.pad.latitude,
            site.pad.longitude
          ]}
          >
          
        <Popup
          position={[
            site.pad.latitude,
            site.pad.longitude
          ]}
        >
          <div>
            <h2>{site.pad.location.name}</h2>
            <p>{site.pad.name}</p>
          </div>
        </Popup>
    
      </Marker>
        ))
      }

</MapContainer>

);}
