import {
  ArrowUpOutlined,
  CalendarOutlined,
  CloseOutlined,
  FieldTimeOutlined,
  MenuOutlined,
  MinusCircleOutlined,
  SearchOutlined,
  SkinOutlined
} from '@ant-design/icons'
import { useAsyncEffect, useLocalStorageState, useTimeout } from 'ahooks'
import {
  AutoComplete,
  Card,
  Col,
  message,
  Modal,
  Row,
  Spin,
  Tooltip
} from 'antd'
import type { AutoCompleteProps } from 'antd'
import { useRef, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import { renderComponent } from '~components'
import type { Weather } from '~components/widgets/weather'
import { getWeather, getWeatherBg, lifeIcon, weatherIcon } from '~data/weather'
import { ThemeProvider } from '~layouts'
import type { Config } from '~types.d'
import { antishake, getWeek } from '~utils'

import { DailyChart, HoursChart } from './chart'

const wind_direction = {
  南风: -90,
  东北风: 120,
  东南风: -120,
  西风: 0,
  西南风: -45,
  西北风: 45,
  北风: 90
}

function WidgetModal(props: {
  visible: boolean
  location?: string
  onCancel: () => void
}) {
  const [menuShow, setMenuShow] = useState(false)
  const [config] = useStorage<Config>('config')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [tempWeather, setTempWeather] = useState<Weather>()
  const [options, setOptions] = useState<AutoCompleteProps['options']>([])
  const [weathers, setWeathers] = useLocalStorageState<Weather[]>('weathers', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [loading, setLoading] = useState(true)
  const [currentWeather, setCurrentWeather] = useState<Weather>()
  useAsyncEffect(async () => {
    let has = weathers.find((item) =>
      item.location?.city?.includes(props.location)
    )
    if (has) {
      setCurrentWeather(
        weathers.find((item) => item.location?.city?.includes(props.location))
      )
      setLoading(false)
    } else {
      let res = await getWeather(props.location)
      setCurrentWeather(res)
      setWeathers(
        [...weathers, res].filter(
          (el, index, self) =>
            self.findIndex(
              (item) => item.location?.city === el.location?.city
            ) === index
        )
      )
      setLoading(false)
    }
  }, [])
  const addWeather = (value) => {
    if (!value || value == currentWeather?.location?.city) return
    setWeathers(
      [...weathers, tempWeather].filter(
        (el, index, self) =>
          self.findIndex(
            (item) => item.location?.city === el.location?.city
          ) === index
      )
    )
    // setCurrentWeather(tempWeather)
    onWeatherChange(tempWeather, true)
  }
  const onSearch = (value: string) => {
    // console.log(value)
    setOptions([{ value: '正在查询，请稍后...' }])
    return getWeather(value).then((res) => {
      if (!res?.location?.city) return
      setOptions(getPanelValue(res.location))
      setTempWeather(res)
    })
  }
  const getPanelValue = (obj: Record<string, any>) => {
    return !obj.city
      ? []
      : [{ label: obj.province + obj.city + obj.county, value: obj.city }]
  }
  const onWeatherChange = (item: Weather, refresh: boolean = false) => {
    if (currentWeather.location.city == item.location?.city) return
    setCurrentWeather(item)
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const onDelete = (e: React.MouseEvent, item: Weather) => {
    e.stopPropagation()
    setWeathers(
      weathers.filter((el) => el.location?.city != item.location?.city)
    )
    if (currentWeather.location.city == item.location?.city) {
      onWeatherChange(weathers[0])
    }
    message.success('删除成功')
  }
  return (
    <ThemeProvider token={{ colorPrimary: config?.theme?.primary }}>
      <Modal
        title=""
        classNames={{
          content: `${getWeatherBg(currentWeather?.weather?.condition)} !overflow-hidden !p-0 backdrop-blur-md`,
          body: '!p-0'
        }}
        width={860}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        onCancel={() => props.onCancel()}>
        <Spin spinning={loading}>
          <div className="flex !p-4 !pt-9 !pr-0">
            <div
              className="flex-1 max-h-[60vh] pr-1 overflow-y-auto relative"
              ref={(el) => (scrollRef.current = el)}>
              <div
                className=" !text-white"
                onContextMenu={(event) => event.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault()
                  setMenuShow(false)
                }}>
                <div
                  className="absolute top-2 cursor-pointer right-1 text-white"
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
                    {new Date(
                      currentWeather?.weather?.updated_at
                    ).toLocaleString()}
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
                      <span className="flex items-center gap-1">
                        <span
                          style={{
                            transform: `rotate(${wind_direction[currentWeather?.weather?.wind_direction]}deg)`
                          }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832s-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963s.137 1.62 1.375 3.788"
                            />
                          </svg>
                        </span>
                        <span>{currentWeather?.weather?.wind_direction}</span>
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
                        最低
                        {currentWeather?.daily_forecast?.[1]?.min_temperature}°
                      </span>
                      <span>
                        最高
                        {currentWeather?.daily_forecast?.[1]?.max_temperature}°
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
                <div className="bg-white/10 p-3 !rounded-xl mb-3">
                  <div className="title mb-3 text-white/60 pl-2">
                    <FieldTimeOutlined />
                    <span className="ml-2">24小时天气预报</span>
                  </div>
                  <div className="flex flex-nowrap text-white overflow-x-auto gap-2 relative">
                    {currentWeather?.hourly_forecast?.map((el) => (
                      <div key={el.datetime} className="flex flex-col gap-2">
                        <div className="flex flex-col items-center justify-center gap-2 hover:bg-white/30 p-2 hover:!rounded-xl">
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
                          id={`${currentWeather?.location?.city}-hourly-forecast`}
                          data={currentWeather?.hourly_forecast?.map(
                            (item) => ({
                              datetime: item.datetime?.split(' ')[1],
                              temperature: item.temperature
                            })
                          )}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* dayily_forecast */}
                <div className="bg-white/10 p-3 !rounded-xl mb-3">
                  <div className="title mb-3 text-white/60 pl-2">
                    <CalendarOutlined />
                    <span className="ml-2">7天天气预报</span>
                  </div>
                  <div className="flex flex-nowrap text-white overflow-x-auto gap-[32px] relative">
                    {currentWeather?.daily_forecast?.map((el) => (
                      <div key={el.date} className="flex flex-col gap-2">
                        <div className="flex flex-col items-center justify-center gap-2 hover:bg-white/30 p-2 hover:!rounded-xl">
                          <span>{el.date?.split('-').slice(1).join('-')}</span>
                          <span>
                            {getWeek(new Date(el.date).getDay(), '周', true)}
                          </span>
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
                                __html:
                                  weatherIcon[el.night_condition] || 'sunny'
                              }}></span>
                            <span className="w-[30px]">
                              {el.night_condition}
                            </span>
                          </div>
                          <span className="flex items-center gap-2">
                            <span
                              style={{
                                transform: `rotate(${wind_direction[el.day_wind_direction]}deg)`
                              }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832s-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963s.137 1.62 1.375 3.788"
                                />
                              </svg>
                            </span>
                            {el.day_wind_power}级
                          </span>
                        </div>
                      </div>
                    ))}
                    {currentWeather?.daily_forecast?.length ? (
                      <div className="absolute left-0 bottom-[70px] w-full">
                        <DailyChart
                          id={`${currentWeather?.location?.city}-daily-forecast`}
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
                <div className="!rounded-xl">
                  <div className="title mb-3 text-white/60 pl-2">
                    <SkinOutlined />
                    <span className="ml-2">生活指数</span>
                  </div>
                  <Row
                    gutter={[8, 8]}
                    className="!bg-transparent !overflow-hidden flex flex-wrap !rounded-xl">
                    {currentWeather?.life_indices
                      ?.filter((item) => item?.name?.length < 5)
                      .map((item) => (
                        <Col span={6} key={item.key}>
                          <Card
                            className="!border-none !bg-white/10"
                            classNames={{
                              body: '!bg-transparent !overflow-hidden !rounded-xl text-white'
                            }}
                            hoverable={false}
                            key={item.key}>
                            <Tooltip title={item.description}>
                              <div className="flex flex-col items-center gap-2">
                                <span className="line-clamp-1">
                                  {item.name}
                                </span>
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
            </div>
            <div
              className={`right transition-[width] max-h-[60vh] overflow-y-auto ease-in-out duration-3000 ${!menuShow ? 'w-0 opacity-0' : 'w-[200px] p-2 pr-3 opacity-1'}`}>
              <AutoComplete
                placeholder="请输入城市"
                onSelect={addWeather}
                showSearch={true}
                onSearch={antishake(onSearch, 500)}
                className="!bg-transparent !border-white/30 !text-white !placeholder-white/60 !w-full mb-2"
                options={options}
                prefix={<SearchOutlined />}
              />
              <ReactSortable
                list={weathers}
                setList={setWeathers}
                animation={200}
                className="flex flex-col gap-2">
                {weathers.map((item, index) => (
                  <Card
                    key={item?.location?.city || index}
                    className={`${getWeatherBg(item?.weather?.condition)} !relative group !overflow-hidden cursor-pointer whitespace-nowrap !rounded-xl bg-white/20 shadow-md !border-none`}
                    classNames={{
                      body: '!bg-transparent !overflow-hidden !rounded-xl text-white !p-2'
                    }}
                    onClick={() => onWeatherChange(item)}>
                    <div className="flex items-center gap-2 justify-between">
                      <span className="line-clamp-1">
                        {item?.location?.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.weather?.condition
                              ? weatherIcon[item?.weather?.condition] || 'sunny'
                              : 'sunny'
                          }}></span>
                        {item?.weather?.condition}
                      </span>
                      <span className="w-[30px] text-right">
                        {item?.weather?.temperature}°
                      </span>
                    </div>
                    {index ? (
                      <div className="absolute hidden group-hover:block top-0 right-0 text-[#f00] cursor-pointer">
                        <MinusCircleOutlined
                          onClick={(e) => onDelete(e, item)}
                        />
                      </div>
                    ) : null}
                  </Card>
                ))}
              </ReactSortable>
            </div>
          </div>
        </Spin>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
