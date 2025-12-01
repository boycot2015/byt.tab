import { useAsyncEffect, useInterval, useLocalStorageState } from 'ahooks'
import { Card, message, theme } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import React, { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { getWeather, getWeatherBg, weatherIcon } from '~data/weather'
import { sizeMap, ThemeProvider } from '~layouts'
import type { Config } from '~types.d'

import WidgetModal from './config'

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
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
function Widget(props: {
  withComponents?: boolean
  location?: string
  size?: 'mini' | 'small' | 'middle' | 'large'
}) {
  const [visible, setVisible] = useState(false)
  const [weather, setWeather] = useState<Weather>()
  const [config] = useStorage<Config>('config')
  const [weathers, setWeathers] = useLocalStorageState<Weather[]>('weathers', {
    defaultValue: [],
    listenStorageChange: true
  })
  useAsyncEffect(async () => {
    if (
      props.location &&
      !weathers
        .map((item) => item.location.city)
        .includes(props.location || '深圳市')
    ) {
      let res = await getWeather(props.location || '深圳市')
      setWeathers(
        [...weathers, res].filter(
          (el, index, self) =>
            self.findIndex(
              (item) => item.location?.city === el.location?.city
            ) === index
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
              ) === index
          )
        )
        setWeather(res)
      })
    }
  }, 60000)
  return (
    <ThemeProvider token={{ colorPrimary: config?.theme?.primary }}>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full ${props.size === 'mini' ? '!p-1' : ''} !rounded-xl mx-auto ${getWeatherBg(weather?.weather?.condition || '晴')}`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
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
                <span>
                  日出&nbsp;&nbsp;
                  {weather?.sunrise?.sunrise_desc}
                </span>
                <span>
                  日落&nbsp;&nbsp;
                  {weather?.sunrise?.sunset_desc}
                </span>
              </div>
            </div>
            {/* 🎉 欢迎使用 byt tab！ */}
          </div>
        )}
      </Card>
      {visible && (
        <WidgetModal
          visible={visible}
          location={props.location || '深圳市'}
          onCancel={() => setVisible(false)}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
