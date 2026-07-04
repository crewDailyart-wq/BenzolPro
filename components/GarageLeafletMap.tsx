"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GARAGES } from "@/lib/garages";

// [lon, lat] per city used in lib/garages.ts (add a city to place it precisely)
const CITY: Record<string, [number, number]> = {
  Amersfoort: [5.387, 52.156], Amsterdam: [4.895, 52.37], Rotterdam: [4.478, 51.924],
  Leeuwarden: [5.798, 53.201], Utrecht: [5.121, 52.09], "Den Haag": [4.3, 52.078],
  Zwolle: [6.09, 52.512], Eindhoven: [5.47, 51.441], Arnhem: [5.899, 51.985],
  Groningen: [6.567, 53.219], Breda: [4.776, 51.585], Alkmaar: [4.749, 52.632],
  Maastricht: [5.688, 50.851], Haarlem: [4.646, 52.383], Tilburg: [5.091, 51.56],
  Nijmegen: [5.852, 51.842], Almere: [5.214, 52.35], "De Meern": [5.03, 52.083],
  Venlo: [6.168, 51.37], Deventer: [6.163, 52.251], Dordrecht: [4.69, 51.813],
  Antwerpen: [4.402, 51.219], Gent: [3.725, 51.054], Brugge: [3.224, 51.209],
  Brussel: [4.352, 50.847], Leuven: [4.7, 50.879], Hasselt: [5.338, 50.93],
  Luik: [5.573, 50.633], Mechelen: [4.48, 51.028], Kortrijk: [3.265, 50.828],
  Oostende: [2.918, 51.233],
};
const CENTROID: Record<"NL" | "BE", [number, number]> = { NL: [5.2, 52.2], BE: [4.4, 50.95] };

export default function GarageLeafletMap() {
  const points = GARAGES.map((g, i) => {
    const [lon, lat] = CITY[g.city] ?? CENTROID[g.country];
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
