"use client"
import React, { useEffect } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
//import { useGlobalContext } from '@/app/context/globalContext';

function FlyToActiveCity({ activeCityCords }) {
  const map = useMap()

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13
      const flyToOptions = {
        duration: 1.5,
      }

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      )
    }
  }, [activeCityCords, map])

  return null
}

function Mapbox({ lat, lon }) {
  // const { forecast } = useGlobalContext() // Your coordinates

  /*   const activeCityCords = forecast?.coord

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  } */

  return (
    <div className=" flex flex-1 basis-[50%] rounded-lg border">
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity activeCityCords={{ lat, lon }} />
      </MapContainer>
    </div>
  )
}

export default Mapbox
