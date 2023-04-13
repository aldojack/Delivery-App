import React, { useState, useEffect } from 'react';
import PlaceholderImg from '../assets/placeholder-bg.jpg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OfflineMap = () => {
    const [map, setMap] = useState(null);
    const [offlineMap, setOfflineMap] = useState(false);
  
    useEffect(() => {
      // Check if the device is online
      const isOnline = window.navigator.onLine;
  
      if (isOnline) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
  
            // Create the map
            const newMap = L.map('map').setView([latitude, longitude], 13);
  
            // Add the tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(newMap);
  
            // Add the marker
            L.marker([latitude, longitude]).addTo(newMap);
  
            setMap(newMap);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        // Use the offline map
        setOfflineMap(true);
      }
    }, []);
  
    return (
      <div className="w-full mt-28">
        <div>
        <div id="map" style={{ width: '100%', height: '300px' }} />
          {map ? (
            <div id="map" style={{ width: '100%', height: '300px' }} />
          ) : offlineMap ? (
            <img src={PlaceholderImg} height="300" alt="Placeholder" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  };

export default OfflineMap;
