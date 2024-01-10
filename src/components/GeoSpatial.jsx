import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase'; // Update the path based on your project structure
import './geospatial.css';

function GeoSpatial() {
  const [eventLocations, setEventLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const locationsCollection = collection(db, 'eventLocations'); // Replace with your Firestore collection name
      const locationsSnapshot = await getDocs(locationsCollection);
      const locationsData = locationsSnapshot.docs.map((doc) => doc.data());
      setEventLocations(locationsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    eventLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lon]).addTo(map);
      marker.bindPopup(`<b>${location.name}</b>`); // You can customize the popup content
    });
  }, [eventLocations]);

  return (
    <div className="geospatial">
      <h1>GeoSpatial Page</h1>
      <div id="map" className="map-container"></div>
    </div>
  );
}

export default GeoSpatial;
