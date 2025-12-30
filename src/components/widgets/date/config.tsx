import { CalendarFilled, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useLocalStorageState, useResetState } from 'ahooks'
import {
  App,
  Button,
  Calendar,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  TimePicker,
  Tooltip
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
export type Job = {
  id: number
  title: string
  content: string
  date: string
  time: [start: Dayjs, end: Dayjs]
  tag?: string
  isLunar?: boolean
  repeat:
    | 'once'
    | 'daily'
    | 'workday'
    | 'workday_no_holiday'
    | 'holiday'
    | 'weekly'
    | 'monthly'
    | 'yearly'
}
const repeatMap = {
  day: '每天',
  workday: '工作日',
  workday_no_holiday: '',
  holiday: '节假日',
  weekly: '每周',
  monthly: '每月',
  yearly: '每年'
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
/**
 * 根据选中的日期获取匹配的任务列表
 *
 * @param jobs - 任务列表
 * @param selected - 选中的日期信息
 * @returns 匹配的任务列表
 */
export const getCurrentJobs = (jobs: Job[], selected: Day): Job[] => {
  return jobs.filter((el) => {
    let isJob = el.date == selected.ymd
    let sameMonth =
      dayjs(el.date).toDate().getMonth() ==
      dayjs(selected.ymd).toDate().getMonth()
    let sameDate =
      dayjs(el.date).toDate().getDate() ==
      dayjs(selected.ymd).toDate().getDate()
    let sameWeek =
      dayjs(el.date).toDate().getDay() == dayjs(selected.ymd).toDate().getDay()
    if (el.isLunar) {
      sameMonth =
        Solar.fromDate(new Date(el.date)).getLunar().getMonth() ===
        Solar.fromDate(new Date(selected.ymd)).getLunar().getMonth()
      sameDate =
        Solar.fromDate(new Date(el.date)).getLunar().getDay() ===
        Solar.fromDate(new Date(selected.ymd)).getLunar().getDay()
      sameWeek =
        Solar.fromDate(new Date(el.date)).getLunar().getWeek() ===
        Solar.fromDate(new Date(selected.ymd)).getLunar().getWeek()
    }
    if (el.repeat == 'weekly') {
      isJob = sameWeek
    } else if (el.repeat == 'daily') {
      isJob = true
    } else if (el.repeat == 'monthly') {
      isJob = sameDate
    } else if (el.repeat == 'yearly') {
      isJob = sameMonth && sameDate
    } else if (el.repeat == 'workday') {
      isJob =
        selected.holiday?.isWork() ||
        (!selected.holiday &&
          ![0, 6].includes(dayjs(selected.ymd).toDate().getDay()))
    } else if (el.repeat == 'workday_no_holiday') {
      isJob =
        !selected.isHoliday &&
        !selected.holiday &&
        ![0, 6].includes(dayjs(selected.ymd).toDate().getDay())
    } else if (el.repeat == 'holiday') {
      isJob = selected.isHoliday
    }
    let timeEnd = dayjs((el.time && el.time[1]) || new Date())
      .toDate()
      .getTime()
    return isJob && timeEnd >= new Date().getTime()
  })
}
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
                {day.customFestivals[0] ||
                  day.desc ||
                  day.jieQi ||
                  day.lunarDay}
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
  const initialFormValue: Job = {
    id: 0,
    date: selected.ymd || buildDay().ymd,
    title: '',
    content: '',
    time: [dayjs().startOf('day'), dayjs().endOf('day')],
    repeat: 'once',
    tag: null,
    isLunar: false
  }
  const initialFormValueMemo = React.useMemo(() => {
    return initialFormValue
  }, [])
  const { message } = App.useApp()
  const [form, setForm, resetForm] = useResetState<Job>(initialFormValueMemo)
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
  const getJobs = useCallback(getCurrentJobs, [state.selected])
  const getAllJobs = useCallback(() => jobs, [jobs, state.selected])
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
        <div className="flex flex-wrap gap-2">
          {getJobs(jobs, state.selected).map((f) => (
            <Tag
              color={'#179d17'}
              closable
              key={f.id}
              title={f.content}
              onClick={() => {
                setForm({
                  ...f,
                  time: f.time
                    ? [dayjs(f.time[0]), dayjs(f.time[1])]
                    : [dayjs().startOf('day'), dayjs().endOf('day')]
                })
                setOpen(true)
              }}
              onClose={() => {
                setJobs(jobs.filter((el) => el.id !== f.id))
                message.success('删除成功')
              }}>
              <span className="cursor-pointer">
                {!f.tag && <CalendarFilled />}
                <span>{f.title}</span>
                {f.tag == 'birthday' && '🎂'}
                {f.tag == 'memorial' && '🗓️'}
                {repeatMap[f.repeat] && <span>({repeatMap[f.repeat]})</span>}
              </span>
            </Tag>
          ))}
        </div>
      </div>
      <div className="lunar flex gap-4">
        <div className="flex sm:hidden gap-2">
          <span>{state.selected.ymd}</span>
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
      <div className="flex flex-col gap-2 flex-nowrap">
        {getJobs(jobs, state.selected).map((f, index) => (
          <div
            className={`job flex gap-2 flex-nowrap`}
            key={f.id}
            title={`${f.title}${f.repeat ? ' (' + repeatMap[f.repeat] + ')' : ''}`}>
            {(!f.tag || index === 0) && <CalendarFilled />}
            <span className="line-clamp-1">
              {f.title}
              {f.tag == 'birthday' && '🎂'}
              {f.tag == 'memorial' && '🗓️'}
              {repeatMap[f.repeat] && <span>({repeatMap[f.repeat]})</span>}
            </span>
            {f.content && (
              <span className="line-clamp-1 flex-1" title={f.content}>
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
          <Tooltip title="添加待办">
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
                        allowClear={false}
                        placeholder={['开始时间', '结束时间']}
                        defaultValue={form.time}
                        onChange={(value) => {
                          setForm({
                            ...form,
                            time: value
                          })
                        }}
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="form-tag">标签：</label>
                      <Space.Compact className="w-full flex-1">
                        <Select
                          defaultValue={form.isLunar}
                          style={{ width: '40%' }}
                          placeholder={'请选择'}
                          options={[
                            {
                              value: true,
                              label: '农历'
                            },
                            {
                              value: false,
                              label: '阳历'
                            }
                          ]}
                          onChange={(value) => {
                            setForm({
                              ...form,
                              isLunar: Boolean(value)
                            })
                          }}
                        />
                        <Select
                          id="form-tag"
                          allowClear
                          style={{ width: '60%' }}
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
                              repeat: value ? 'yearly' : 'once',
                              tag: value || null
                            })
                          }}
                        />
                      </Space.Compact>
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="form-repeat">重复：</label>
                      <Select<Job['repeat']>
                        className="flex-1"
                        id="form-repeat"
                        allowClear
                        disabled={!!form.tag}
                        value={form.repeat}
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
                            value: 'workday_no_holiday',
                            label: '工作日（不含补班）'
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
                          },
                          {
                            value: 'yearly',
                            label: '每年'
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
                  if (form.id) {
                    setJobs([
                      ...getAllJobs().map((el) => ({
                        ...el,
                        ...(el.id === form.id ? { ...form } : el)
                      }))
                    ])
                  } else {
                    setJobs([
                      {
                        ...form,
                        date:
                          selected.ymd ||
                          state.selected.ymd ||
                          form.time[0]?.format('YYYY-MM-DD') ||
                          dayjs().format('YYYY-MM-DD'),
                        id: form.id || Date.now()
                      },
                      ...getAllJobs()
                    ])
                  }
                  message.success('保存成功')
                },
                onOpenChange: (visible) => {
                  setOpen(isConfirm)
                  if (!visible) {
                    resetForm()
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
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(!open)
                }}></Button>
            </Popconfirm>
          </Tooltip>
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
