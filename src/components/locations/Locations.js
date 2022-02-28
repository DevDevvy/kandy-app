import React, { useEffect, useState } from "react";
import { getAllLocations } from "../ApiManager";

export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            getAllLocations()
                .then(
                    (location) => {
                        setLocations(location)
                    }
                )
        },
        []
    )


    return (
        <> 
            {
                locations.map(location => {
                    return <p key={`location--${location.id}`}>{location.name}</p>
                })
            }
        </>
    )
}