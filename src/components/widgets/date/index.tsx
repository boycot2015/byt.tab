import { Card, ConfigProvider } from 'antd'
import { HolidayUtil, Lunar } from 'lunar-typescript'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { useState } from 'react'

import { ThemeProvider } from '~layouts'
import { getWeek } from '~utils'

import Config from './config'

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
function Widget(props: { withComponents: boolean }) {
  const [visible, setVisible] = useState(false)
  const d2 = Lunar.fromDate(new Date())
  const month = d2.getMonthInChinese()
  const day = d2.getDayInChinese()
  return (
    <ThemeProvider>
      <ConfigProvider
        prefixCls="byt"
        theme={{ components: { Card: { bodyPadding: 10, headerHeight: 40 } } }}>
        <Card
          className="w-[140px] h-[140px] overflow-hidden !rounded-md !border-none mx-auto !bg-transparent"
          classNames={{
            header: '!bg-red-500 !text-white',
            body: '!bg-white w-full h-[100px]'
          }}
          title={
            <div className="title w-full text-center">
              {new Date().getFullYear() +
                '年' +
                (new Date().getMonth() + 1) +
                '月'}
            </div>
          }
          onClick={(e) => {
            e.stopPropagation()
            !props.withComponents && setVisible(true)
          }}>
          <div className="flex flex-col items-center justify-center">
            <div className="text-[36px] text-[var(--byt-color-text)] font-bold">
              {new Date().getDate()}
            </div>
            <div className="text-sm flex gap-3">
              <span>
                {month}月{day}
              </span>
              周{getWeek(new Date().getDay())}
            </div>
          </div>
        </Card>
      </ConfigProvider>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
