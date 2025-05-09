import React, {useEffect, useState} from 'react';
import {GeoJSON, MapContainer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from './countries.geo.json';
import MousePosition from "./MousePosition";
import AirplaneMarker from "./AirplaneMarker";

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-arrowheads';

const fillColor = "#363617";

const invertColor = (hex) => {

    // Hex rengini RGB'ye dönüştür
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Luminance hesapla
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Luminance değeri 128'in altındaysa, renk koyu, üstündeyse açık
    return luminance > 128 ? "#000000" : "#000000"; // Açıksa siyah, koyuysa beyaz
};

const ArrowLine = ({from, to}) => {
    const map = useMap();

    useEffect(() => {
        const line = L.polyline([from, to], {
            color: invertColor(fillColor),
            weight: 0.7,
        }).arrowheads({
            frequency: "2",
            size: "10px",
            yawn: 75,
        }).addTo(map);

        return () => {
            map.removeLayer(line);
        };
    }, [map, from, to]);


    return null;
};

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
            fillColor: fillColor, // Doldurma rengi
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
                    lng: aircraft.id === 2 ? aircraft.lng += 0.01 : aircraft.lng
                }));
            });
        }, 3000);


        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{position: 'relative', height: '100vh'}}>
            <MapContainer
                center={[41.05, 29.05]}
                zoom={7}
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
                <ArrowLine from={[40.1, 29.45]} to={[aircrafts[1].lat, aircrafts[1].lng]}/>
                <AirplaneMarker
                    key={6}
                    id={6}
                    position={[40.1, 29.45]}
                />


            </MapContainer>
        </div>
    );
};

export default Map;