import React, { useEffect, useState } from 'react'

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
    bottom: '50'
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
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
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
      formatter: '{value} °C',
      color: 'white'
    },
    min: -50,
    max: 50,
    interval: 1
  }
}
export const weather_icon_url = 'https://d.scggqx.com/forecast/img'
const HoursChart = (props: Record<string, any>) => {
  const [weather_echarts, setWeatherEcharts] = useState({
    ...baseOptions,
    xAxis: [
      {
        ...baseOptions.xAxis[0],
        data: props.data?.map((item: any) => item.datetime) || []
      }
    ],
    yAxis: {
      ...baseOptions.yAxis,
      min: Math.min(
        ...(props.data?.map((item: any) => item.temperature) || [])
      ),
      max: Math.max(...(props.data?.map((item: any) => item.temperature) || []))
    },
    series: [
      {
        name: '气温',
        type: 'line',
        data: props.data?.map((item: any) => item.temperature) || [],
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
          formatter: '{c} °C'
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
  const [hourilyEcharts, setHourilyEcharts] = useState<any>(null)
  useEffect(() => {
    if (hourilyEcharts && document.getElementById('weather-echarts-hours')) {
      setWeatherEcharts({
        ...weather_echarts,
        xAxis: [
          {
            ...weather_echarts.xAxis[0],
            data: props.data?.map((item: any) => item.datetime) || []
          }
        ],
        yAxis: {
          ...weather_echarts.yAxis,
          min: Math.min(
            ...(props.data?.map((item: any) => item.temperature) || [])
          ),
          max: Math.max(
            ...(props.data?.map((item: any) => item.temperature) || [])
          )
        },
        series: [
          {
            ...weather_echarts.series[0],
            data: props.data?.map((item: any) => item.temperature) || []
          }
        ]
      })
      hourilyEcharts?.setOption(weather_echarts, true, true)
    } else {
      setHourilyEcharts(
        EchartsInit(
          document.getElementById('weather-echarts-hours') as HTMLElement,
          weather_echarts
        )
      )
      hourilyEcharts?.resize()
    }
    window.addEventListener('resize', () => {
      hourilyEcharts?.resize()
    })
  }, [props.data])
  return (
    <div id="weather-echarts-hours" className="!h-[100px] !w-[2960px]"></div>
  )
}
const DailyChart = (props: Record<string, any>) => {
  // console.log(props.data, 'props.data')
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
      min: Math.min(
        ...(props.data?.map((item: any) => item.min_temperature) || [])
      ),
      max: Math.max(
        ...(props.data?.map((item: any) => item.max_temperature) || [])
      )
    },
    series: [
      {
        name: '最高气温',
        type: 'line',
        data: props.data?.map((item: any) => item.max_temperature) || [],
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
          formatter: '{c} °C'
        },
        lineStyle: {
          width: 1,
          color: 'white'
        },
        areaStyle: {
          opacity: 1,
          color: 'transparent'
        }
      },
      {
        name: '最低气温',
        type: 'line',
        data: props.data?.map((item: any) => item.min_temperature) || [],
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: true,
        smooth: true,
        itemStyle: {
          color: 'white'
        },
        label: {
          show: true,
          position: 'bottom',
          color: 'white',
          formatter: '{c} °C'
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
  useEffect(() => {
    if (!dailyEcharts || !document.getElementById('weather-echarts-daily')) {
      setDailyEcharts(
        EchartsInit(
          document.getElementById('weather-echarts-daily') as HTMLElement,
          weather_echarts
        )
      )
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
          min: Math.min(
            ...(props.data?.map((item: any) => item.min_temperature) || [])
          ),
          max: Math.max(
            ...(props.data?.map((item: any) => item.max_temperature) || [])
          )
        },
        series: [
          {
            ...weather_echarts.series[0],
            data: props.data?.map((item: any) => item.max_temperature) || []
          },
          {
            ...weather_echarts.series[1],
            data: props.data?.map((item: any) => item.min_temperature) || []
          }
        ]
      })
      dailyEcharts.setOption(weather_echarts, true, true)
      dailyEcharts?.resize()
    }
    window.addEventListener('resize', () => {
      dailyEcharts?.resize()
    })
  }, [props.data])
  return <div id="weather-echarts-daily" className="!h-[120px] w-[780px]"></div>
}
export { HoursChart, DailyChart }
