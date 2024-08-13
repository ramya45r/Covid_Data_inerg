import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LatLngExpression } from "leaflet";

const MapView: React.FC = () => {
  const { selectedState, stateData } = useSelector(
    (state: RootState) => state.covid
  );

  if (!selectedState) {
    return null;
  }
  const { confirmed, recovered, deceased } = stateData[selectedState].total;

  const position: LatLngExpression = [20.5937, 78.9629];
  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>
          <h3>State:{selectedState}</h3>
          <p>
            <strong>Confirmed Cases:</strong> {confirmed}
          </p>
          <p>
            <strong>Active Cases:</strong> {confirmed - recovered - deceased}
          </p>
          <p>
            <strong>Recovered Cases:</strong> {recovered}
          </p>
          <p>
            <strong>Deaths:</strong> {deceased}
          </p>{" "}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
