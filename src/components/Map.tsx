import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons in Vite
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const locations = [
  { name: 'Tokyo (Xuất phát/Kết thúc)', pos: [35.6895, 139.6917] as [number, number] },
  { name: 'Shizuoka (Nihondaira)', pos: [34.9756, 138.4601] as [number, number] },
  { name: 'Hamamatsu (Hồ Hamana)', pos: [34.7108, 137.7261] as [number, number] },
  { name: 'Nagoya', pos: [35.1815, 136.9066] as [number, number] },
  { name: 'Kyoto', pos: [35.0116, 135.7681] as [number, number] },
  { name: 'Kobe', pos: [34.6901, 135.1955] as [number, number] },
];

// Add the return trip to Tokyo for the polyline
const routePositions = [...locations.map(l => l.pos), locations[0].pos];

function MapBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(locations.map(l => l.pos));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map]);
  return null;
}

export default function RouteMap() {
  return (
    <div className="h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-sm border border-blue-100 relative z-0">
      <MapContainer 
        center={[35.1815, 136.9066]} 
        zoom={6} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds />
        
        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc.pos}>
            <Popup className="font-sans">
              <span className="font-semibold text-blue-700">{loc.name}</span>
            </Popup>
          </Marker>
        ))}
        
        <Polyline 
          positions={routePositions} 
          color="#0284c7" 
          weight={4} 
          opacity={0.7} 
          dashArray="10, 10"
        />
      </MapContainer>
    </div>
  );
}
