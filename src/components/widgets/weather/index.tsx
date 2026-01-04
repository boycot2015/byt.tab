import { useAsyncEffect, useInterval, useLocalStorageState } from 'ahooks'
import { Card } from 'antd'
// import type { PlasmoGetInlineAnchor } from 'plasmo'
import React, { useState } from 'react'

import { getWeather, getWeatherBg, weatherIcon } from '~data/weather'
import { sizeMap, ThemeProvider } from '~layouts'

import WidgetModal from './config'

// export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
//   document.querySelector('#__plasmo')
export interface Weather {
  id: string | number
  location: {
    name: string
    province: string
    city: string
    county: string
  }
  weather: {
    condition: string
    condition_code: string
    temperature: number
    humidity: number
    pressure: number
    precipitation: number
    wind_direction: string
    wind_power: string
    weather_icon: string
    weather_colors: string[]
    updated: string
    updated_at: number
  }
  air_quality: {
    aqi: number
    level: number
    quality: string
    pm25: number
    pm10: number
    co: number
    no2: number
    o3: number
    so2: number
    rank: number
    total_cities: number
    updated: string
    updated_at: number
  }
  sunrise: {
    sunrise: string
    sunrise_at: number
    sunrise_desc: string
    sunset: string
    sunset_at: number
    sunset_desc: string
  }
  sunrise_sunset?: Weather['sunrise'][]
  life_indices: {
    key: string
    name: string
    level: string
    description: string
  }[]
  alerts: {
    type: string
    level: string
    level_code: string
    province: string
    city: string
    county: string
    detail: string
    publish_time: string
    updated: string
    updated_at: number
  }[]
  daily_forecast?: {
    date: string
    max_temperature: number
    min_temperature: number
    day_condition: string
    night_condition: string
    night_condition_code: string
    day_condition_code: string
    day_wind_direction: string
    day_wind_power: string
    night_wind_direction: string
    night_wind_power: string
    aqi: number
    aqi_level: number
    aqi_quality: string
    day_weather_icon: string
    night_weather_icon: string
  }[]
  hourly_forecast?: {
    datetime: string
    temperature: number
    condition: string
    condition_code: string
    wind_direction: string
    wind_power: string
    weather_icon: string
  }[]
}
type WidgetProp = {
  withComponents?: boolean
  location?: string
  id?: string | number
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'mini' | 'small' | 'middle' | 'large'
}
function Widget(props: WidgetProp) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState<Weather>()
  const [weathers, setWeathers] = useLocalStorageState<Weather[]>('weathers', {
    defaultValue: [],
    listenStorageChange: true
  })
  useAsyncEffect(async () => {
    if (
      props.location &&
      !weathers
        .filter((_) => _.location)
        .map((item) => item.location.city)
        .includes(props.location || '深圳市')
    ) {
      let res = await getWeather(props.location || '深圳市')
      setWeathers(
        [...weathers, res].filter(
          (el, index, self) =>
            self.findIndex(
              (item) => item.location?.city === el.location?.city
            ) === index && el.location
        )
      )
      setWeather(res)
    } else {
      setWeather(
        weathers.find(
          (item) => item.location.city === (props.location || '深圳市')
        )
      )
    }
  }, [props.location])
  useInterval(() => {
    if (weather?.location?.city) {
      getWeather(weather?.location?.city).then((res) => {
        setWeathers(
          [res, ...weathers].filter(
            (el, index, self) =>
              self.findIndex(
                (item) => item.location?.city === el.location?.city
              ) === index && el.location
          )
        )
        setWeather(res)
      })
    }
  }, 60000)
  return (
    <ThemeProvider>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full ${props.size === 'mini' ? '!p-1' : ''} !rounded-xl mx-auto ${getWeatherBg(weather?.weather?.condition || '晴')}`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        {!props.size || props.size === 'middle' ? (
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                {weather?.location?.county ||
                  weather?.location?.city ||
                  '深圳市'}
                <span className="text-xl">
                  {weather?.weather?.temperature || '25'}°
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: weatherIcon[weather?.weather?.condition || '晴']
                  }}></span>
                <span>{weather?.weather?.condition || '晴'}</span>
              </div>
            </div>
            <span className="flex">
              AQI&nbsp;
              <span className="line-clamp-1 max-w-[30px]">
                {weather?.air_quality?.quality || '优'}
              </span>
              /{weather?.air_quality?.aqi || '20'}
            </span>
            <span className="flex whitespace-nowrap text-xs gap-2">
              <span>
                最低&nbsp;
                {weather?.daily_forecast?.[1]?.min_temperature || 20}°
              </span>
              <span>
                最高&nbsp;
                {weather?.daily_forecast?.[1]?.max_temperature || 25}°
              </span>
            </span>
            {/* 🎉 欢迎使用 byt tab！ */}
          </div>
        ) : props.size === 'mini' ? (
          <div className="flex flex-col items-center justify-center text-white">
            {weather?.location?.county || weather?.location?.city || '深圳市'}
            <div className="text-md">
              <span
                dangerouslySetInnerHTML={{
                  __html: weatherIcon[weather?.weather?.condition || '晴']
                }}></span>
            </div>
            {/* <span>{weather?.weather?.temperature || '25'}°</span> */}
          </div>
        ) : (
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                {weather?.location?.county ||
                  weather?.location?.city ||
                  '深圳市'}
                <span className="text-xl">
                  {weather?.weather?.temperature || '25'}°
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: weatherIcon[weather?.weather?.condition || '晴']
                  }}></span>
                <span>{weather?.weather?.condition || '晴'}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>
                  AQI&nbsp;{weather?.air_quality?.quality || '优'}/
                  {weather?.air_quality?.aqi || '20'}
                </span>
                <span className="flex text-xs gap-2">
                  <span>
                    最低&nbsp;
                    {weather?.daily_forecast?.[1]?.min_temperature || 20}°
                  </span>
                  <span>
                    最高&nbsp;
                    {weather?.daily_forecast?.[1]?.max_temperature || 25}°
                  </span>
                </span>
              </div>
              <div className="flex flex-col text-md">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16">
                    <path
                      fill="currentColor"
                      d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                  日出&nbsp;&nbsp;
                  {weather?.sunrise?.sunrise_desc}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16">
                    <path
                      fill="currentColor"
                      d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                  日落&nbsp;&nbsp;
                  {weather?.sunrise?.sunset_desc}
                </span>
              </div>
            </div>
            {/* 🎉 欢迎使用 byt tab！ */}
          </div>
        )}
      </Card>
      {show && (
        <WidgetModal
          visible={visible}
          location={props.location || '深圳市'}
          onCancel={(data) => {
            setVisible(false)
            setWeather(data)
            props.update({
              id: props.id,
              props: { size: props.size, location: data.location?.city }
            })
            setTimeout(() => {
              setShow(false)
            }, 300)
          }}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
