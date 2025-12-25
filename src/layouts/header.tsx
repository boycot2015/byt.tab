import { Typography } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Lunar } from 'lunar-typescript'
import React, { useEffect, useState } from 'react'

const { Paragraph, Title, Text } = Typography
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
    <div>
      <Paragraph className="flex flex-col items-center justify-center mb-2">
        <Title className="!text-[60px] !mb-0 font-bold text-center !text-white text-shadow">
          {time.toLocaleTimeString()}
        </Title>
        <Paragraph className="w-full flex font-bold justify-center text-center  text-shadow gap-2">
          <Text className="!text-[18px] !text-white">
            {time.getFullYear()}年{time.getMonth() + 1}月{time.getDate()}日
          </Text>
          <Text className="!text-[18px] !text-white">
            {getYearLabel(time.getFullYear())}
            {getLunarLabel(time.getMonth(), dayjs(time))}
          </Text>
        </Paragraph>
      </Paragraph>
    </div>
  )
}
