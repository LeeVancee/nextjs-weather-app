import { getAirPollutionData } from "@/actions/getAirPollutionData"
import { getCity } from "@/actions/getCity"
import { getHourlyData } from "@/actions/getHourlyData"
import { getTenDayForecast } from "@/actions/getTenDayForecast"
import { getUVData } from "@/actions/getUVData"
import Mapbox from "@/components/Mapbox"
import CurrentWeather from "@/components/widgets/CurrentWeather"
import HourlyForecast from "@/components/widgets/HourlyForecast"
import Map from "@/components/widgets/Map"
import OtherLargeCities from "@/components/widgets/OtherLargeCities"
import TenDayForecast from "@/components/widgets/TenDayForecast"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import {
  AirPollutionResponse,
  HourlyForecastResponse,
  TenDayForecastData,
  UVIndexResponse,
} from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: searchParamsProps
}): Promise<Metadata> {
  const { lat, lon } = searchParams
  // console.log(searchParams)

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  const data = await fetch(url).then((res) => res.json())

  return {
    title: `${data.name} - Weather Forecast`,
    description: `${data.name} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
  }
}

interface searchParamsProps {
  lat: string
  lon: string
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: searchParamsProps
}) {
  const { lat, lon } = searchParams

  const HourlyDataRequest = await getHourlyData({
    lat,
    lon,
  })
  const TenDayForecastRequest = await getTenDayForecast({
    lat,
    lon,
  })
  const AirDataRequest = await getAirPollutionData({
    lat,
    lon,
  })
  const cityRequest = await getCity({
    lat,
    lon,
  })

  const [hourly_data, ten_day_forecast, city_data, air_pollution] =
    await Promise.all([
      HourlyDataRequest,
      TenDayForecastRequest,
      cityRequest,
      AirDataRequest,
    ])

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather data={hourly_data.hourly[0]} city={city_data} />
          <TenDayForecast
            data={hourly_data.daily}
            timezone={hourly_data.timezone_offset}
          />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourly_data.hourly[0]}
            current={hourly_data.current}
            timezone={hourly_data.timezone_offset}
            airQuality={air_pollution.list[0]}
            uvIndexForToday={hourly_data.current.uvi}
          />
          <HourlyForecast data={hourly_data.hourly} />
          {/* <Map /> */}
          {/* <Mapbox lat={lat} lon={lon} /> */}
          {/* <OtherLargeCities /> */}
        </section>
      </div>
    </>
  )
}
