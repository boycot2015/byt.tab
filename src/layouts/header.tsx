import { Typography } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Lunar } from 'lunar-typescript'
import React, { useEffect, useState } from 'react'

import { buildDay } from '~utils'

const { Paragraph, Title, Text } = Typography
export default function Header() {
  const [time, setTime] = useState<any>(new Date())
  const state = buildDay()

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
    <Paragraph className="flex flex-col items-center w-full justify-center mb-2">
      <Title className="!text-[60px] !mb-0 font-bold text-center !text-white text-shadow">
        {time.toLocaleTimeString()}
      </Title>
      <Paragraph className="w-full flex flex-col sm:flex-row font-bold justify-center text-center text-shadow gap-2">
        <Text className="!text-[18px] !text-white">
          {time.getFullYear()}年{time.getMonth() + 1}月{time.getDate()}日
        </Text>
        <Text className="!text-[18px] !text-white">
          {state.customFestivals.length
            ? state.customFestivals
                .map((item) => item + ' ' + state.dateIcons[item] || '')
                .join('')
            : null}
        </Text>
        <Text className="!text-[18px] !text-white flex justify-center gap-4">
          <span>
            {state.yearGanZhi}年 {state.yearShengXiao}
          </span>
          农历 {state.lunarMonth}月{state.lunarDay}
        </Text>
      </Paragraph>
    </Paragraph>
  )
}
