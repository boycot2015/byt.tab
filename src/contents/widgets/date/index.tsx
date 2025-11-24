import { Card, ConfigProvider } from 'antd'
import { HolidayUtil, Lunar } from 'lunar-typescript'
import { useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

import Config from './config'

function Widget() {
  const [visible, setVisible] = useState(false)
  const getweek = (day: number) => {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    return week[day]
  }
  const d2 = Lunar.fromDate(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1)
  )
  const month = d2.getMonthInChinese()
  const day = d2.getDayInChinese()
  return (
    <ThemeProvider>
      <ConfigProvider
        prefixCls="byt"
        theme={{ components: { Card: { bodyPadding: 10, headerHeight: 40 } } }}>
        <Card
          classNames={{
            header: '!bg-red-500 !text-white'
          }}
          title={
            <div className="title mt-2 w-full text-center">
              {new Date().getFullYear() +
                '年' +
                (new Date().getMonth() + 1) +
                '月'}
            </div>
          }
          onClick={() => {
            setVisible(true)
          }}>
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl mb-2 text-[var(--byt-color-text)] font-bold">
              {new Date().getDate()}
            </div>
            <div className="text-sm flex gap-3">
              <span>
                {month}月{day}
              </span>
              周{getweek(new Date().getDay())}
            </div>
          </div>
        </Card>
      </ConfigProvider>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
