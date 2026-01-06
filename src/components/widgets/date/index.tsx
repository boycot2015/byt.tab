import { Calendar, Card, ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import { Solar } from 'lunar-typescript'
import { useCallback, useState } from 'react'

import { sizeMap, ThemeProvider } from '~layouts'
import { buildDay, getWeek } from '~utils'

import Config, { RenderCellCalendar } from './config'

function Widget(props: {
  withComponents: boolean
  size?: 'mini' | 'small' | 'large' | 'middle'
}) {
  const [visible, setVisible] = useState(false)
  const day = buildDay()
  const renderCalendar = useCallback(
    (current, selected) => RenderCellCalendar(current, selected),
    [day]
  )
  return (
    <ThemeProvider>
      <ConfigProvider
        prefixCls="byt"
        key={props.size}
        theme={{ components: { Card: { bodyPadding: 10, headerHeight: 40 } } }}>
        {!props.size ||
          (props.size == 'middle' && (
            <Card
              className={`!border-none overflow-hidden h-full mx-auto !bg-transparent ${sizeMap[props.size || 'mini']}`}
              classNames={{
                header: '!bg-red-500 !text-white',
                body: '!bg-white w-full'
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
                <div className="text-[42px] text-[var(--byt-color-text)] font-bold">
                  {day.day}
                  <span className="text-[16px]">
                    {day.customFestivals[0] || day.jieQi || ''}
                    {day.dateIcon}
                  </span>
                </div>
                <div className="text-sm flex gap-3">
                  <span>
                    {day.lunarMonth}月{day.lunarDay}
                  </span>
                  {getWeek(day.week)}
                </div>
              </div>
            </Card>
          ))}
        {(props.size == 'mini' || props.size == 'large') && (
          <Card
            className={`app-item-icon !overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !rounded-xl !border-none mx-auto !bg-transparent`}
            classNames={{
              header: '!bg-red-500 !text-white',
              body: `!p-2 !bg-white ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'}`
            }}
            onClick={(e) => {
              !props.withComponents && setVisible(true)
            }}>
            {props.size == 'mini' && (
              <div className={`flex flex-col items-center justify-between`}>
                <div className="!text-[12px] text-center">
                  {getWeek(new Date().getDay())}
                </div>
                <div className="!text-[16px] text-[var(--byt-color-text)] font-bold">
                  {new Date().getDate()}
                </div>
              </div>
            )}
            {props.size == 'large' && (
              <div className="flex-1">
                <Calendar
                  fullscreen={false}
                  fullCellRender={(data, info) =>
                    renderCalendar(dayjs(), dayjs())(data, info)
                  }
                  headerRender={() => (
                    <div className="title w-full text-center">
                      {new Date().getFullYear() +
                        '年' +
                        (new Date().getMonth() + 1) +
                        '月'}
                      {getWeek(new Date().getDay())}
                    </div>
                  )}
                />
              </div>
            )}
          </Card>
        )}
      </ConfigProvider>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
