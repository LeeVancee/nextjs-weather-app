export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string
  lon: string
}) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&lang=zh_cn`
    )

    return data.json()
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}
