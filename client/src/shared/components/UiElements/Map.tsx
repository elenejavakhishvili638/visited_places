import React, { useRef, useEffect } from 'react'
import { Location } from '../../../types/placeTypes';
import "./Map.css"

type Props = {
    className?: string,
    style?: React.CSSProperties,
    center: Location,
    zoom: number
}


const Map = ({ className, style, center, zoom }: Props) => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!window.google || !mapRef.current) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: {
                lat: center.lat,
                lng: center.lng
            },
            zoom: zoom,
        });

        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);

    return (
        <div ref={mapRef} className={`map ${className}`} style={style}></div>
    )
}

export default Map