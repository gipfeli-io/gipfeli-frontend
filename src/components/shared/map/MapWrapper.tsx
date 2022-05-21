import {useRef, useEffect, useState, useId} from 'react'
import {View, Map} from "ol";
import 'ol/ol.css'
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import styles from './MapWrapper.module.css'

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

        return () => initialMap.dispose() // Cleans up when the component is dismounted.
    }, [mapRef])

    return (
        <div ref={mapRef} className={styles.mapContainer}></div>
    )
}

export default MapWrapper