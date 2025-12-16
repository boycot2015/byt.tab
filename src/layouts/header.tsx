import {
  Button,
  Card,
  ColorPicker,
  ConfigProvider,
  Input,
  message,
  Tabs
} from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { HolidayUtil, Lunar } from 'lunar-typescript'
import React, { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [time, setTime] = useState<any>(new Date())
  const getYearLabel = React.useCallback((year: number) => {
    const d = Lunar.fromDate(new Date(year + 1, 0))
    return `${d.getYearInGanZhi()}${d.getYearShengXiao()}年`
  }, [])

  const getLunarLabel = React.useCallback((month: number, value: Dayjs) => {
    const d = Lunar.fromDate(new Date(value.year(), month))
    const lunar = d.getMonthInChinese()
    const day = Lunar.fromDate(new Date()).getDayInChinese()
    return `${lunar}月${day}`
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center mb-2">
      <h1 className="text-[60px] font-bold text-center text-white text-shadow">
        {time.toLocaleTimeString()}
      </h1>
      <p className="w-full flex font-bold justify-center text-center text-white text-shadow gap-2">
        <span>
          {time.getFullYear()}年{time.getMonth() + 1}月{time.getDate()}日
        </span>
        <span>
          {getYearLabel(time.getFullYear())}
          {getLunarLabel(time.getMonth(), dayjs(time))}
        </span>
      </p>
    </div>
  )
}
