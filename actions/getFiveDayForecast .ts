export const getFiveDayForecast = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
    )

    return data.json()
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}
