import {
  clearCache,
  useInterval,
  useLocalStorageState,
  useRequest,
  useUpdateEffect
} from 'ahooks'
import { Card, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import { getFinanceSpot } from '~data/finance'
import { sizeMap, ThemeProvider } from '~layouts'

import WidgetModal from './config'

export interface Finance {
  type: 'hk' | 'se' | 'us'
  name: string
  icon?: string
  list: {
    序号?: string
    代码: string
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
  }[]
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
  const fetchData = async (): Promise<Finance[]> => {
    let res = await Promise.all([
      getFinanceSpot({
        code: 'stock_zh_index_spot_em',
        symbol: '沪深重要指数'
      }),
      getFinanceSpot({
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
  const fetchUsData = async (): Promise<Finance[]> => {
    let res: Finance['list'] = await getFinanceSpot({
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
  const { data, run: getSpotData } = useRequest(fetchData, {
    cacheKey: 'finance_data',
    staleTime: 1000 * 30
  })
  const { data: usData, run: getUsData } = useRequest(fetchUsData, {
    cacheKey: 'finance_data_us',
    staleTime: 1000 * 30
  })
  const [financeData, setFinanceData] = useLocalStorageState<Finance[]>(
    'finance_data',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [loading, setLoading] = useState(false)
  const updateData = (type) => {
    setLoading(true)
    if (type == 'se' || type == 'hk') clearCache('finance_data')
    if (type == 'us') clearCache('finance_data_us')
    if (type == 'se' || type == 'hk') getUsData()
    if (type == 'us') getSpotData()
  }
  const [list, setList] = useState<Finance['list']>([])
  useEffect(() => {
    if (data && data.length > 0) {
      let newdata = financeData && financeData.length ? [...financeData] : data
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
      setFinanceData(newdata)
      setLoading(false)
    }
  }, [data])
  useEffect(() => {
    if (usData && usData.length > 0) {
      let newdata =
        financeData && financeData.length ? [...financeData] : usData
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
      setFinanceData(newdata)
      setLoading(false)
    }
  }, [usData])
  useInterval(() => {
    setPage((page) => {
      if (!financeData) return 0
      let data =
        financeData
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
    if (!financeData) {
      setPage(0)
      setList([])
      updateData('se')
      updateData('us')
    }
  }, [financeData])
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
          onCancel={(cateId) => {
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
