import {
  CloseOutlined,
  MoreOutlined,
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
import { App, Button, Empty, Input, Modal, Space, Spin, Tabs, Tag } from 'antd'
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
  }, [data])
  const onAdd = useCallback(() => {
    setStockData([
      {
        type: 'se',
        name: '自选',
        list: [
          { ...data.data, ...data.data_info },
          ...(stockData?.find((item) => item.type === 'se')?.list || [])
        ].filter(
          (item, index, arr) =>
            arr.findIndex((i) => i.代码 === item.代码) === index
        )
      }
    ])
  }, [data, stockData])
  return (
    <ThemeProvider>
      <div className="flex w-full flex-col">
        {data ? (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <div className="flex gap-2">
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
              </div>
              <div className={`flex flex-col ${styles}`}>
                {data.data_info?.最新 || '-'}
                <div className={`flex gap-2 `}>
                  <span>{data.data?.涨幅 || '-'}%</span>
                  <span>{data.data?.涨跌 || '-'}%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`flex gap-4 ${styles}`}>
                  <span>最高</span>
                  <span>{data.data?.最高 || '-'}</span>
                </div>
                <div className={`flex gap-4 ${styles}`}>
                  <span>最低</span>
                  <span>{data.data?.最低 || '-'}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`flex gap-4 ${styles}`}>
                  <span>今开</span>
                  <span>{data.data?.今开 || '-'}</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>昨收</span>
                  <span>{data.data?.昨收 || '-'}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`flex gap-4`}>
                  <span>金额</span>
                  <span>{formatNumber(data.data?.金额 || 0)}</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>市值</span>
                  <span>{formatNumber(data.data_info?.总市值 || 0)}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className={`flex gap-4`}>
                  <span>换手</span>
                  <span>{data.data?.换手 || 0}%</span>
                </div>
                <div className={`flex gap-4`}>
                  <span>量比</span>
                  <span>{data.data?.量比 || 0}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={onAdd}
                  type="link"
                  title="添加自选"
                  icon={<PlusOutlined />}>
                  自选
                </Button>
              </div>
            </div>
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
