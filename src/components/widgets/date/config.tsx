import { CalendarFilled, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import {
  App,
  Button,
  Calendar,
  Col,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Tag,
  TimePicker
} from 'antd'
import type { CalendarProps } from 'antd'
import { createStyles } from 'antd-style'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import {
  HolidayUtil,
  Lunar,
  Solar,
  SolarMonth,
  SolarWeek
} from 'lunar-typescript'
import React, { useCallback, useEffect, useState } from 'react'

import 'dayjs/locale/zh-cn'

import { ThemeProvider } from '~layouts'
import { buildDay, Day } from '~utils'

dayjs.locale('zh-cn')

class Week {
  public days: Day[] = []
}

class Month {
  public heads: string[] = []
  public weeks: Week[] = []
}

class Holiday {
  public name: string = ''
  public month: number = 0
  public day?: number = 0
  public date?: string = ''
}
type Job = {
  id: number
  title: string
  content: string
  date: string
  time?: string
  tag?: string
  repeat: 'once' | 'day' | 'workday' | 'holiday' | 'week' | 'month'
}
const repeatMap = {
  once: '全天',
  day: '每天',
  workday: '工作日',
  holiday: '节假日',
  week: '每周',
  month: '每月'
}
const useStyle = createStyles(({ token, css, cx }) => {
  const lunar = css`
    color: ${token.colorTextTertiary};
    font-size: ${token.fontSizeSM}px;
  `
  const weekend = css`
    color: ${token.colorError};
    &.gray {
      opacity: 0.4;
    }
  `
  return {
    wrapper: css`
      width: 450px;
      border-right: 1px solid #eee;
      border-radius: ${token.borderRadiusOuter};
      padding: 5px;
    `,
    dateCell: css`
      position: relative;
      background: transparent;
      margin: auto;
      max-width: 60px;
      max-height: 60px;
      transition: background-color 300ms;
      border-radius: ${token.borderRadiusOuter}px;
      border: 1px solid transparent;
      box-sizing: border-box;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    today: css`
      border-radius: ${token.borderRadiusOuter}px;
      border: 1px solid ${token.colorPrimary};
    `,
    text: css`
      position: relative;
      z-index: 1;
    `,
    lunar,
    current: css`
      color: ${token.colorTextLightSolid};
      background: ${token.colorPrimary} !important;
      &:hover {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
      .${cx(lunar)} {
        color: ${token.colorTextLightSolid};
        opacity: 0.9;
      }
      .${cx(weekend)} {
        color: ${token.colorTextLightSolid};
      }
    `,
    monthCell: css`
      width: 120px;
      color: ${token.colorTextBase};
      border-radius: ${token.borderRadiusOuter}px;
      padding: 5px 0;
      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    monthCellCurrent: css`
      color: ${token.colorTextLightSolid};
      background: ${token.colorPrimary};
      &:hover {
        background: ${token.colorPrimary};
        opacity: 0.8;
      }
    `,
    weekend,
    bg: css`
      background: ${token.colorPrimary};
    `
  }
})
export const RenderCellCalendar = (
  selectDate: dayjs.Dayjs,
  panelDateDate: dayjs.Dayjs
) => {
  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (date, info) => {
    const getDay = useCallback(
      () => buildDay(Solar.fromDate(date.toDate())),
      [date]
    )
    const day = getDay()
    const { styles } = useStyle({ test: true })
    const isWeekend = date.day() === 6 || date.day() === 0
    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...(info.originNode as React.ReactElement<any>).props,
        className: clsx(styles.dateCell, {
          '!bg-[#FDE3E4] rounded-md is-holiday': day.isHoliday && day.isRest,
          [styles.current]: selectDate.isSame(date, 'date'),
          [styles.today]: date.isSame(dayjs(), 'date')
        }),
        children: (
          <div className={styles.text}>
            <span
              className={clsx({
                [styles.weekend]: isWeekend,
                gray: !panelDateDate.isSame(date, 'month')
              })}>
              {date.get('date')}
            </span>
            {info.type === 'date' && (
              <div className={styles.lunar + ' line-clamp-1'}>
                {day.desc || day.jieQi || day.lunarDay}
              </div>
            )}
            {day.isHoliday && (
              <span
                className={`absolute text-xs top-0 right-0 ${day.isRest ? 'text-[#f00] ' : 'text-[#0f0]'}`}>
                {day.isRest ? '休' : '班'}
              </span>
            )}
          </div>
        )
      })
    }

    if (info.type === 'month') {
      // Due to the fact that a solar month is part of the lunar month X and part of the lunar month X+1,
      // when rendering a month, always take X as the lunar month of the month
      const d2 = Lunar.fromDate(new Date(date.get('year'), date.get('month')))
      const month = d2.getMonthInChinese()
      return (
        <div
          className={clsx(styles.monthCell, {
            [styles.monthCellCurrent]: selectDate.isSame(date, 'month')
          })}>
          {date.get('month') + 1}月（{month}月）
        </div>
      )
    }
  }
  return cellRender
}
export const WidgetCalendar = (props: {
  fullscreen?: boolean
  className?: string
  onDateChange?: (value: { selected: Day }) => void
}) => {
  const { styles } = useStyle({ test: true })
  const [selectDate, setSelectDate] = React.useState<Dayjs>(() => dayjs())
  const [panelDateDate, setPanelDate] = React.useState<Dayjs>(() => dayjs())
  const [renderKey, setRenderKey] = React.useState<number>(() =>
    dayjs().toDate().getTime()
  )
  const [holidayValue, setHolidayValue] = React.useState<string>(null)
  const holidays = useCallback(() => {
    const now = Solar.fromDate(panelDateDate.toDate())
    let holidays: Holiday[] = []
    HolidayUtil.getHolidays(now.getYear()).forEach((h) => {
      const holiday = new Holiday()
      holiday.name = h.getName()
      holiday.month = parseInt(h.getTarget().substring(5, 7), 10)
      holiday.date = h.getTarget()
      const exists = holidays.some((a) => {
        return a.name == holiday.name
      })
      if (!exists) {
        holidays.push(holiday)
      }
    })
    return holidays
  }, [panelDateDate])

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    setPanelDate(value)
  }

  function onBack() {
    setSelectDate(dayjs())
    setPanelDate(dayjs())
    setRenderKey(dayjs().toDate().getTime())
    setHolidayValue(null)
    props.onDateChange({
      selected: buildDay()
    })
  }
  const onDateChange: CalendarProps<Dayjs>['onSelect'] = (
    value,
    selectInfo
  ) => {
    if (selectInfo.source === 'date') {
      setSelectDate(value)
      props.onDateChange({ selected: buildDay(Solar.fromDate(value.toDate())) })
    }
  }

  const getYearLabel = React.useCallback((year: number) => {
    const d = Lunar.fromDate(new Date(year + 1, 0))
    return `${d.getYear()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`
  }, [])

  const getMonthLabel = React.useCallback((month: number, value: Dayjs) => {
    const d = Lunar.fromDate(new Date(value.year(), month))
    const lunar = d.getMonthInChinese()
    return `${month + 1}月（${lunar}月）`
  }, [])
  return (
    <div
      className={
        styles.wrapper + ' !w-full h-full !p-4 !pb-0' + (props.className || '')
      }>
      <Calendar
        fullCellRender={RenderCellCalendar(selectDate, panelDateDate)}
        fullscreen={props.fullscreen || false}
        onPanelChange={onPanelChange}
        onSelect={onDateChange}
        key={renderKey}
        className="!border-none"
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const monthOptions = React.useMemo(() => {
            const options = []
            for (let i = 0; i < 12; i++) {
              options.push({
                label: getMonthLabel(i, value),
                value: i
              })
            }
            return options
          }, [value, getMonthLabel])

          const year = value.year()
          const month = value.month()
          const yearOptions = React.useMemo(() => {
            const options = []
            for (let i = year - 55; i < year + 75; i += 1) {
              options.push({
                label: getYearLabel(i),
                value: i
              })
            }
            return options
          }, [year, getYearLabel])
          const day = buildDay(Solar.fromDate(value.toDate()))
          return (
            <Row
              justify="start"
              gutter={8}
              style={{ paddingBottom: 8, flexWrap: 'nowrap' }}>
              <Col span={0} md={5} style={{ textAlign: 'left' }}>
                {/* <span className="line-clamp-1">
                  {day.jieQi || day.customFestivals[0]}
                  {day.dateIcon}
                </span> */}
                <Select
                  size="small"
                  style={{ width: '100%' }}
                  value={holidayValue}
                  placeholder="假期安排"
                  optionRender={({ label, value }) => {
                    return (
                      <span className="line-clamp-1">
                        {label}
                        {buildDay(Solar.fromDate(new Date(value))).dateIcon}
                      </span>
                    )
                  }}
                  labelRender={(option) => {
                    return (
                      option.label && (
                        <span className="line-clamp-1">
                          {option.label}
                          {
                            buildDay(Solar.fromDate(new Date(option.value)))
                              .dateIcon
                          }
                        </span>
                      )
                    )
                  }}
                  fieldNames={{
                    label: 'name',
                    value: 'date'
                  }}
                  options={holidays()}
                  onChange={(val) => {
                    onChange(dayjs(val))
                    setHolidayValue(val)
                  }}></Select>
              </Col>
              <Col span={8}>
                <Select
                  size="small"
                  style={{ width: '100%' }}
                  popupMatchSelectWidth={false}
                  className="my-year-select"
                  value={year}
                  options={yearOptions}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear)
                    onChange(now)
                    setHolidayValue(null)
                  }}
                />
              </Col>
              <Col span={8} md={6}>
                <Select
                  size="small"
                  style={{ width: '100%' }}
                  popupMatchSelectWidth={false}
                  value={month}
                  options={monthOptions}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth)
                    onChange(now)
                    setHolidayValue(null)
                  }}
                />
              </Col>
              {/* <Col span={0} md={4}>
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}>
                  <Radio.Button value="month">月</Radio.Button>
                  <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
              </Col> */}
              <Col span={4} style={{ textAlign: 'right' }}>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    onBack()
                  }}>
                  返回今天
                </Button>
              </Col>
            </Row>
          )
        }}
      />
    </div>
  )
}
export const WidgetLunar = ({ selected }: { selected: Day }) => {
  const now = Solar.fromDate(new Date())
  const { styles } = useStyle({ test: true })
  const [jobs, setJobs] = useLocalStorageState<Job[]>('jobs', {
    defaultValue: [],
    listenStorageChange: true
  })
  const { message } = App.useApp()
  const [form, setForm] = useState<Job>({
    id: Date.now(),
    date: selected.ymd || buildDay().ymd,
    title: '',
    content: '',
    time: '',
    repeat: 'once',
    tag: ''
  })
  let isConfirm = false
  const [open, setOpen] = useState(false)
  const getHolidayOrFestival = useCallback(() => {
    return {
      isWork: selected.holiday?.isWork() || false,
      dateName:
        selected.jieQi ||
        selected.customFestivals[0] ||
        selected.holiday?.getName() ||
        '',
      dateIcon:
        selected.dateIcons[selected.jieQi] ||
        selected.dateIcons[selected.customFestivals[0]] ||
        selected.dateIcons[selected.holiday?.getName()] ||
        ''
    }
  }, [selected])
  const { dateName, dateIcon, isWork } = getHolidayOrFestival()
  const [state, setState] = useState({
    year: now.getYear(),
    month: now.getMonth(),
    weekStart: 1,
    selected: selected || new Day(),
    data: new Month(),
    dateName,
    dateIcon,
    isWork,
    holidayMonth: 0
  })

  function render() {
    const month = new Month()
    const weeks: SolarWeek[] = []
    const solarWeeks = SolarMonth.fromYm(
      parseInt(state.year + '', 10),
      parseInt(state.month + '', 10)
    ).getWeeks(state.weekStart)
    solarWeeks.forEach((w) => {
      weeks.push(w)
    })
    while (weeks.length < 6) {
      weeks.push(weeks[weeks.length - 1].next(1, false))
    }
    weeks.forEach((w) => {
      const week = new Week()
      const heads: string[] = []
      w.getDays().forEach((d) => {
        heads.push(d.getWeekInChinese())
        let day = buildDay(d)
        day.isSelected = d.toYmd() == state.selected.ymd
        if (day.isToday && state.selected.day === 0) {
          state.selected = day
        }
        week.days.push(day)
      })
      month.heads = heads
      month.weeks.push(week)
    })
    setState({ ...state, data: month })
    setState({
      ...state,
      isWork,
      dateName,
      dateIcon
    })
  }
  useEffect(() => {
    render()
  }, [state.month, state.selected, state.holidayMonth])
  useEffect(() => {
    setState({ ...state, selected })
  }, [selected])
  useEffect(() => {
    render()
  }, [])
  return (
    <App
      className={`w-full h-full flex flex-col gap-2 !p-4 side text-white ${styles.bg}`}>
      <div className="ymd text-xl hidden sm:block">{state.selected.ymd}</div>
      <div className="day gap-2 text-[64px] sm:block">
        <span className="hidden sm:inline-block mr-2">
          {state.selected.day}
        </span>
        {(state.selected.isHoliday ||
          state.selected.jieQi ||
          !!state.selected.customFestivals.length) && (
          <span className="text-[24px]">
            {state.isWork &&
            state.selected.isHoliday &&
            !state.selected.customFestivals.length ? (
              <Tag color={'#179d17'}>{state.dateName}补班</Tag>
            ) : (
              state.dateName || ''
            )}
            {(!state.isWork && state.dateIcon) || state.selected.dateIcon || ''}
          </span>
        )}
        {jobs
          .filter((el) => el.date == state.selected.ymd)
          .slice(0, 1)
          .map((f) => (
            <Tag
              color={'#179d17'}
              closable
              key={f.id}
              title={f.content}
              onClick={() => {
                setForm(f)
                setOpen(true)
              }}
              onClose={() => {
                setJobs(jobs.filter((el) => el.id !== f.id))
                message.success('删除成功')
              }}>
              {!f.tag && <CalendarFilled />}
              <span>{f.title}</span>
              {f.tag == 'birthday' && '🎂'}
              {f.tag == 'anniversary' && <CalendarFilled />}
              {f.tag == 'memorial' && '🗓️'}({repeatMap[f.repeat || 'once']})
            </Tag>
          ))}
      </div>
      <div className="lunar flex gap-4">
        <div>
          农历 {state.selected.lunarMonth}月{state.selected.lunarDay}
        </div>
      </div>
      <div className="flex gap-4">
        <span>
          {state.selected.yearGanZhi}年 {state.selected.yearShengXiao}
        </span>
        <span>
          {state.selected.monthGanZhi}月 {state.selected.dayGanZhi}日
        </span>
      </div>
      {!!state.selected.festivals.length && (
        <div className="flex gap-2 flex-nowrap items-center">
          {state.selected.festivals.map((f) => (
            <div className={`festival !line-clamp-1`} key={f} title={f}>
              <span>{f}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2 flex-nowrap items-center">
        {jobs
          .filter((el) => el.date == state.selected.ymd)
          .map((f, index) => (
            <div className={`job flex gap-2`} key={f.id} title={f.title}>
              {(!f.tag || index === 0) && <CalendarFilled />}
              <span>
                {f.title}
                {f.tag == 'birthday' && '🎂'}
                {f.tag == 'anniversary' && <CalendarFilled />}
                {f.tag == 'memorial' && '🗓️'}({repeatMap[f.repeat || 'once']})
              </span>
              {f.content && (
                <span className="line-clamp-1" title={f.content}>
                  [{f.content}]
                </span>
              )}
            </div>
          ))}
      </div>
      <div className="yiji flex flex-col gap-2">
        <div className="yi flex gap-2 flex-wrap">
          <Tag color="#179d17">宜</Tag>
          {state.selected.yi.map((f) => (
            <div key={f}>{f}</div>
          ))}
        </div>
        <div className="divider" />
        <div className="ji flex gap-2 flex-wrap">
          <Tag color="#f50">忌</Tag>
          {state.selected.ji.map((f) => (
            <div key={f}>{f}</div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-2">
        <App>
          <Popconfirm
            {...{
              title: form.id ? '编辑待办事项' : '新增待办事项',
              okText: '确定',
              okType: 'danger',
              placement: 'topRight',
              open: open,
              destroyOnHidden: true,
              icon: <PlusOutlined style={{ color: 'green' }} />,
              description: (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <label htmlFor="form-title">标题：</label>
                    <Input
                      id="form-title"
                      className="flex-1"
                      placeholder="请输入标题"
                      defaultValue={form.title}
                      onChange={(e) => {
                        setForm({ ...form, title: e.target.value })
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="form-content">内容：</label>
                    <Input
                      className="flex-1"
                      id="form-content"
                      defaultValue={form.content}
                      placeholder="请输入内容"
                      onChange={(e) => {
                        setForm({ ...form, content: e.target.value })
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="form-time">时间：</label>
                    <TimePicker.RangePicker
                      className="flex-1"
                      id="form-time"
                      allowClear
                      placeholder={['开始时间', '结束时间']}
                      onChange={(value) => {
                        setForm({
                          ...form,
                          time:
                            value
                              ?.map((v) => v?.format('HH:mm') || '')
                              .join(' - ') || ''
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="form-repeat">重复：</label>
                    <Select<Job['repeat']>
                      className="flex-1"
                      id="form-repeat"
                      allowClear
                      defaultValue={form.repeat}
                      placeholder={'重复类型'}
                      options={[
                        {
                          value: 'once',
                          label: '仅一次'
                        },
                        {
                          value: 'daily',
                          label: '每天'
                        },
                        {
                          value: 'workday',
                          label: '工作日'
                        },
                        {
                          value: 'holiday',
                          label: '节假日'
                        },
                        {
                          value: 'weekly',
                          label: '每周'
                        },
                        {
                          value: 'monthly',
                          label: '每月'
                        }
                      ]}
                      onChange={(value) => {
                        setForm({
                          ...form,
                          repeat: value || 'once'
                        })
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="form-tag">标签：</label>
                    <Select
                      className="flex-1"
                      id="form-tag"
                      allowClear
                      defaultValue={form.tag}
                      placeholder={'选择标签'}
                      options={[
                        {
                          value: 'birthday',
                          label: '生日'
                        },
                        {
                          value: 'anniversary',
                          label: '周年'
                        },
                        {
                          value: 'memorial',
                          label: '纪念日'
                        }
                      ]}
                      onChange={(value) => {
                        setForm({
                          ...form,
                          tag: value || ''
                        })
                      }}
                    />
                  </div>
                </div>
              ),
              onConfirm: (e) => {
                e.stopPropagation()
                isConfirm = true
                if (!form.title || !form.content) {
                  message.error('请输入标题和内容')
                  setOpen(true)
                  setTimeout(() => {
                    isConfirm = false
                  }, 100)
                  return
                }
                isConfirm = false
                setOpen(false)
                setJobs([
                  {
                    ...form,
                    date: selected.ymd || buildDay().ymd,
                    id: form.id || Date.now()
                  },
                  ...jobs
                ])
                message.success('保存成功')
              },
              onOpenChange: (visible) => {
                setOpen(isConfirm)
                if (!visible) {
                  setForm({
                    ...form,
                    title: '',
                    content: '',
                    date: '',
                    time: '',
                    tag: '',
                    repeat: 'once'
                  })
                }
              },
              onCancel: () => {
                setOpen(false)
              }
            }}>
            <Button
              color="green"
              shape="round"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpen(!open)
              }}></Button>
          </Popconfirm>
        </App>
      </div>
    </App>
  )
}
function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [state, setState] = useState({
    selected: new Day()
  })
  const onSelect = ({ selected }: { selected: Day }) => {
    setState({ ...state, selected })
  }
  return (
    <ThemeProvider>
      <Modal
        title=""
        classNames={{
          content: '!overflow-hidden !box-radius-md !p-0'
        }}
        width={880}
        centered
        open={props.visible}
        footer={null}
        closeIcon={<CloseOutlined className="text-white" />}
        onCancel={() => props.onCancel()}>
        <Row justify="center" gutter={0} style={{ padding: 0 }}>
          <Col span={24} sm={16}>
            <WidgetCalendar onDateChange={onSelect} />
          </Col>
          <Col span={24} sm={8}>
            <WidgetLunar selected={state.selected} />
          </Col>
        </Row>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
