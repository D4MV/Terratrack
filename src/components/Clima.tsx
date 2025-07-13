'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useEffect, useState } from 'react'

export default function PronosticoPorUbicacion({ lat, lon }: { lat: number, lon: number }) {
  const [datos, setDatos] = useState<any>(null)

  useEffect(() => {
    if (!lat || !lon) return

    fetch(`/api/clima?lat=${lat}&lon=${lon}&dias=7`)
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(console.error)
  }, [lat, lon])
  const hoy = new Date()


  if (!datos) return <p>Cargando pronóstico...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Pronóstico del Tiempo</h2>
        <p className="text-center text-gray-600">
          {datos.location.name}, {datos.location.country}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {datos.forecast.forecastday.map((dia: any) => (
          <Card
            key={dia.date}
            className="border-2 border-gray-200 hover:border-gray-400 transition-colors duration-200 hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {new Date(dia.date).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-700 font-medium mb-3">{dia.day.condition.text}</p>

                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Máxima</p>
                    <p className="text-2xl font-bold text-gray-900">{dia.day.maxtemp_c}°</p>
                  </div>

                  <div className="w-px h-12 bg-gray-300"></div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Mínima</p>
                    <p className="text-2xl font-bold text-gray-900">{dia.day.mintemp_c}°</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
