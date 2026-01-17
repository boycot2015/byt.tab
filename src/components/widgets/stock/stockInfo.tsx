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
import { App, Button, Col, Empty, Row, Space, Spin, Tabs, Tag } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import type {
  Stock,
  StockDaily,
  StockData,
  StockInfo
} from '~components/widgets/stock'
import { DailyChart, HoursChart } from '~components/widgets/stock/chart'
import type { BoardRank } from '~components/widgets/stock/rank/boardRank'
import { ThemeProvider } from '~layouts'

const formatNumber = (num: number, unit = '亿') => {
  const tempObj = {
    万: 10000,
    亿: 100000000
  }
  if (!num) return '0.00'
  return (num / tempObj[unit]).toFixed(2) + unit
}
const StockInfoComponent = (props: {
  data: {
    data_info: StockInfo
    buy_sell_data_list: any[]
    daily_data_list: StockDaily[]
    data: Stock
  }
}) => {
  const { data } = props
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
      (item) => item.名称 === data.data_info?.行业
    )
    setCurrentBoardData(currentBoard)
  }, [boardData])
  useEffect(() => {
    setStyles(getPriceStyles(data.data?.涨幅))
    setHasSelf(
      stockData
        ?.find((item) => item.type === 'se')
        ?.list?.find((i) => i.股票代码 === data.data_info?.股票代码)
    )
  }, [data])
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
          { ...data.data, ...data.data_info },
          ...(stockData?.find((item) => item.type === 'se')?.list || [])
        ].filter(
          (item, index, arr) =>
            arr.findIndex((i) => i.股票代码 === item.股票代码) === index
        )
      }
    ])
    setHasSelf({ ...data.data, ...data.data_info })
  }
  return (
    <ThemeProvider>
      <div className="flex w-full flex-col">
        {data ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 relative justify-between items-center md:hidden pb-1">
              <div>
                {data.data_info?.股票简称 || '-'}
                <span className="text-[12px] text-white/50 ">
                  {data.data_info?.股票代码 || '-'}
                </span>
              </div>
              <span className="flex gap-2">
                <Tag>{data.data_info?.行业 || '-'}</Tag>
                <span className={`flex flex-col ${styles}`}>
                  {currentBoardData?.今日涨跌幅 || '-'}%
                </span>
              </span>
              <div className="h-[1px] absolute bottom-0 left-0 w-full bg-[var(--byt-color-border-secondary)]"></div>
            </div>
            <Row
              gutter={[10, 10]}
              className="flex justify-between items-center w-full">
              <Col span={0} md={6}>
                <div className="flex gap-2 flex-col md:flex-row">
                  {data.data_info?.股票简称 || '-'}
                  <span className="text-[14px] text-white/50 ">
                    {data.data_info?.股票代码 || '-'}
                  </span>
                </div>
                <span className="flex gap-2">
                  <Tag>{data.data_info?.行业 || '-'}</Tag>
                  <span className={`flex flex-col ${styles}`}>
                    {currentBoardData?.今日涨跌幅 || '-'}%
                  </span>
                </span>
              </Col>
              <Col className={`flex flex-col ${styles}`}>
                {data.data_info?.最新 || '-'}
                <div className={`flex gap-2 `}>
                  <span>{data.data?.涨幅 || '-'}%</span>
                  <span>{data.data?.涨跌 || '-'}%</span>
                </div>
              </Col>
              <Col className="flex flex-col">
                <div className={`flex gap-4 ${styles}`}>
                  <span>最高</span>
                  <span>{data.data?.最高 || '-'}</span>
                </div>
                <div className={`flex gap-4 ${styles}`}>
                  <span>最低</span>
                  <span>{data.data?.最低 || '-'}</span>
                </div>
              </Col>
              <Col className="flex flex-col">
                <div className={`flex gap-4 ${styles}`}>
                  <span>今开</span>
                  <span>{data.data?.今开 || '-'}</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>昨收</span>
                  <span>{data.data?.昨收 || '-'}</span>
                </div>
              </Col>
              <Col className="flex flex-col">
                <div className={`flex gap-4`}>
                  <span>金额</span>
                  <span>{formatNumber(data.data?.金额 || 0)}</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>市值</span>
                  <span>{formatNumber(data.data_info?.总市值 || 0)}</span>
                </div>
              </Col>
              <Col className="flex flex-col">
                <div className={`flex gap-4`}>
                  <span>换手</span>
                  <span>{data.data?.换手 || 0}%</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>量比</span>
                  <span>{data.data?.量比 || 0}</span>
                </div>
              </Col>
              <Col className="flex gap-2">
                <Button
                  onClick={onEdit}
                  type="link"
                  title={hasSelf ? '取消自选' : '添加自选'}
                  icon={hasSelf ? <CheckOutlined /> : <PlusOutlined />}>
                  {hasSelf ? '已添加' : '添加自选'}
                </Button>
              </Col>
            </Row>
            {data.daily_data_list && (
              <HoursChart
                data={{
                  list: data.daily_data_list,
                  data: { ...data.data, ...data.data_info }
                }}
              />
            )}
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
