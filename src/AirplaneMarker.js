import React from 'react';
import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import plane2 from "./plane.png";

const planeIcon = L.icon({
    iconUrl: plane2,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

const AirplaneMarker = ({position, id}) => {
    return <Marker key={id}
                   position={position}
                   icon={planeIcon}
                   // eventHandlers={{click: () => alert(position[0] + " " + position[1])}}
    >
        <Popup>
            <div>
                <h4>{"Plane" + id}</h4>
                <p>Uçak ID: {id}</p>
                <p>Konum: Lat: {position[0].toFixed(4)} | Lon: {position[1].toFixed(4)}</p>
            </div>
        </Popup>
    </Marker>;
};

export default AirplaneMarker;