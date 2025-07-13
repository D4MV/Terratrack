export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const ciudad = searchParams.get('ciudad') || null
  const dias = searchParams.get('dias') || '6'
  const API_KEY = process.env.WEATHERAPI_KEY

  // Si hay lat/lon, úsalo; si no, usa ciudad; si nada, default a Santiago
  const ubicacion = lat && lon ? `${lat},${lon}` : ciudad || 'Santiago'

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${ubicacion}&days=${dias}&lang=es`

  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log('[WEATHERAPI]', url)
    console.log('[RESULTADO]', data)

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
    })
  }
}
