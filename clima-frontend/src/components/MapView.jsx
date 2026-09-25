import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// 🔥 fix iconos (leaflet bug)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function MapView({ stations, onSelect }) {

    return (
        <div style={{ height: "300px", borderRadius: "20px", overflow: "hidden" }}>

            <MapContainer 
                center={[4.7, -74.0]} 
                zoom={6} 
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {stations.map(st => (
                    <Marker 
                        key={st.id} 
                        position={[st.lat, st.lng]}
                        eventHandlers={{
                            click: () => onSelect(st)
                        }}
                    >
                        <Popup>
                            {st.nombre}
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

        </div>
    );
}

export default MapView;