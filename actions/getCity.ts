export const getCity = async ({ lat, lon }: { lat: string; lon: string }) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,alerts,daily,minutely&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&lang=zh_cn`
    )

    return data.json()
  } catch (error) {
    /* console.log(process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY)

    throw new Error("Failed to fetch data", error) */
  }
}
