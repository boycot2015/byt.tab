import { useUpdateEffect } from 'ahooks'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'

import EchartsInit from '~components/Echarts'

const colors = {
  特单卖盘: '#006926',
  大单卖盘: 'rgba(4, 179, 51, 1)',
  中单卖盘: 'rgba(54, 242, 73, 1)',
  小单卖盘: 'rgba(161, 255, 150, 1)',
  特单买盘: '#800001',
  大单买盘: 'rgba(219, 17, 17, 1)',
  中单买盘: 'rgba(240, 95, 95, 1)',
  小单买盘: 'rgba(237, 145, 145, 1)'
}
const baseOptions = {
  useUTC: false,
  textStyle: {
    fontFamily: 'CangErYuYang, OPPOSans, KaiTi, serif'
  },
  grid: {
    show: true,
    backgroundColor: 'transparent',
    opacity: 0.3,
    borderWidth: '0',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0'
  },
  tooltip: {
    show: false
  },
  legend: {
    show: false
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    position: 'top',
    offset: 120,
    zlevel: 100,
    axisLine: {
      show: true
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
      interval: 0,
      formatter: ['{a|{value}}'].join('\n'),
      rich: {
        a: {
          // color: 'white',
          fontSize: 14
        }
      }
    },
    nameTextStyle: {},
    data: ['25日', '26日', '27日', '28日', '29日', '30日', '31日']
  },
  yAxis: {
    type: 'value',
    show: false,
    axisLabel: {
      formatter: '{value} %',
      color: 'white'
    },
    min: -10,
    max: 10,
    interval: 1
  }
}
// export const weather_icon_url = 'https://d.scggqx.com/forecast/img'
const DailyKChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const filterData = [...(props.data?.list || [])]
  const covert = (item = {} as any) => {
    return Number(
      (
        ((item.成交价 - props.data.data.昨收) / props.data.data.昨收) *
        100
      ).toFixed(2)
    )
  }
  function generateData(arr) {
    let seriesData = []
    var startTime = new Date().setHours(9, 30, 0, 0)
    let breakStart = new Date().setHours(11, 30, 0, 0)
    let breakEnd = new Date().setHours(13, 0, 0, 0)
    let endTime = new Date().setHours(15, 0, 0, 0)
    arr.map((item) => {
      let time = new Date().setHours(
        Number(item.时间.split(':')[0]),
        Number(item.时间.split(':')[1]),
        Number(item.时间.split(':')[2]),
        0
      )
      if (
        (time >= startTime && time <= breakStart) ||
        (time >= breakEnd && time <= endTime)
      ) {
        seriesData.push([new Date(time).getTime(), covert(item)])
      }
    })
    return {
      seriesData: seriesData,
      breakStart: breakStart,
      breakEnd: breakEnd
    }
  }
  const _data = generateData(filterData)
  // console.log(new Date(_data.seriesData[0][0]), '_data')

  const [echarts, setEcharts] = useState({
    ...baseOptions,
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      interval: 1000 * 60 * 30,
      axisLabel: {
        showMinLabel: true,
        showMaxLabel: true,
        formatter: (value, index, extra) => {
          if (!extra || !extra.break) {
            // The third parameter is `useUTC: true`.
            return dayjs(value).format('HH:mm')
          }
          // Only render the label on break start, but not on break end.
          if (extra.break.type === 'start') {
            return (
              dayjs(extra.break.start).format('HH:mm') +
              '/' +
              dayjs(extra.break.end).format('HH:mm')
            )
          }
          return ''
        }
      },
      breakLabelLayout: {
        // Disable auto move of break labels if overlapping,
        // and use `axisLabel.formatter` to control the label display.
        moveOverlap: false
      },
      breaks: [
        {
          start: _data.breakStart,
          end: _data.breakEnd,
          gap: 0
        }
      ],
      breakArea: {
        expandOnClick: false,
        zigzagAmplitude: 0,
        zigzagZ: 200
      }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        name: '涨跌幅',
        type: 'line',
        data: [],
        symbolSize: 0,
        smooth: false
      }
    ]
  } as any)
  const id = props.id || 'stock-echarts-hours'
  const [hourilyEcharts, setHourilyEcharts] = useState<any>(null)
  useUpdateEffect(() => {
    if (props.data && props.data.data) {
      if (hourilyEcharts && document.getElementById(id)) {
        setEcharts({
          ...echarts,
          visualMap: [
            {
              show: false,
              dimension: 1, // 按Y轴值分段
              pieces: [
                { lt: covert(props.data.data) || 0, color: 'green' },
                { value: 0, color: 'white' },
                { value: 10, color: 'red' },
                { gte: 9.96, color: 'red' },
                { value: -10, color: 'green' },
                { lte: -9.96, color: 'green' },
                { gt: (covert(props.data.data) || 0) + 0.01, color: 'red' }
              ]
            }
          ],
          xAxis: {
            ...echarts.xAxis,
            data:
              filterData?.map((item: any) =>
                new Date().setHours(
                  Number(item.时间.split(':')[0]),
                  Number(item.时间.split(':')[1]),
                  Number(item.时间.split(':')[2]),
                  0
                )
              ) || []
          },
          yAxis: {
            ...echarts.yAxis,
            min: Math.min(...(filterData?.map(covert) || [])),
            max: Math.max(...(filterData?.map(covert) || []))
          },
          series: [
            {
              ...echarts.series[0],
              data: _data.seriesData || []
            }
          ]
        })
        hourilyEcharts?.setOption(echarts, true, true)
      } else {
        setHourilyEcharts(EchartsInit(chartRef.current, echarts))
        hourilyEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      hourilyEcharts?.resize()
    })
    const observer = new ResizeObserver(() => hourilyEcharts?.resize())
    observer.observe(chartRef?.current)
    return () => {
      observer.disconnect()
    }
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[140px] w-full"></div>
}
const TradingChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const [echarts, setEcharts] = useState<any>({
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/> {c} 手（{d}%）',
      backgroundColor: '#002260',
      borderColor: '#0984F3',
      borderWidth: 1,
      padding: [5, 15],
      textStyle: {
        color: '#fff'
      }
    },
    // visualMap: {
    //   show: false,
    //   min: 0,
    //   max: 6000,
    //   inRange: {
    //     colorLightness: [0.3, 1]
    //   }
    // },
    legend: {
      show: true,
      orient: 'vertical',
      bottom: 0,
      itemWidth: 70,
      itemGap: 1,
      itemHeight: 12,
      formatter: function (name) {
        return name.substring(0, 2)
      }
    },
    series: [
      {
        type: 'pie',
        name: '交易',
        data: [],
        radius: '70%',
        center: ['50%', '22%'],
        itemStyle: {
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
          // length: 10,
          // length2: 10
        }
      }
    ]
  })
  const id = props.id || 'stock-echarts-pie'
  const [pieEcharts, setPieEcharts] = useState<any>(null)
  useUpdateEffect(() => {
    if (props.data && props.data.list && props.data.list.length > 0) {
      if (pieEcharts && document.getElementById(id)) {
        setEcharts({
          ...echarts,
          series: [
            {
              ...echarts.series[0],
              itemStyle: {
                ...echarts.series[0].itemStyle,
                color: (params) => colors[params.name] || 'green'
              },
              data: props.data?.list || []
            }
          ]
        })
        pieEcharts?.setOption(echarts, true, true)
      } else {
        setPieEcharts(EchartsInit(chartRef.current, echarts))
        pieEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      pieEcharts?.resize()
    })
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[190px] w-full"></div>
}
const DailyVolChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const [dailyEcharts, setDailyEcharts] = useState<any>(null)
  const [echarts, setEcharts] = useState({
    ...baseOptions,
    tooltip: {
      show: true,
      formatter: '{b}<br />{a}{c}万元',
      trigger: 'axis'
    },
    xAxis: {
      ...baseOptions.xAxis,
      data: props.data?.map((item: any) => item.时间) || []
    },
    yAxis: {
      ...baseOptions.yAxis
    },
    series: [
      {
        name: '成交量',
        type: 'bar',
        data: props.data?.map((item: any) => item.手数) || [],
        // color: (params) =>
        //   params.name
        //     ? params.name.includes('买')
        //       ? 'red'
        //       : 'green'
        //     : 'white',
        label: {
          show: false,
          position: 'top',
          color: 'white',
          formatter: '{c}万元'
        },
        lineStyle: {
          width: 1,
          color: 'white'
        },
        areaStyle: {
          opacity: 1,
          color: 'transparent'
        }
      }
    ]
  })
  const id = props.id || 'stock-echarts-daily-vol'
  useUpdateEffect(() => {
    if (props.data && props.data.length) {
      const options = {
        ...echarts,
        xAxis: {
          ...echarts.xAxis,
          data: props.data?.map((item: any) => item.时间) || []
        },
        yAxis: {
          ...echarts.yAxis,
          min: Math.min(...(props.data?.map((item: any) => item.手数) || [])),
          max: Math.max(...(props.data?.map((item: any) => item.手数) || []))
        },
        series: [
          {
            ...echarts.series[0],
            itemStyle: {
              color: (params) => {
                return params.data
                  ? params.data.kind
                    ? params.data.kind.includes('买')
                      ? 'red'
                      : 'green'
                    : 'white'
                  : 'white'
              }
            },
            data:
              props.data?.map((item: any) => ({
                value: item.手数,
                name: item.时间,
                kind: item.买卖盘性质
              })) || []
          }
        ]
      }
      if (dailyEcharts && document.getElementById(id)) {
        setEcharts(options)
        dailyEcharts.setOption(echarts, true, true)
      } else {
        setDailyEcharts(EchartsInit(chartRef.current, options))
        dailyEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      dailyEcharts?.resize()
    })
    const observer = new ResizeObserver(() => dailyEcharts?.resize())
    observer.observe(chartRef?.current)
    return () => {
      observer.disconnect()
    }
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[80px] w-full"></div>
}
export { DailyKChart, TradingChart, DailyVolChart }
