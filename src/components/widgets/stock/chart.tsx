import React, { useEffect, useRef, useState } from 'react'

import EchartsInit from '~components/Echarts'

const baseOptions = {
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
  xAxis: [
    // 日期
    {
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
    }
  ],
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
export const weather_icon_url = 'https://d.scggqx.com/forecast/img'
const HoursChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const filterData =
    props.data?.list
      ?.map((item: any) => {
        item.时间 = item.时间.split(':').pop()
        return item
      })
      .filter(
        (item: any, index: number, self: any[]) =>
          self.findLastIndex((i: any) => i.时间 === item.时间) === index
      ) || []
  const [weather_echarts, setWeatherEcharts] = useState({
    ...baseOptions,
    xAxis: [
      {
        ...baseOptions.xAxis[0],
        data: filterData?.map((item: any) => item.时间) || []
      }
    ],
    yAxis: {
      ...baseOptions.yAxis,
      min: -10,
      max: 10
    },
    series: [
      {
        name: '涨跌幅',
        type: 'line',
        data: filterData?.map((item: any) => item.涨跌幅) || [],
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        smooth: false,
        itemStyle: {
          color: (params) =>
            params.value > 0 ? 'red' : params.value < 0 ? 'green' : 'white'
        },
        label: {
          show: false,
          position: 'top',
          color: 'white',
          formatter: '{c}%'
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
  const id = props.id || 'stock-echarts-hours'
  const [hourilyEcharts, setHourilyEcharts] = useState<any>(null)
  useEffect(() => {
    if (hourilyEcharts && document.getElementById(id)) {
      setWeatherEcharts({
        ...weather_echarts,
        xAxis: [
          {
            ...weather_echarts.xAxis[0],
            data: filterData?.map((item: any) => item.时间) || []
          }
        ],
        yAxis: {
          ...weather_echarts.yAxis,
          min: Math.min(...(filterData?.map((item: any) => item.成交价) || [])),
          max: Math.max(...(filterData?.map((item: any) => item.成交价) || []))
        },
        series: [
          {
            ...weather_echarts.series[0],
            data: filterData?.map((item: any) => item.成交价) || []
          }
        ]
      })
      hourilyEcharts?.setOption(weather_echarts, true, true)
    } else {
      setHourilyEcharts(EchartsInit(chartRef.current, weather_echarts))
      hourilyEcharts?.resize()
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
  return <div id={id} ref={chartRef} className="!h-[100px] w-full"></div>
}
const DailyChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const [dailyEcharts, setDailyEcharts] = useState<any>(null)
  const [weather_echarts, setWeatherEcharts] = useState({
    ...baseOptions,
    xAxis: [
      {
        ...baseOptions.xAxis[0],
        data: props.data?.map((item: any) => item.date) || []
      }
    ],
    yAxis: {
      ...baseOptions.yAxis,
      min: Math.min(...(props.data?.map((item: any) => item.成交价) || [])),
      max: Math.max(...(props.data?.map((item: any) => item.成交价) || []))
    },
    series: [
      {
        name: '成交价',
        type: 'line',
        data: props.data?.map((item: any) => item.成交价) || [],
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: true,
        smooth: true,
        itemStyle: {
          color: '#fff'
        },
        label: {
          show: true,
          position: 'top',
          color: 'white',
          formatter: '{c}元'
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
  const id = props.id || 'weather-echarts-daily'
  useEffect(() => {
    if (!dailyEcharts || !document.getElementById(id)) {
      setDailyEcharts(EchartsInit(chartRef.current, weather_echarts))
    } else {
      setWeatherEcharts({
        ...weather_echarts,
        xAxis: [
          {
            ...weather_echarts.xAxis[0],
            data: props.data?.map((item: any) => item.date) || []
          }
        ],
        yAxis: {
          ...weather_echarts.yAxis,
          min: Math.min(...(props.data?.map((item: any) => item.成交价) || [])),
          max: Math.max(...(props.data?.map((item: any) => item.成交价) || []))
        },
        series: [
          {
            ...weather_echarts.series[0],
            data: props.data?.map((item: any) => item.成交价) || []
          },
          {
            ...weather_echarts.series[1],
            data: props.data?.map((item: any) => item.成交价) || []
          }
        ]
      })
      dailyEcharts.setOption(weather_echarts, true, true)
      dailyEcharts?.resize()
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
  return (
    <div
      id={id}
      ref={chartRef}
      className="!h-[120px] w-full min-w-[800px]"></div>
  )
}
export { HoursChart, DailyChart }
