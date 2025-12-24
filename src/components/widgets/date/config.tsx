import { CloseOutlined } from '@ant-design/icons'
import { Badge, Calendar, Col, Modal, Radio, Row, Select, Tag } from 'antd'
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
import React, { useEffect, useState } from 'react'

import 'dayjs/locale/zh-cn'

import { ThemeProvider } from '~layouts'

dayjs.locale('zh-cn')
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
      &:before {
        content: '';
        position: absolute;
        inset-inline-start: 0;
        inset-inline-end: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        max-width: 40px;
        max-height: 40px;
        background: transparent;
        transition: background-color 300ms;
        border-radius: ${token.borderRadiusOuter}px;
        border: 1px solid transparent;
        box-sizing: border-box;
      }
      &:hover:before {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
    today: css`
      &:before {
        border: 1px solid ${token.colorPrimary};
      }
    `,
    text: css`
      position: relative;
      z-index: 1;
    `,
    lunar,
    current: css`
      color: ${token.colorTextLightSolid};
      &:before {
        background: ${token.colorPrimary};
      }
      &:hover:before {
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
export const WidgetCalendar: React.FC = (props: {
  fullscreen?: boolean
  className?: string
  onDateChange?: (value: Dayjs) => void
}) => {
  const { styles } = useStyle({ test: true })

  const [selectDate, setSelectDate] = React.useState<Dayjs>(() => dayjs())
  const [panelDateDate, setPanelDate] = React.useState<Dayjs>(() => dayjs())

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    // console.log(value.format('YYYY-MM-DD'), mode)
    setPanelDate(value)
  }

  const onDateChange: CalendarProps<Dayjs>['onSelect'] = (
    value,
    selectInfo
  ) => {
    if (selectInfo.source === 'date') {
      setSelectDate(value)
      props.onDateChange(value)
    }
  }

  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (date, info) => {
    const d = Lunar.fromDate(date.toDate())
    const lunar = d.getDayInChinese()
    const solarTerm = d.getJieQi()
    const isWeekend = date.day() === 6 || date.day() === 0
    const h = HolidayUtil.getHoliday(
      date.get('year'),
      date.get('month') + 1,
      date.get('date')
    )
    const displayHoliday =
      h?.getTarget() === h?.getDay() ? h?.getName() : undefined
    const displayFestivals = d.getFestivals().concat(d.getOtherFestivals())
    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...(info.originNode as React.ReactElement<any>).props,
        className: clsx(styles.dateCell, {
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
              <div className={styles.lunar}>
                {displayFestivals.join('、') ||
                  displayHoliday ||
                  solarTerm ||
                  lunar}
              </div>
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
        styles.wrapper + ' !w-full h-full !p-4' + (props.className || '')
      }>
      <Calendar
        fullCellRender={cellRender}
        fullscreen={props.fullscreen || false}
        onPanelChange={onPanelChange}
        onSelect={onDateChange}
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
            <Row justify="start" gutter={8} style={{ padding: 8 }}>
              <Col>
                <Select
                  size="small"
                  popupMatchSelectWidth={false}
                  className="my-year-select"
                  value={year}
                  options={yearOptions}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear)
                    onChange(now)
                  }}
                />
              </Col>
              <Col>
                <Select
                  size="small"
                  popupMatchSelectWidth={false}
                  value={month}
                  options={monthOptions}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth)
                    onChange(now)
                  }}
                />
              </Col>
              <Col>
                <Radio.Group
                  size="small"
                  onChange={(e) => onTypeChange(e.target.value)}
                  value={type}>
                  <Radio.Button value="month">月</Radio.Button>
                  <Radio.Button value="year">年</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          )
        }}
      />
    </div>
  )
}
export const WidgetLunar: React.FC = () => {
  const now = Solar.fromDate(new Date())
  const { styles } = useStyle({ test: true })
  class Day {
    public month: number = 0
    public day: number = 0
    public lunarDay: string = ''
    public lunarMonth: string = ''
    public yearGanZhi: string = ''
    public yearShengXiao: string = ''
    public monthGanZhi: string = ''
    public dayGanZhi: string = ''
    public ymd: string = ''
    public desc: string = ''
    public isToday: boolean = false
    public isSelected: boolean = false
    public isRest: boolean = false
    public isHoliday: boolean = false
    public festivals: string[] = []
    public yi: string[] = []
    public ji: string[] = []
  }

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
  }

  const [state, setState] = useState({
    year: now.getYear(),
    month: now.getMonth(),
    weekStart: 1,
    selected: new Day(),
    data: new Month(),
    holidays: new Array<Holiday>(),
    holidayMonth: 0
  })
  function buildDay(d: Solar) {
    const ymd = d.toYmd()
    const lunar = d.getLunar()
    const day = new Day()
    day.month = d.getMonth()
    day.day = d.getDay()
    day.lunarMonth = lunar.getMonthInChinese()
    day.lunarDay = lunar.getDayInChinese()
    day.yearGanZhi = lunar.getYearInGanZhi()
    day.yearShengXiao = lunar.getYearShengXiao()
    day.monthGanZhi = lunar.getMonthInGanZhi()
    day.dayGanZhi = lunar.getDayInGanZhi()
    day.ymd = ymd
    day.isToday = ymd == now.toYmd()
    day.isSelected = ymd == state.selected.ymd
    if (day.isToday && state.selected.day === 0) {
      state.selected = day
    }
    const solarFestivals = d.getFestivals()
    solarFestivals.forEach((f) => {
      day.festivals.push(f)
    })
    d.getOtherFestivals().forEach((f) => {
      day.festivals.push(f)
    })
    lunar.getFestivals().forEach((f) => {
      day.festivals.push(f)
    })
    lunar.getOtherFestivals().forEach((f) => {
      day.festivals.push(f)
    })
    let rest = false
    if (d.getWeek() === 6 || d.getWeek() === 0) {
      rest = true
    }
    const holiday = HolidayUtil.getHoliday(ymd)
    if (holiday) {
      rest = !holiday.isWork()
    }
    day.isHoliday = !!holiday
    day.isRest = rest
    day.yi = lunar.getDayYi()
    day.ji = lunar.getDayJi()
    let desc = lunar.getDayInChinese()
    const jq = lunar.getJieQi()
    if (jq) {
      desc = jq
    } else if (lunar.getDay() === 1) {
      desc = lunar.getMonthInChinese() + '月'
    } else if (solarFestivals.length > 0) {
      const f = solarFestivals[0]
      if (f.length < 4) {
        desc = f
      }
    }
    day.desc = desc
    return day
  }

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
        week.days.push(buildDay(d))
      })
      month.heads = heads
      month.weeks.push(week)
    })
    setState({ ...state, data: month })
    const holidays: Holiday[] = []
    HolidayUtil.getHolidays(state.year).forEach((h) => {
      const holiday = new Holiday()
      holiday.name = h.getName()
      holiday.month = parseInt(h.getTarget().substring(5, 7), 10)
      const exists = holidays.some((a) => {
        return a.name == holiday.name
      })
      if (!exists) {
        holidays.push(holiday)
      }
    })
    setState({ ...state, holidays })
  }

  function onSelect(day: Day) {
    setState({ ...state, selected: day })
  }

  function onBack() {
    setState({
      ...state,
      holidayMonth: 0,
      year: now.getYear(),
      month: now.getMonth(),
      selected: buildDay(now)
    })
  }
  useEffect(() => {
    render()
  }, [state.month])

  useEffect(() => {
    render()
  }, [state.selected])
  useEffect(() => {
    render()
  }, [state.holidayMonth])
  useEffect(() => {
    render()
  }, [])
  return (
    <div
      className={`w-full h-full flex flex-col gap-2 !p-8 side text-white ${styles.bg}`}>
      <div className="ymd text-xl">{state.selected.ymd}</div>
      <div className="day text-[64px]">{state.selected.day}</div>
      <div className="lunar flex gap-4">
        <div>
          农历{state.selected.lunarMonth}月{state.selected.lunarDay}
        </div>
        <div>
          {state.selected.yearGanZhi}年 {state.selected.yearShengXiao}
        </div>
      </div>
      <div>
        {state.selected.monthGanZhi}月 {state.selected.dayGanZhi}日
      </div>
      {state.selected.festivals.map((f) => (
        <div className="festival" key={f}>
          {f}
        </div>
      ))}
      <div className="yiji flex flex-col gap-2">
        <div className="yi flex gap-2 flex-wrap">
          <Tag color="#87d068">宜</Tag>
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
    </div>
  )
}
function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [state, setState] = useState({})
  return (
    <ThemeProvider>
      <Modal
        title=""
        classNames={{
          content: '!overflow-hidden !box-radius-md !p-0'
        }}
        width={800}
        open={props.visible}
        footer={null}
        closeIcon={<CloseOutlined className="text-white" />}
        onCancel={() => props.onCancel()}>
        <Row justify="center" gutter={[0, 8]} style={{ padding: 0 }}>
          <Col span={24} md={16}>
            <WidgetCalendar />
          </Col>
          <Col span={24} md={8}>
            <WidgetLunar />
          </Col>
        </Row>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
