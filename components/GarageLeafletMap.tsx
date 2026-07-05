"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GARAGES, CITY_COORDS, COUNTRY_CENTROID } from "@/lib/garages";

export default function GarageLeafletMap() {
  const points = GARAGES.map((g, i) => {
    const [lon, lat] = CITY_COORDS[g.city] ?? COUNTRY_CENTROID[g.country];
    // tiny deterministic offset so garages in the same city don't fully overlap
    const j = ((i % 5) - 2) * 0.02;
    return { ...g, lat: lat + ((i % 3) - 1) * 0.02, lon: lon + j };
  });

  return (
    <MapContainer
      center={[51.7, 4.9]}
      zoom={7}
      scrollWheelZoom={false}
      style={{ height: "440px", width: "100%", background: "#0a0a0b" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {points.map((p, i) => (
        <CircleMarker
          key={`${p.name}-${i}`}
          center={[p.lat, p.lon]}
          radius={7}
          pathOptions={{
            color: "#0a0a0b",
            weight: 1.5,
            fillColor: p.country === "NL" ? "#4da6ff" : "#e7b53c",
            fillOpacity: 0.9,
          }}
        >
          <Tooltip direction="top" offset={[0, -6]}>
            <strong>{p.name}</strong> — {p.city}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
