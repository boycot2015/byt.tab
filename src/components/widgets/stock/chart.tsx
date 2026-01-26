import { useSize } from 'ahooks'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'

import EchartsInit from '~components/Echarts'
import kdata from '~data/kdata.json'

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
const baseOption = {
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
const HoursKChart = (props: Record<string, any>) => {
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
  const id = props.id || 'stock-echarts-hours'
  const [hourilyEcharts, setHourilyEcharts] = useState<any>(null)
  useEffect(() => {
    if (props.data && props.data.data) {
      const option = {
        ...baseOption,
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
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          // interval: 1000 * 60 * 60,
          min: function (value) {
            return value.min - 200
          },
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
          },
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
          type: 'value',
          show: false,
          min: Math.min(...(filterData?.map(covert) || [])),
          max: Math.max(...(filterData?.map(covert) || []))
        },
        series: [
          {
            name: '涨跌幅',
            type: 'line',
            symbolSize: 0,
            smooth: false,
            data: _data.seriesData || []
          }
        ]
      }
      if (hourilyEcharts && document.getElementById(id)) {
        hourilyEcharts?.setOption(option, true, true)
      } else {
        setHourilyEcharts(EchartsInit(chartRef.current, option))
        hourilyEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      hourilyEcharts?.resize()
    })
    // const observer = new ResizeObserver(() => hourilyEcharts?.resize())
    // observer.observe(chartRef?.current)
    // return () => {
    //   observer.disconnect()
    //   // hourilyEcharts?.dispose()
    // }
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[140px] w-full"></div>
}

const DayHoursChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const id = props.id || 'stock-echarts-hours'
  const [hourilyEcharts, setHourilyEcharts] = useState<any>(null)
  useEffect(() => {
    if (props.data && props.data.data) {
      const option = {
        ...baseOption,
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter: (params: any) => {
            return `<div>
            ${params[0].data.time}
            <p>成本价：${(params[0].data.value || 0).toFixed(2)} 涨跌幅：${params[0].data.percent || 0}%</p>
            </div>`
          }
        },
        xAxis: {
          type: 'category',
          min: function (value) {
            return value.min + 20
          },
          // boundaryGap: true,
          data: props.data?.list?.map((item: any) => item.name) || []
        },
        yAxis: {
          type: 'value',
          show: false,
          min: props.data.data.min,
          max: props.data.data.max
        },
        series: [
          {
            name: '涨跌幅',
            type: 'line',
            symbolSize: 0,
            smooth: false,
            data: props.data?.list || []
          }
        ]
      }
      if (hourilyEcharts && document.getElementById(id)) {
        hourilyEcharts?.setOption(option, true, true)
      } else {
        setHourilyEcharts(EchartsInit(chartRef.current, option))
        hourilyEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      hourilyEcharts?.resize()
    })
    // const observer = new ResizeObserver(() => hourilyEcharts?.resize())
    // observer.observe(chartRef?.current)
    // return () => {
    //   observer.disconnect()
    //   // hourilyEcharts?.dispose()
    // }
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[265px] w-full"></div>
}
const DailyKChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  type DataItem = (number | string)[]
  // prettier-ignore

  function calculateMA(dayCount: number, data: DataItem[]) {
    var result = []
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-')
        continue
      }
      var sum = 0
      for (var j = 0; j < dayCount; j++) {
        sum += +data[i - j][1]
      }
      result.push((sum / dayCount).toFixed(2))
    }
    return result
  }

  const id = props.id || 'stock-echarts-daily'
  const [dailyEcharts, setDailyEcharts] = useState<any>(null)
  useEffect(() => {
    if (props.data) {
      const rawData = (
        props.data?.list ||
        kdata.map((el) => ({
          时间: dayjs(el[0]).format('YYYY-MM-DD'),
          开盘: el[1],
          收盘: el[2],
          涨跌额: el[3],
          涨跌幅: el[4],
          最低: el[5],
          最高: el[6]
        })) ||
        []
      ).reverse()

      const dates = rawData.map(function (item) {
        return dayjs(item['时间']).format('YYYY-MM-DD')
      })

      const data = rawData.map(function (item) {
        return [+item['开盘'], +item['收盘'], +item['最低'], +item['最高']]
      })
      const option = {
        legend: {
          data: ['日K', '5日线', '15日线', '20日线', '30日线'],
          inactiveColor: '#777',
          top: 10,
          right: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
          scale: true,
          axisLine: { lineStyle: { color: '#8392A5' } },
          splitLine: { show: false }
        },
        grid: {
          top: 20,
          left: 0,
          right: 0,
          bottom: 0
        },
        dataZoom: [
          {
            textStyle: {
              color: '#8392A5'
            },
            show: false,
            start: 80,
            end: 100,
            minSpan: 20,
            maxSpan: 80,
            handleIcon:
              'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            dataBackground: {
              areaStyle: {
                color: '#8392A5'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
              }
            },
            brushSelect: true
          },
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'candlestick',
            name: '日K',
            data: data,
            itemStyle: {
              color: '#f00',
              color0: '#0f0',
              borderColor: '#f00',
              borderColor0: '#0f0'
            }
          },
          {
            name: '5日线',
            type: 'line',
            data: calculateMA(5, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: '15日线',
            type: 'line',
            data: calculateMA(10, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: '20日线',
            type: 'line',
            data: calculateMA(20, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          },
          {
            name: '30日线',
            type: 'line',
            data: calculateMA(30, data),
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1
            }
          }
        ]
      }
      if (dailyEcharts && document.getElementById(id)) {
        dailyEcharts?.setOption(option, true, true)
      } else {
        setDailyEcharts(EchartsInit(chartRef.current, option))
        dailyEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      dailyEcharts?.resize()
    })
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[265px] w-full"></div>
}
const TradingChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const id = props.id || 'stock-echarts-pie'
  const [pieEcharts, setPieEcharts] = useState<any>(null)
  useEffect(() => {
    if (props.data && props.data.list && props.data.list.length > 0) {
      const option = {
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
        legend: {
          show: true,
          orient: 'vertical',
          bottom: 0,
          left: 'left',
          itemWidth: 3,
          itemGap: 1,
          itemHeight: 12,
          textStyle: {
            color: '#687F96',
            rich: {
              name: {
                //legend左边的文字
                fontSize: 10,
                color: 'white',
                padding: [0, 0, 0, 0] //1.左边的文字添加右边距10(可自己调整)
              },
              value: {
                //legend右边的值:10.09%、59.62%...
                fontSize: 10,
                color: 'white',
                backgroundColor: 'transparent', //2.右边的值添加背景色
                align: 'right', //3.右对齐
                padding: [0, -88, 0, 0] //4.设置右边距为-100(-70/-80..可自己调整)
              },
              percent: {
                //legend右边的值:10.09%、59.62%...
                fontSize: 10,
                color: 'white',
                backgroundColor: 'transparent', //2.右边的值添加背景色
                align: 'left', //3.右对齐
                padding: [0, 0, 0, 0] //4.设置右边距为-100(-70/-80..可自己调整)
              }
            }
          },
          formatter: function (name) {
            let current = props?.data?.list?.find((el) => el.name == name) || {}
            // ${current?.value}  ${Number(current?.percent || 0).toFixed(1)}%
            return `{name|${name.substring(0, 2)}} {percent|${current?.value}} {value|${Number(current?.percent || 0).toFixed(0) + '%'}}`
          }
        },
        series: [
          {
            type: 'pie',
            name: '交易',
            radius: '70%',
            center: ['52%', '22%'],
            label: {
              show: false
            },
            labelLine: {
              show: false
              // length: 10,
              // length2: 10
            },
            itemStyle: {
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              color: (params) => colors[params.name] || 'green'
            },
            data: props.data?.list || []
          }
        ]
      }
      if (pieEcharts && document.getElementById(id)) {
        pieEcharts?.setOption(option, true, true)
      } else {
        setPieEcharts(EchartsInit(chartRef.current, option))
        pieEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      pieEcharts?.resize()
    })
    // const observer = new ResizeObserver(() => pieEcharts?.resize())
    // observer.observe(chartRef?.current)
    // return () => {
    //   observer.disconnect()
    //   // pieEcharts?.dispose()
    // }
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[192px] w-full"></div>
}
const DailyVolChart = (props: Record<string, any>) => {
  const chartRef = useRef(null)
  const [dailyEcharts, setDailyEcharts] = useState<any>(null)
  const id = props.id || 'stock-echarts-daily-vol'
  useEffect(() => {
    if (props.data && props.data.length) {
      const option = {
        ...baseOption,
        tooltip: {
          show: true,
          formatter: '{b}<br />{a}{c}万元',
          trigger: 'axis'
        },
        xAxis: {
          ...baseOption.xAxis,
          data: props.data?.map((item: any) => item.时间) || []
        },
        yAxis: {
          ...baseOption.yAxis,
          min: Math.min(...(props.data?.map((item: any) => item.手数) || [])),
          max: Math.max(...(props.data?.map((item: any) => item.手数) || []))
        },
        series: [
          {
            name: '成交量',
            type: 'bar',
            data:
              props.data?.map((item: any) => ({
                value: item.手数,
                name: item.时间,
                kind: item.买卖盘性质
              })) || [],
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
      }
      if (dailyEcharts && document.getElementById(id)) {
        dailyEcharts.setOption(option, true, true)
      } else {
        setDailyEcharts(EchartsInit(chartRef.current, option))
        dailyEcharts?.resize()
      }
    }
    window.addEventListener('resize', () => {
      dailyEcharts?.resize()
    })
    // const observer = new ResizeObserver(() => dailyEcharts?.resize())
    // observer.observe(chartRef?.current)
    // return () => {
    //   observer.disconnect()
    //   // dailyEcharts?.dispose()
    // }
  }, [props.data])
  return <div id={id} ref={chartRef} className="!h-[80px] w-full"></div>
}
export { HoursKChart, DayHoursChart, DailyKChart, TradingChart, DailyVolChart }
