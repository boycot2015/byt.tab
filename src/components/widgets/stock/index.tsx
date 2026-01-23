import {
  clearCache,
  useInterval,
  useLocalStorageState,
  useRequest,
  useUpdateEffect
} from 'ahooks'
import { Card, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { getCurrentJobs } from '~components/widgets/date/config'
import type { Job } from '~components/widgets/date/config'
import { getStockSpot } from '~data/stock'
import { sizeMap, ThemeProvider } from '~layouts'
import { buildDay } from '~utils'

import WidgetModal from './config'

export interface StockDaily {
  时间: string
  成交价: number
  手数: number
  买卖盘性质: string
  ticktime?: string
  price?: number
  volume?: number
  kind?: string
}
export type StockInfo = {
  最新: number
  股票代码: string
  股票简称: string
  总股本: number
  流通股: number
  总市值: number
  流通市值: number
  行业: string
  上市时间: number
}

export interface Stock {
  序号?: string
  代码?: string
  股票代码?: string
  名称: string
  最新价: number
  涨跌幅: number
  涨跌额: number
  振幅?: number
  最高: number
  最低: number
  今开: number
  昨收: number
  量比?: number
  最新: number
  均价: number
  涨幅: number
  涨跌: number
  总手: number
  金额: number
  换手: number
  涨停: number
  跌停: number
  外盘: number
  内盘: number
}
export interface StockData {
  type: 'hk' | 'se' | 'us'
  name: string
  icon?: string
  list: Stock[]
}
type WidgetProp = {
  withComponents?: boolean
  cateId?: string // 源
  id?: string // id
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'middle' | 'large'
}
function Widget(props: WidgetProp) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const pageSize = props.size == 'large' ? 4 : 2
  const [page, setPage] = useState(1)
  const hkspots = ['HSTECH', 'HSI', 'HSCEI', 'HSCCI']
  const usspots = ['DJIA', 'IXIC', 'NDX', 'SPX']
  const fetchData = async (): Promise<StockData[]> => {
    let res = await Promise.all([
      getStockSpot({
        code: 'stock_zh_index_spot_em',
        symbol: '沪深重要指数'
      }),
      getStockSpot({
        code: 'stock_hk_index_spot_sina'
      })
    ])
    return [
      {
        type: 'se',
        name: '深沪京',
        icon: '🇨🇳',
        list: [...(res[0] || [])]
      },
      {
        type: 'hk',
        name: '港股',
        icon: '🇭🇰',
        list: [...(res[1] || []).filter((el) => hkspots.includes(el['代码']))]
      }
    ]
  }
  const fetchUsData = async (): Promise<StockData[]> => {
    let res: Stock[] = await getStockSpot({
      code: 'index_global_spot_em'
    })
    return [
      {
        type: 'us',
        name: '美股',
        icon: '🇺🇸',
        list: res
          ?.filter((el) => usspots.includes(el['代码']))
          .map((el) => ({
            ...el,
            昨收: el['昨收价'],
            振幅: el['振幅'],
            今开: el['开盘价'],
            最高: el['最高价'],
            最低: el['最低价']
          }))
      }
    ]
  }
  const [shouldQuery, setShouldQuery] = useLocalStorageState('shouldQueryStock', {
    defaultValue: false,
    listenStorageChange: true
  })
  const { data, run: getSpotData } = useRequest(fetchData, {
    cacheKey: 'stock_spot_data_se_hk',
    refreshDeps: [shouldQuery],
    pollingInterval: shouldQuery ? 5000 : 0,
    staleTime: 1000 * 5 * 6
  })
  const { data: usData, run: getUsData } = useRequest(fetchUsData, {
    cacheKey: 'stock_spot_data_us',
    refreshDeps: [shouldQuery],
    pollingInterval: shouldQuery ? 5000 : 0,
    staleTime: 1000 * 60 * 60 * 12
  })
  const [stockData, setStockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [jobs] = useLocalStorageState<Job[]>('jobs', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [loading, setLoading] = useState(false)
  const updateData = (type) => {
    setLoading(true)
    if (type == 'se' || type == 'hk') clearCache('stock_spot_data_se_hk')
    if (type == 'us') clearCache('stock_spot_data_us')
    if (type == 'se' || type == 'hk') getSpotData()
    if (type == 'us') getUsData()
  }
  const [list, setList] = useState<Stock[]>([])
  useEffect(() => {
    if (data && data.length > 0) {
      let newdata = stockData && stockData.length ? [...stockData] : data
      if (newdata.find((item) => item.type === 'se')) {
        newdata = newdata.map((item) => {
          if (item.type === 'se') {
            item.list = data[0].list || []
          }
          return item
        })
      } else {
        newdata.unshift(...data)
      }
      let list = newdata[0]?.list?.slice(0, pageSize) || []
      setList(list)
      setStockData(newdata)
      setLoading(false)
    }
  }, [data])
  useEffect(() => {
    if (usData && usData.length > 0) {
      let newdata = stockData && stockData.length ? [...stockData] : usData
      if (newdata.find((item) => item.type === 'us')) {
        newdata = newdata.map((item) => {
          if (item.type === 'us') {
            item.list = usData[0].list || []
          }
          return item
        })
      } else {
        newdata.push(usData[0])
      }
      let list = newdata[0]?.list?.slice(0, pageSize) || []
      setList(list)
      setStockData(newdata)
      setLoading(false)
    }
  }, [usData])
  const getJobs = useCallback(() => getCurrentJobs(jobs, buildDay()), [])
  useInterval(() => {
    setPage((page) => {
      if (!stockData) return 0
      let data =
        stockData
          ?.find((item) => item.type === 'se')
          ?.list?.slice(page * pageSize, (page + 1) * pageSize) || []
      data.length && setList(data)
      return data.length ? page + 1 : 0
    })
    getSpotData()
    getUsData()
  }, 1000 * 15)
  // 数据清除自动获取
  useUpdateEffect(() => {
    if (!stockData) {
      setPage(0)
      setList([])
      updateData('se')
      updateData('us')
    }
  }, [stockData])
  useEffect(() => {
    let res = getJobs()
    if (res && res.find((item) => item.title.includes('股票'))) {
      setShouldQuery(true)
    }
  }, [])
  return (
    <ThemeProvider>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full !bg-black/50 !backdrop-blur-md !p-0 !rounded-xl mx-auto`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        <Spin spinning={!list.length} wrapperClassName={`w-full h-full`}>
          <div className="h-full w-full min-h-[144px] !p-4 flex flex-col text-white gap-2">
            {list?.map((item, index) => (
              <div
                className={`flex justify-between w-full gap-2 ${props.size === 'large' ? 'flex-row' : 'flex-col'}`}
                title={item['具体事项']}
                key={item['名称'] || item['代码'] || index}>
                {item['名称'] && (
                  <span className="flex justify-between w-full gap-1">
                    <span className="line-clamp-1">{item['名称']}</span>
                    <span className={props.size === 'large' ? 'hidden' : ''}>
                      {item['最新价']}
                    </span>
                  </span>
                )}
                <span
                  className={`text-right flex gap-2 ${item['涨跌幅'] > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  <span className={props.size === 'large' ? '' : 'hidden'}>
                    {item['最新价']}
                  </span>
                  <span>{item['涨跌额']}</span>
                  <span>
                    {item['最新价'] > item['昨收'] ? '+' : ''}
                    {item['涨跌幅']}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Spin>
      </Card>
      {show && (
        <WidgetModal
          visible={visible}
          loading={loading}
          cateId={props.cateId || ''}
          id={props.id || ''}
          afterOpenChange={(visible) => {
            setShow(visible)
          }}
          onCancel={() => {
            setVisible(false)
            props.update({
              id: props.id,
              props: { size: props.size, cateId: 'symbol' }
            })
          }}
          update={updateData}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
