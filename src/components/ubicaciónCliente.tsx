'use client'

import { useEffect, useState } from 'react'
import PronosticoPorUbicacion from './Clima';

export default function UbicacionUsuario() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
    }, (err) => {
      console.error("Error al obtener ubicación:", err)
    })
  }, [])

  if (!coords) return <p>Obteniendo ubicación...</p>

  return <PronosticoPorUbicacion lat={coords.lat} lon={coords.lon} />
}
