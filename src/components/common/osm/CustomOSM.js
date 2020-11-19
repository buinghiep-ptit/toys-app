import React from "react";
// import Header from "components/Header";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "./osm-providers.js";
import "leaflet/dist/leaflet.css";
import cities from "./cities.json";
import L from 'leaflet';
// import ExternalInfo from "components/ExternalInfo";
import icon from '../../../assets/img/marker.png';

const markerIcon = new L.Icon({
    iconUrl: icon,//require("assets/img/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

const OSMBasic = (props) => {
    const [center, setCenter] = React.useState({ lat: 20.980585, lng: 105.787936 });//20.980585, 105.787936
    const ZOOM_LEVEL = 17;
    const mapRef = React.useRef();
    const { iframeView } = props;
    return (
        <Map style={iframeView} center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
            />
            {cities.map((city, idx) => (
                <Marker
                    position={[20.980585,105.787936]}
                    icon={markerIcon}
                    key={idx}
                >
                    <Popup>
                        <b>
                            {city.city}, {city.country}
                        </b>
                    </Popup>
                </Marker>
            ))}
        </Map>
    );
};

export default OSMBasic;