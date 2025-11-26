import {
  CalendarOutlined,
  CloseOutlined,
  FieldTimeOutlined,
  MenuOutlined,
  SearchOutlined,
  SkinOutlined
} from '@ant-design/icons'
import { AutoComplete, Button, Card, Col, Modal, Row, Tooltip } from 'antd'
import type { AutoCompleteProps } from 'antd'
import { useEffect, useState } from 'react'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import type { Weather } from '~components/widgets/weather'
import { getWeather, getWeatherBg, lifeIcon, weatherIcon } from '~data/weather'
import { ThemeProvider } from '~layouts'
import { antishake, getWeek } from '~utils'

import { DailyChart, HoursChart } from './chart'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [menuShow, setMenuShow] = useState(false)
  const [tempWeather, setTempWeather] = useState<Weather>()
  const [options, setOptions] = useState<AutoCompleteProps['options']>([])
  const [weather, setWeather] = useStorage<Weather[]>(
    {
      key: 'weather',
      instance: new Storage({
        area: 'local'
      })
    },
    (val) => {
      return val || ([] as Weather[])
    }
  )
  const [currentWeather, setCurrentWeather] = useState<Weather>()
  useEffect(() => {
    let current = weather[weather.length - 1]
    if (!current) return
    setOptions([
      {
        value: `${current?.location?.province || ''} ${current?.location?.city || ''}${current?.location?.county || ''}`
      }
    ])
    setCurrentWeather(current || ({} as Weather))
  }, [weather])
  const addWeather = (value) => {
    // console.log(value)
    if (!value || value.includes(currentWeather.location?.city || '')) return
    setWeather([...weather, tempWeather])
  }
  const mockVal = (str: string) => ({
    value: str
  })
  const onSearch = (value: string) => {
    // console.log(value)
    getWeather(value).then((res) => {
      if (!res?.location?.city) return
      setOptions(getPanelValue(res.location))
      setTempWeather(res)
    })
  }
  const getPanelValue = (obj: Record<string, any>) => {
    return !obj.city ? [] : [mockVal(obj.province + obj.city + obj.county)]
  }
  return (
    <ThemeProvider>
      <Modal
        title=""
        classNames={{
          content: `${getWeatherBg(currentWeather?.weather?.condition)} !overflow-hidden !p-0 backdrop-blur-md`,
          body: '!p-4 !pt-9 !pr-0'
        }}
        width={860}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        onCancel={() => props.onCancel()}>
        <div className="flex">
          <div
            className="flex-1 !text-white max-h-[60vh] pr-2 overflow-y-auto relative"
            onContextMenu={(event) => event.stopPropagation()}
            onClick={(e) => {
              e.preventDefault()
              setMenuShow(false)
            }}>
            <div
              className="absolute top-2 cursor-pointer right-1.5 text-white"
              onClick={(e) => {
                e.stopPropagation()
                setMenuShow(!menuShow)
              }}>
              <MenuOutlined />
            </div>
            {/* top */}
            <div className="flex w-full gap-5">
              <div>
                {currentWeather?.location?.province}·
                {currentWeather?.location?.city}
              </div>
              <div>{currentWeather?.weather?.condition}</div>
              <div>
                更新于：
                {new Date(currentWeather?.weather?.updated_at).toLocaleString()}
              </div>
            </div>
            {/* temp */}
            <div className="flex items-center gap-2">
              <span className="text-[64px]">
                <span>{currentWeather?.weather?.temperature}</span>
                {/* <span>°</span> */}
                <sup className="text-[38px]">°</sup>
              </span>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span>AQI</span>
                  <span>
                    {currentWeather?.air_quality?.quality || '优'}/
                    {currentWeather?.air_quality?.aqi || '20'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>{currentWeather?.weather?.condition}</span>
                  <span>
                    {currentWeather?.weather?.wind_direction}
                    {currentWeather?.weather?.wind_power}级
                  </span>
                </div>
              </div>
            </div>
            {/* desc */}
            <div className="flex flex-col gap-2 mb-2">
              <div>
                {
                  currentWeather?.life_indices?.find(
                    (item) => item.key == 'comfort'
                  )?.description
                }
              </div>
              <div className="flex gap-2">
                <span className="flex gap-2">
                  <span>
                    最低{currentWeather?.daily_forecast?.[1]?.min_temperature}°
                  </span>
                  <span>
                    最高{currentWeather?.daily_forecast?.[1]?.max_temperature}°
                  </span>
                </span>
                <span>
                  日出&nbsp;&nbsp;
                  {currentWeather?.sunrise?.sunrise_desc}
                </span>
                <span>
                  日落&nbsp;&nbsp;
                  {currentWeather?.sunrise?.sunset_desc}
                </span>
              </div>
            </div>
            {/* hourly_forecast */}
            <div className="bg-white/10 p-3 rounded-md mb-3">
              <div className="title mb-3 text-white/60 pl-2">
                <FieldTimeOutlined />
                <span className="ml-2">24小时天气预报</span>
              </div>
              <div className="flex flex-nowrap text-white overflow-x-auto gap-2 relative">
                {currentWeather?.hourly_forecast?.map((el) => (
                  <div key={el.datetime} className="flex flex-col gap-2">
                    <div className="flex flex-col items-center justify-center gap-2 hover:bg-white/30 p-2 hover:rounded-md">
                      <span>{el.datetime?.split(' ')[1]}</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: weatherIcon[el.condition] || 'sunny'
                        }}></span>
                    </div>
                    <span className="h-[100px]"></span>
                  </div>
                ))}
                {currentWeather?.hourly_forecast?.length ? (
                  <div className="absolute left-0 bottom-0 w-full">
                    <HoursChart
                      data={currentWeather?.hourly_forecast?.map((item) => ({
                        datetime: item.datetime?.split(' ')[1],
                        temperature: item.temperature
                      }))}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {/* dayily_forecast */}
            <div className="bg-white/10 p-3 rounded-md mb-3">
              <div className="title mb-3 text-white/60 pl-2">
                <CalendarOutlined />
                <span className="ml-2">7天天气预报</span>
              </div>
              <div className="flex flex-nowrap text-white overflow-x-auto gap-[32px] relative">
                {currentWeather?.daily_forecast?.map((el) => (
                  <div key={el.date} className="flex flex-col gap-2">
                    <div className="flex flex-col items-center justify-center gap-2 hover:bg-white/30 p-2 hover:rounded-md">
                      <span>{el.date?.split('-').slice(1).join('-')}</span>
                      <span>周{getWeek(new Date(el.date).getDay())}</span>
                      <div className="flex gap-1 justify-center items-center">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: weatherIcon[el.day_condition] || 'sunny'
                          }}></span>
                        <span className="w-[30px]">{el.day_condition}</span>
                      </div>
                      <span className="h-[120px]"></span>
                      <div className="flex gap-2 justify-center items-center">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: weatherIcon[el.night_condition] || 'sunny'
                          }}></span>
                        <span className="w-[30px]">{el.night_condition}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {currentWeather?.daily_forecast?.length ? (
                  <div className="absolute left-0 bottom-[40px] w-full">
                    <DailyChart
                      data={currentWeather?.daily_forecast?.map((item) => ({
                        datetime: item.date?.split('-')[2],
                        day_condition: item.day_condition,
                        night_condition: item.night_condition,
                        min_temperature: item.min_temperature,
                        max_temperature: item.max_temperature
                      }))}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {/* life */}
            <div className="rounded-md">
              <div className="title mb-3 text-white/60 pl-2">
                <SkinOutlined />
                <span className="ml-2">生活指数</span>
              </div>
              <Row
                gutter={[8, 8]}
                className="!bg-transparent !overflow-hidden flex flex-wrap !rounded-md">
                {currentWeather?.life_indices
                  ?.filter((item) => item?.name?.length < 5)
                  .map((item) => (
                    <Col span={6} key={item.key}>
                      <Card
                        className="!border-none !bg-white/10"
                        classNames={{
                          body: '!bg-transparent !overflow-hidden !rounded-md text-white'
                        }}
                        hoverable={false}
                        key={item.key}>
                        <Tooltip title={item.description}>
                          <div className="flex flex-col items-center gap-2">
                            <span className="line-clamp-1">{item.name}</span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: lifeIcon[item.name] || 'sunny'
                              }}></span>
                            <span>{item.level}</span>
                          </div>
                        </Tooltip>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
          <div
            className={`right transition-[width] max-h-[60vh] overflow-y-auto ease-in-out duration-3000 ${!menuShow ? 'w-0 opacity-0' : 'w-[200px] p-2 pr-3 opacity-1'}`}>
            <AutoComplete
              placeholder="请输入城市"
              onSelect={addWeather}
              showSearch={true}
              onSearch={antishake(onSearch, 1000)}
              className="!bg-transparent !border-white/30 !text-white !placeholder-white/60 !w-full mb-2"
              options={options}
              prefix={<SearchOutlined />}
            />
            <div className="flex flex-col gap-2">
              {weather.map((item, index) => (
                <Card
                  key={item?.location?.city || index}
                  className="!overflow-hidden cursor-pointer whitespace-nowrap !rounded-md bg-white/20 shadow-md !border-none"
                  classNames={{
                    body: '!bg-transparent !overflow-hidden !rounded-md text-white !p-2'
                  }}
                  onClick={() => setCurrentWeather(item)}>
                  <div className="flex items-center gap-2">
                    <span className="flex-1">{item?.location?.city}</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item?.weather?.condition
                          ? weatherIcon[item?.weather?.condition] || 'sunny'
                          : 'sunny'
                      }}></span>
                    {item?.weather?.condition}
                    <span>{item?.weather?.temperature}°</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
