import { Card, message } from 'antd'
import React, { useEffect, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { ThemeProvider } from '~/contents/layouts'
import { getWeather } from '~data/weather'

import Config from './config'

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
  life_indices: [
    {
      key: string
      name: string
      level: string
      description: string
    }
  ]
  alerts: [
    {
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
    }
  ]
}

function Widget() {
  const [visible, setVisible] = useState(false)
  const [weather, setWeather] = useStorage<Weather>(
    'weather',
    (val) => val || ({} as Weather)
  )
  useEffect(() => {
    getWeather().then((res) => {
      console.log(res)
      setWeather(res)
    })
  }, [])
  return (
    <ThemeProvider>
      <Card
        onClick={() => {
          setVisible(true)
        }}>
        <div className="flex flex-col items-center justify-center">
          <span>
            {weather?.location?.county || weather?.location?.city || '北京'}
          </span>
          <span>{weather?.weather?.condition || '晴'}</span>
          <span>{weather?.weather?.temperature || '25'}℃</span>
          <span>
            AQI{weather?.air_quality?.quality || '优'}
            {weather?.air_quality?.aqi || '20'}
          </span>
          {/* 🎉 欢迎使用 byt tab！ */}
        </div>
      </Card>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
