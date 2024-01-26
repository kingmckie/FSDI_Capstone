import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../firebase";
import "./GeoSpatial.css";

function GeoSpatial() {
  const [eventLocations, setEventLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    name: "",
    lat: 0,
    lon: 0,
    media: { type: "", url: "" },
  });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAW79MlJBjQmuhu-XUFlZkl3sEYTM2u26Q", // Replace with your API key
  });

  // Define the fetchData function
  const fetchData = async () => {
    try {
      const locationsCollection = collection(db, "eventLocations");
      const locationsSnapshot = await getDocs(locationsCollection);
      const locationsData = locationsSnapshot.docs.map((doc) => doc.data());
      setEventLocations(locationsData);
    } catch (error) {
      console.error("Error loading event locations:", error);
    }
  };

  useEffect(() => {
    // Call fetchData function here
    fetchData();
  }, []); // Empty dependency array to run once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleAddLocation = async () => {
    try {
      const locationsCollection = collection(db, "eventLocations");
      const newLocationRef = await addDoc(locationsCollection, newLocation);
      
      // Update the location with the generated ID
      const updatedLocations = [
        ...eventLocations,
        { ...newLocation, id: newLocationRef.id }
      ];
      setEventLocations(updatedLocations);
      
      // Select the newly added location
      setSelectedLocation(updatedLocations[updatedLocations.length - 1]);
      setInfoWindowVisible(true);
    } catch (error) {
      console.error("Error adding new location:", error);
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setInfoWindowVisible(true);
  };

  const handleInfoWindowToggle = () => {
    setInfoWindowVisible((prevValue) => !prevValue);
  };

  return (
    <div className="geospatial">
      <h1>Google Maps</h1>
      <div>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleInputChange} />
        <label>Latitude:</label>
        <input type="number" name="lat" onChange={handleInputChange} />
        <label>Longitude:</label>
        <input type="number" name="lon" onChange={handleInputChange} />
        <label>Media Type (image/video):</label>
        <select name="mediaType" onChange={handleInputChange}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <label>Media URL:</label>
        <input type="text" name="mediaUrl" onChange={handleInputChange} />
        <button onClick={handleAddLocation}>Add Location</button>
      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "85%", height: "750px" }}
          center={
            eventLocations.length > 0
              ? {
                  lat: parseFloat(eventLocations[0].lat),
                  lng: parseFloat(eventLocations[0].lon),
                }
              : { lat: 0, lng: 0 }
          }
          zoom={eventLocations.length > 0 ? 4 : 1}
        >
          {eventLocations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon),
              }}
              title={location.name}
              onClick={() => handleMarkerClick(location)}
            >
              {selectedLocation === location && (
                <InfoWindow
                  position={{
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lon),
                  }}
                  onCloseClick={handleInfoWindowToggle}
                >
                  <div>
                    <h2>{location.name}</h2>
                    {location?.media?.type === "image" && (
                      <img src={location.media.url} alt={location.name} />
                    )}
                    {location?.media?.type === "video" && (
                      <video controls width="300" height="200">
                        <source src={location.media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      ) : (
        <p>Loading Google Maps...</p>
      )}
    </div>
  );
}

export default GeoSpatial;

