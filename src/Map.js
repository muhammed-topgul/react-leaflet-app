import React, {useEffect, useState} from 'react';
import {GeoJSON, MapContainer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from './countries.geo.json';
import MousePosition from "./MousePosition";
import AirplaneMarker from "./AirplaneMarker";


const initialAircrafts = [
    {id: 1, lat: 41.00, lng: 29.00},
    {id: 2, lat: 41.00, lng: 29.4},
    {id: 3, lat: 40.6, lng: 29.6},
    {id: 4, lat: 41.05, lng: 29.8},
    {id: 5, lat: 40.8, lng: 29.05},
];


// GeoJSON stili (renk değiştirme)
const geojsonStyle = {
    color: '#737272',         // Çizgi rengi
    weight: 2,              // Çizgi kalınlığı
    fillColor: '#262626', // Doldurma rengi
    fillOpacity: 0.8        // Doldurma saydamlığı
};

const countryStyle = (feature) => {
    // Türkiye'nin ID veya ismine göre kontrol yaparak sadece onu sarı yapalım
    if (feature.properties.name === "Turkey") {
        return {
            color: '#737272',         // Çizgi rengi
            weight: 2,              // Çizgi kalınlığı
            fillColor: '#590101', // Doldurma rengi
            fillOpacity: 0.8        // Doldurma saydamlığı
        };
    }
    return {
        color: '#737272',         // Çizgi rengi
        weight: 2,              // Çizgi kalınlığı
        fillColor: '#1a1818', // Doldurma rengi
        fillOpacity: 0.8        // Doldurma saydamlığı
    };
};

const Map = () => {
    const [aircrafts, setAircrafts] = useState(initialAircrafts); // Uçak verisini state olarak tutuyoruz

    useEffect(() => {
        const interval = setInterval(() => {
            setAircrafts((prevAircrafts) => {
                return prevAircrafts.map((aircraft) => ({
                    ...aircraft,
                    lat: aircraft.lat + 0.01,
                }));
            });
        }, 3000);


        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{position: 'relative', height: '100vh'}}>
            <MapContainer
                center={[41.05, 29.05]}
                zoom={8}
                maxZoom={12}
                style={{height: "1200px", width: "100%", backgroundColor: "#e0e0e0"}}>
                <GeoJSON data={geojsonData} style={countryStyle}/>
                <MousePosition/>
                {aircrafts.map((aircraft => (
                    <AirplaneMarker
                        key={aircraft.id}
                        id={aircraft.id}
                        position={[aircraft.lat, aircraft.lng]}
                    />
                )))}
            </MapContainer>
        </div>
    );
};

export default Map;