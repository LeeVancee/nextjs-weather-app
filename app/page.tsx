import { getAirPollutionData } from "@/actions/getAirPollutionData"
import { getCity } from "@/actions/getCity"
import { getFiveDayForecast } from "@/actions/getFiveDayForecast "
import { getHourlyData } from "@/actions/getHourlyData"
import { getTenDayForecast } from "@/actions/getTenDayForecast"
import { getUVData } from "@/actions/getUVData"
import Com from "@/components/Com"
import CurrentWeather from "@/components/widgets/CurrentWeather"
import HourlyForecast from "@/components/widgets/HourlyForecast"
import Map from "@/components/widgets/Map"
import OtherLargeCities from "@/components/widgets/OtherLargeCities"
import TenDayForecast from "@/components/widgets/TenDayForecast"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import { DEFAULT_LOCATION } from "@/lib/config"
import {
  AirPollutionResponse,
  HourlyForecastResponse,
  TenDayForecastData,
  UVIndexResponse,
} from "@/lib/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
  description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
  icons: "/icon.png",
}

export default async function Home() {
  const { lat, lon } = DEFAULT_LOCATION.coord

  /*   const HourlyDataRequest: HourlyForecastResponse = await getHourlyData({
    lat,
    lon,
  })
  const TenDayForecastRequest: TenDayForecastData = await getTenDayForecast({
    lat,
    lon,
  })
  const AirDataRequest: AirPollutionResponse = await getAirPollutionData({
    lat,
    lon,
  })
  const UvIndexRequest: UVIndexResponse = await getUVData({ lat, lon })

  const [hourly_data, ten_day_forecast, air_pollution, uv_index] =
    await Promise.all([
      HourlyDataRequest,
      TenDayForecastRequest,
      AirDataRequest,
      UvIndexRequest,
    ])

  if (!hourly_data || !ten_day_forecast || !air_pollution) return notFound()
 */
  const HourlyDataRequest = await getHourlyData({
    lat,
    lon,
  })
  const cityRequest = await getCity({
    lat,
    lon,
  })
  const TenDayForecastRequest: TenDayForecastData = await getTenDayForecast({
    lat,
    lon,
  })
  const FiveDayForecastRequest = await getFiveDayForecast({
    lat,
    lon,
  })
  const AirDataRequest: AirPollutionResponse = await getAirPollutionData({
    lat,
    lon,
  })

  const [hourly_data, city_data, ten_day_forecast, air_pollution] =
    await Promise.all([
      HourlyDataRequest,
      cityRequest,
      TenDayForecastRequest,
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

        <div className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourly_data.hourly[0]}
            current={hourly_data.current}
            timezone={hourly_data.timezone_offset}
            airQuality={air_pollution.list[0]}
            uvIndexForToday={hourly_data.current.uvi}
          />
          <HourlyForecast data={hourly_data.hourly} />
          <Map />
          <OtherLargeCities />
        </div>
      </div>
    </>
  )
}
