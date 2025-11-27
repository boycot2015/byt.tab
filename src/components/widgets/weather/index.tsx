import { Card, message } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import React, { useEffect, useState } from 'react'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import { getWeather, getWeatherBg, weatherIcon } from '~data/weather'
import { ThemeProvider } from '~layouts'

import Config from './config'

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
export interface Weather {
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
function Widget(props: {
  withComponents?: boolean
  size?: 'small' | 'middle' | 'large'
}) {
  const [visible, setVisible] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [weather, setWeather] = useStorage<Weather[]>(
    {
      key: 'weather',
      instance: new Storage({
        area: 'local'
      })
    },
    (val) => {
      val && setHasData(true)
      return val || ([] as Weather[])
    }
  )
  React.useMemo(() => {
    getWeather('深圳').then((res) => {
      let newWeather = [...weather]
      if (hasData) {
        newWeather.splice(
          weather.findIndex((item) => item.location.city === res.location.city),
          1,
          res
        )
        setWeather(newWeather)
      } else {
        setWeather([res])
      }
    })
  }, [])
  return (
    <ThemeProvider>
      <Card
        className="!rounded-md overflow-hidden !border-none !bg-transparent"
        classNames={{
          body: `!overflow-hidden !rounded-md ${props.size === 'small' ? 'w-[60px] h-[60px] !p-1' : props.size === 'middle' ? 'w-[140px] h-[140px] !p-[12px]' : 'w-[250px] h-[140px]'} mx-auto ${getWeatherBg(weather?.[0]?.weather?.condition || '晴')}`
        }}
        onClick={(e) => {
          e.stopPropagation()
          !props.withComponents && setVisible(true)
        }}>
        {!props.size || props.size === 'middle' ? (
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                {weather?.[0]?.location?.county ||
                  weather?.[0]?.location?.city ||
                  '深圳'}
                <span className="text-xl">
                  {weather?.[0]?.weather?.temperature || '25'}°
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      weatherIcon[weather?.[0]?.weather?.condition || '晴']
                  }}></span>
                <span>{weather?.[0]?.weather?.condition || '晴'}</span>
              </div>
            </div>
            <span>
              AQI{weather?.[0]?.air_quality?.level || '优'}/
              {weather?.[0]?.air_quality?.aqi || '20'}
            </span>
            <span className="flex text-xs gap-2">
              <span>
                最低&nbsp;{weather?.[0]?.daily_forecast?.[1]?.min_temperature}°
              </span>
              <span>
                最高&nbsp;{weather?.[0]?.daily_forecast?.[1]?.max_temperature}°
              </span>
            </span>
            {/* 🎉 欢迎使用 byt tab！ */}
          </div>
        ) : props.size === 'small' ? (
          <div className="flex flex-col items-center justify-center text-white">
            {weather?.[0]?.location?.county ||
              weather?.[0]?.location?.city ||
              '深圳'}
            <div className="text-md">
              <span
                dangerouslySetInnerHTML={{
                  __html: weatherIcon[weather?.[0]?.weather?.condition || '晴']
                }}></span>
            </div>
            {/* <span>{weather?.[0]?.weather?.temperature || '25'}°</span> */}
          </div>
        ) : (
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                {weather?.[0]?.location?.county ||
                  weather?.[0]?.location?.city ||
                  '深圳'}
                <span className="text-xl">
                  {weather?.[0]?.weather?.temperature || '25'}°
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      weatherIcon[weather?.[0]?.weather?.condition || '晴']
                  }}></span>
                <span>{weather?.[0]?.weather?.condition || '晴'}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>
                  AQI{weather?.[0]?.air_quality?.level || '优'}/
                  {weather?.[0]?.air_quality?.aqi || '20'}
                </span>
                <span className="flex text-xs gap-2">
                  <span>
                    最低&nbsp;
                    {weather?.[0]?.daily_forecast?.[1]?.min_temperature}°
                  </span>
                  <span>
                    最高&nbsp;
                    {weather?.[0]?.daily_forecast?.[1]?.max_temperature}°
                  </span>
                </span>
              </div>
              <div className="flex flex-col text-md">
                <span>
                  日出&nbsp;&nbsp;
                  {weather?.[0]?.sunrise?.sunrise_desc}
                </span>
                <span>
                  日落&nbsp;&nbsp;
                  {weather?.[0]?.sunrise?.sunset_desc}
                </span>
              </div>
            </div>
            {/* 🎉 欢迎使用 byt tab！ */}
          </div>
        )}
      </Card>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
