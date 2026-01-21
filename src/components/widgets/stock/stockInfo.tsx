import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  StockOutlined
} from '@ant-design/icons'
import {
  useLocalStorageState,
  useRequest,
  useTimeout,
  useUpdateEffect
} from 'ahooks'
import { App, Button, Col, Empty, Row, Spin, Tabs, Tag } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type {
  Stock,
  StockDaily,
  StockData,
  StockInfo
} from '~components/widgets/stock'
import {
  DailyVolChart,
  HoursChart,
  TradingChart
} from '~components/widgets/stock/chart'
import type { BoardRank } from '~components/widgets/stock/rank/boardRank'
import { ThemeProvider } from '~layouts'

const formatNumber = (num: number, unit = '亿', precision = 1) => {
  const tempObj = {
    万: 10000,
    亿: 100000000
  }
  if (tempObj[unit] && num > tempObj[unit]) unit = '亿'
  if (tempObj[unit] && num < tempObj[unit]) unit = '万'
  if (!num || isNaN(Number(num))) return '0.00'
  return (num / (tempObj[unit] || 1)).toFixed(precision) + unit
}
const covertData = (data = []) => {
  const tempArr = []
  const tempArr2 = []
  const list = []
  let maxBuyCount = 0
  let maxSellCount = 0
  data.map((el, index) => {
    if (!el.item) return
    let temp = { name: index < 10 ? '卖' : '买' } as any
    if (el.item.includes('vol')) {
      temp.vol = el.value.toString().replace(/-/g, '') ? el.value : '-'
      tempArr2.push(temp)
    } else {
      temp.value = el.value.toString()?.replace(/-/g, '') ? el.value : '-'
      tempArr.push(temp)
    }
  })
  tempArr.map((el, index) => {
    list.push({ ...el, ...tempArr2[index] })
  })
  maxSellCount = Math.max(
    ...list
      .filter((el) => el.name == '卖' && el.vol != '-')
      .map((item) => item.vol)
  )
  maxBuyCount = Math.max(
    ...list
      .filter((el) => el.name == '买' && el.vol != '-')
      .map((item) => item.vol)
  )
  list.map((item) => {
    if (!item.vol || item.vol == '-') {
      item.percent = 0
      return
    }
    item.percent =
      item.name == '买' ? item.vol / maxBuyCount : item.vol / maxSellCount
    item.percent = (item.percent * 100).toFixed(2)
    const totalSellVol = list
      .filter((el) => el.name == '卖' && el.vol != '-')
      .reduce((prev, cur) => prev + Number(cur.vol), 0)
    const totalBuyVol = list
      .filter((el) => el.name == '买' && el.vol != '-')
      .reduce((prev, cur) => prev + Number(cur.vol), 0)
    item.total = totalSellVol + totalBuyVol
    item.totalBuyVol = totalBuyVol || 0
    item.totalSellVol = totalSellVol || 0
    item.totalSellVolPercent = ((totalSellVol / item.total) * 100).toFixed(2)
    item.totalBuyVolPercent = (100 - item.totalSellVolPercent).toFixed(2)
  })
  list.map((item) => {
    item.vol = item.vol && item.vol != '-' ? formatNumber(item.vol, '万') : '-'
  })
  return list
}
const BuySellComponent = (props: { data: any[] }) => {
  const [state, setState] = useState([])
  useEffect(() => {
    setState(covertData(props.data))
  }, [props.data])
  return (
    <div>
      {state.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: index == 4 ? '10px' : ''
          }}
          className="flex relative justify-between w-full text-xs">
          <div>
            {item.name}
            {index > 4 ? index - 4 : index + 1} {item.value}
          </div>
          <div>{item.vol}</div>
          <div
            style={{
              width: item.percent + '%'
            }}
            className={`absolute w-full h-full top-0 right-0 ${index < 5 ? 'bg-[rgba(0,255,0,0.2)]' : 'bg-[rgba(255,0,0,0.2)]'}`}></div>
          {index == 4 && (
            <div className="h-[2px] absolute bottom-[-7px] left-0 rounded flex w-full">
              <div
                style={{ width: item.totalSellVolPercent + '%' }}
                className={`h-full bg-[rgba(0,255,0,0.2)]`}></div>
              <div
                style={{ width: item.totalBuyVolPercent + '%' }}
                className={`h-full bg-[rgba(255,0,0,0.2)]`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
const TradingComponent = (props) => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: '五档',
          key: '1',
          forceRender: true,
          children: <BuySellComponent data={props.data.buy_sell_data_list} />
        },
        {
          label: '成交量',
          forceRender: true,
          key: '2',
          children: (
            <TradingChart
              data={{
                list: covertData(props.data.buy_sell_data_list),
                data: { ...props.data, ...props.data_info }
              }}
            />
          )
        }
      ]}
    />
  )
}
const StockInfoComponent = (props: {
  data: {
    data_info: StockInfo
    buy_sell_data_list: any[]
    daily_data_list: StockDaily[]
    data: Stock
  }
}) => {
  const [boardData, setBoardData] = useLocalStorageState<BoardRank[]>(
    'stock_board_rank',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [stockData, setStockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data_self',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [styles, setStyles] = useState<any>()
  const [hasSelf, setHasSelf] = useState<any>()
  const getPriceStyles = useCallback((num: number) => {
    if (!num) return ''
    return num < 0 ? 'text-[#00ff00]' : 'text-[#ff0000]'
  }, [])
  const [currentBoardData, setCurrentBoardData] = useState<BoardRank>()
  useEffect(() => {
    const currentBoard = boardData.find(
      (item) => item.名称 === props.data.data_info?.行业
    )
    setCurrentBoardData(currentBoard)
  }, [boardData])
  useEffect(() => {
    setStyles(getPriceStyles(props.data.data?.涨幅))
    setHasSelf(
      stockData
        ?.find((item) => item.type === 'se')
        ?.list?.find((i) => i.股票代码 === props.data.data_info?.股票代码)
    )
  }, [props.data, stockData])
  const onEdit = () => {
    if (hasSelf) {
      let newData = [...stockData]
      newData.map((el) => {
        el.list = el.list.filter((i) => i.股票代码 !== hasSelf?.股票代码)
      })
      setStockData(newData)
      return
    }
    setStockData([
      {
        type: 'se',
        name: '自选',
        list: [
          { ...props.data.data, ...props.data.data_info },
          ...(stockData?.find((item) => item.type === 'se')?.list || [])
        ].filter(
          (item, index, arr) =>
            arr.findIndex((i) => i.股票代码 === item.股票代码) === index
        )
      }
    ])
    setHasSelf({ ...props.data.data, ...props.data.data_info })
  }
  return (
    <ThemeProvider token={{ Tabs: {} }}>
      <div className="flex w-full flex-col">
        {props.data ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 relative justify-between items-center md:hidden pb-1">
              <div className="flex gap-2 items-center">
                {props.data.data_info?.股票简称 || '-'}
                <span className="text-[12px] text-white/50 ">
                  {props.data.data_info?.股票代码 || '-'}
                </span>
              </div>
              <span className="flex gap-2">
                <Tag>{props.data.data_info?.行业 || '-'}</Tag>
                <span className={`flex flex-col ${styles}`}>
                  {currentBoardData?.今日涨跌幅 || '-'}%
                </span>
              </span>
              <div className="h-[1px] absolute bottom-0 left-0 w-full bg-[var(--byt-color-border-secondary)]"></div>
            </div>
            <Row gutter={[10, 10]} className="w-full">
              <Col span={0} sm={8} md={6}>
                <div className="flex gap-2 flex-row">
                  {props.data.data_info?.股票简称 || '-'}
                  <span className="text-[14px] text-white/50 ">
                    {props.data.data_info?.股票代码 || '-'}
                  </span>
                </div>
                <span className="flex gap-2">
                  <Tag>{props.data.data_info?.行业 || '-'}</Tag>
                  <span className={`flex flex-col ${styles}`}>
                    {currentBoardData?.今日涨跌幅 || '-'}%
                  </span>
                </span>
              </Col>
              <Col span={8} md={6} lg={3} className={`flex flex-col ${styles}`}>
                {props.data.data_info?.最新 || '-'}
                <div className={`flex gap-2 `}>
                  <span>{props.data.data?.涨跌 || '-'}</span>
                  <span>{props.data.data?.涨幅 || '-'}%</span>
                </div>
              </Col>
              <Col span={8} md={6} lg={3} className="flex flex-col">
                <div className={`flex gap-4 ${styles}`}>
                  <span>最高</span>
                  <span>{props.data.data?.最高 || '-'}</span>
                </div>
                <div className={`flex gap-4 ${styles}`}>
                  <span>最低</span>
                  <span>{props.data.data?.最低 || '-'}</span>
                </div>
              </Col>
              <Col span={8} md={6} lg={3} className="flex flex-col">
                <div className={`flex gap-4 ${styles}`}>
                  <span>今开</span>
                  <span>{props.data.data?.今开 || '-'}</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>昨收</span>
                  <span>{props.data.data?.昨收 || '-'}</span>
                </div>
              </Col>
              <Col span={8} md={6} lg={3} className="flex flex-col">
                <div className={`flex gap-4`}>
                  <span>金额</span>
                  <span className="flex-1 text-[12px]">
                    {formatNumber(props.data.data?.金额 || 0)}
                  </span>
                </div>
                <div className={`flex gap-4`}>
                  <span>市值</span>
                  <span className="flex-1 text-[12px]">
                    {formatNumber(props.data.data_info?.总市值 || 0)}
                  </span>
                </div>
              </Col>
              <Col span={8} md={6} lg={3} className="flex flex-col">
                <div className={`flex gap-4`}>
                  <span>换手</span>
                  <span>{props.data.data?.换手 || 0}%</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>量比</span>
                  <span>{props.data.data?.量比 || 0}</span>
                </div>
              </Col>
              <Col span={8} md={6} lg={3} className="flex items-center">
                <Button
                  onClick={onEdit}
                  type="link"
                  title={hasSelf ? '取消自选' : '加自选'}
                  icon={hasSelf ? <CheckOutlined /> : <PlusOutlined />}>
                  {hasSelf ? '已添加' : '加自选'}
                </Button>
              </Col>
            </Row>
            <div className="flex w-full gap-4">
              <div className="flex-1 flex flex-col gap-4">
                {
                  <HoursChart
                    data={{
                      list: props.data.daily_data_list,
                      data: { ...props.data.data, ...props.data.data_info }
                    }}
                  />
                }
                <DailyVolChart data={props.data.daily_data_list || []} />
              </div>
              <div>
                <TradingComponent data={props.data || ({} as any)} />
              </div>
            </div>
          </div>
        ) : (
          <Empty
            styles={{
              description: {
                color: '#fff'
              }
            }}
            description="暂无数据"
          />
        )}
      </div>
    </ThemeProvider>
  )
}
export default StockInfoComponent
