import React, {useEffect, useState} from 'react';
import {useMap} from "react-leaflet";

const MousePosition = () => {
    const [mousePos, setMousePos] = useState({lat: 0.0, lng: 0.0});

    const map = useMap();

    useEffect(() => {
        const onMouseMove = (e) => {
            setMousePos({
                lat: e.latlng.lat.toFixed(2),
                lng: e.latlng.lng.toFixed(2),
            });
        };

        // Mouse hareketlerini dinle
        map.on("mousemove", onMouseMove);

        // Component unmount olduğunda event'i kaldır
        return () => {
            map.off("mousemove", onMouseMove);
        };
    }, [map]);

    return (
        <div
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "5px",
                borderRadius: "5px",
                fontSize: "14px",
                zIndex: 999,
            }}>
            Lat: {mousePos.lat} | Lng: {mousePos.lng}
        </div>
    );
};

export default MousePosition;