import {PropsWithChildren, useEffect, useId, useState} from 'react'
import {Map, View} from 'ol'
import 'ol/ol.css'
import TileLayer from 'ol/layer/Tile'
import {OSM, XYZ} from 'ol/source'
import styles from './MapWrapper.module.scss'
import MapContext from './MapContext'

const MapWrapper = ({children}: PropsWithChildren<{}>) => {
    const mapContainerId = useId() // I changed this to useId, since I am not sure if we need the useRefs hook? OL just needs a unique identifier.
    const [map, setMap] = useState<Map | undefined>(undefined)

    useEffect(() => {
        const initialMap = new Map({
            target: mapContainerId,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`
                    })
                }),
            ],
            view: new View({
                projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2
            }),
            controls: []
        })
        setMap(initialMap)

        return () => initialMap.dispose() // Cleans up when the component is dismounted.
    }, [mapContainerId])

    return (
        <MapContext.Provider value={{map}}>
            <div id={mapContainerId} className={styles.mapContainer}>
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default MapWrapper