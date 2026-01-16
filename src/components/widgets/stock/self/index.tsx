import {
  clearCache,
  useInterval,
  useLocalStorageState,
  useRequest,
  useUpdateEffect
} from 'ahooks'
import { Card, Empty, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import type { Stock, StockData } from '~components/widgets/stock'
import { getStockRealTime } from '~data/stock'
import { sizeMap, ThemeProvider } from '~layouts'

import WidgetModal from './config'

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
  const fetchData = async (): Promise<StockData[]> => {
    if (!stockData || !stockData.length) return []
    let res = await Promise.all(
      stockData.map(async (item) => {
        let list = await Promise.all(
          item.list.map(async (child): Promise<Stock> => {
            let data: Stock = await getStockRealTime({
              code: 'stock_individual_spot_xq',
              symbol: child.代码
            })
            return data
          })
        )
        return { ...item, list: [...list] }
      })
    )
    return res
  }
  const { data, run: getSpotData } = useRequest(fetchData, {
    cacheKey: 'stock_spot_data_self',
    staleTime: 1000 * 60 * 60 * 24
  })
  const [stockData, setStockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data_self',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [loading, setLoading] = useState(false)
  const updateData = (type) => {
    setLoading(true)
    if (type == 'se' || type == 'hk') clearCache('stock_spot_data_self')
    if (type == 'se' || type == 'hk') getSpotData()
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
    // getSpotData()
  }, 1000 * 15)
  // 数据清除自动获取
  useUpdateEffect(() => {
    if (!stockData) {
      setPage(0)
      setList([])
      // updateData('se')
    }
  }, [stockData])
  return (
    <ThemeProvider token={{}}>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full !bg-black/50 !backdrop-blur-md !p-0 !rounded-xl mx-auto`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        {stockData && stockData.length ? (
          <Spin spinning={!list.length} wrapperClassName={`w-full h-full`}>
            <div className="h-full w-full min-h-[144px] !p-4 flex flex-col text-white gap-2">
              {list?.map((item, index) => (
                <div
                  className={`flex justify-between w-full gap-2 ${props.size === 'large' ? 'flex-row' : 'flex-col'}`}
                  title={item['名称']}
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
        ) : (
          <Empty
            styles={{
              description: {
                color: '#fff'
              }
            }}
            description="暂无自选的股票"
          />
        )}
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
              props: { size: props.size, cateId: 'symbol_self' }
            })
          }}
          update={updateData}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
