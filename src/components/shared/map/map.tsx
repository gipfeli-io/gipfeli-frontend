import {useRef, useEffect, useState} from "react";
import {View, Map} from "ol";
import 'ol/ol.css'
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

const MapWrapper = () => {
    const mapRef = useRef(null) // needs to be initialized with null otherwise using it with ref will not work
    const [map, setMap] = useState({} as Map)

    useEffect(() => {
        const initialMap = new Map({
            target: mapRef.current ? mapRef.current : undefined, // target does not accept null values so we have to set undefined if mapref is null
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            view: new View({
                projection: 'EPSG:4326',
                center: [0,0],
                zoom: 2
            }),
            controls: []
        })
        setMap(initialMap)
    }, [mapRef])

    return (
        <>
            <div ref={mapRef} className="map-container" style={{height: '300px'}}/>
        </>
    )
}

export default MapWrapper