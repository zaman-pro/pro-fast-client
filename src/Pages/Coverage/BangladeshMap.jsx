import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

// ✅ Default position (center of Bangladesh - Dhaka)
const defaultPosition = [23.8103, 90.4125];

// ✅ Component to fly to selected district
const FlyToDistrict = ({ focus }) => {
  const map = useMap();

  useEffect(() => {
    if (focus) {
      // ✅ Smoothly move to selected district location
      map.flyTo([focus.latitude, focus.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [focus, map]);

  return null;
};

// ✅ Main Map Component
const BangladeshMap = ({ serviceCenters, focus }) => {
  const markerRefs = useRef({}); // ✅ Store marker references by district name

  useEffect(() => {
    if (focus && markerRefs.current[focus.district]) {
      markerRefs.current[focus.district].openPopup(); // ✅ Auto-open popup of focused district
    }
  }, [focus]);

  return (
    <div className="w-full h-[700px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultPosition}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* ✅ Base Map Layer from OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* ✅ Zoom and fly to searched district */}
        <FlyToDistrict focus={focus} />

        {/* ✅ Render all service center markers */}
        {serviceCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            icon={L.icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
            ref={(ref) => (markerRefs.current[center.district] = ref)}
          >
            {/* ✅ Marker popup content */}
            <Popup>
              <strong>{center.district}</strong>
              <br />
              {center.covered_area?.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
