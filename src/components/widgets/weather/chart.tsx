import React, { useEffect, useMemo, useState } from 'react'

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
const getWeatherRich = () => {
  const weather = ['小雨', '小雨', '阴', '小雨', '多云', '小雨', '小雨']
  const rich: any = {}
  for (let i = 0; i < weather.length; i++) {
    rich[i] = {
      backgroundColor: {
        image: `${weather_icon_url}/${weather[i]}.png`
      },
      height: 40,
      width: 40
    }
  }
  return { weather, rich }
}
const HoursChart = (props: Record<string, any>) => {
  let weather_echarts_options = {
    ...baseOptions,
    series: [
      {
        name: '气温',
        type: 'line',
        data: ['16.3', '16.2', '17.6', '14.2', '17.6', '15.7', '14.3'],
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
  }
  weather_echarts_options.xAxis[0].data =
    props.data?.map((item: any) => item.datetime) || []
  weather_echarts_options.series[0].data =
    props.data?.map((item: any) => item.temperature) || []
  weather_echarts_options.yAxis.min = Math.min(
    ...(props.data?.map((item: any) => item.temperature) || [])
  )
  weather_echarts_options.yAxis.max = Math.max(
    ...(props.data?.map((item: any) => item.temperature) || [])
  )
  let weather_echarts = EchartsInit(
    document.getElementById('weather-echarts-hours') as HTMLElement,
    weather_echarts_options
  )
  window.addEventListener('resize', () => {
    weather_echarts?.resize()
  })
  return (
    <div id="weather-echarts-hours" className="!h-[100px] !w-[2960px]"></div>
  )
}
const DailyChart = (props: Record<string, any>) => {
  console.log(props.data, 'props.data')
  let weather_echarts_options = {
    ...baseOptions,
    series: [
      {
        name: '最高气温',
        type: 'line',
        data: ['16.3', '16.2', '17.6', '14.2', '17.6', '15.7', '14.3'],
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
        data: ['13.4', '12.8', '13.5', '12.5', '12.4', '13.2', '13'],
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
  }
  weather_echarts_options.xAxis[0].data =
    props.data?.map((item: any) => item.date) || []
  weather_echarts_options.series[0].data =
    props.data?.map((item: any) => item.max_temperature) || []
  weather_echarts_options.series[1].data =
    props.data?.map((item: any) => item.min_temperature) || []
  weather_echarts_options.yAxis.min = Math.min(
    ...(props.data?.map((item: any) => item.temperature) || [])
  )
  weather_echarts_options.yAxis.max = Math.max(
    ...(props.data?.map((item: any) => item.temperature) || [])
  )
  let weather_echarts = EchartsInit(
    document.getElementById('weather-echarts-daily') as HTMLElement,
    weather_echarts_options
  )
  window.addEventListener('resize', () => {
    weather_echarts?.resize()
  })
  return <div id="weather-echarts-daily" className="!h-[120px] w-[780px]"></div>
}
export { HoursChart, DailyChart }
