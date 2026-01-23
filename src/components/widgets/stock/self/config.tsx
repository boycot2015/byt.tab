import {
  CloseOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
  StockOutlined
} from '@ant-design/icons'
import {
  useDebounceFn,
  useLocalStorageState,
  useRequest,
  useUpdateEffect
} from 'ahooks'
import { App, Button, Empty, Input, Modal, Space, Spin, Tabs, Tag } from 'antd'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

import type {
  Stock,
  StockDaily,
  StockData,
  StockInfo
} from '~components/widgets/stock'
import type { News } from '~components/widgets/stock/news'
import StockRank from '~components/widgets/stock/rank/stockRank'
import StockTable from '~components/widgets/stock/self/stockTable'
import StockInfoComponent from '~components/widgets/stock/stockInfo'
import daily_data from '~data/daily.json'
import { getStockIntraday, getStockRealTime } from '~data/stock'
import { ThemeProvider } from '~layouts'

export const SearchContext = React.createContext<{
  symbol?: string
  setSymbol?: (symbol: string) => void
}>({})
const SearchComponent = ({ onScroll }: { onScroll: () => void }) => {
  const [searchKey, setSearchKey] = useState<string>('')
  const { symbol } = useContext(SearchContext)
  const [shouldQuery] = useLocalStorageState('shouldQueryStock', {
    defaultValue: false,
    listenStorageChange: true
  })
  const fetchSearchData = async (value: string) => {
    value = value || searchKey.trim()
    if (value.length === 6 || value.length === 8) {
      let searchKey = value.length === 6 ? value : value.substring(2)
      setSearchKey(searchKey)
      let res = await getStockRealTime({
        code: 'stock_bid_ask_em',
        symbol: searchKey
      })
      let res2 = await getStockRealTime({
        code: 'stock_individual_info_em',
        symbol: searchKey
      })
      let res3 = [] as StockDaily[]
      let daily_data_list = [] as StockDaily[]
      try {
        res3 = await getStockIntraday({
          code: 'stock_intraday_em', // stock_intraday_sina ｜ stock_intraday_em
          // date: dayjs().format('YYYYMMDD'),
          symbol: searchKey
        })
      } catch (error) {
        res3 = daily_data as StockDaily[]
      }
      res3 = res3 || (daily_data as StockDaily[])
      if (!res) return
      let buy_sell_data_list = res.slice(0, 20)
      let data = {} as Stock
      let data_info = {} as StockInfo
      res.slice(20)?.map((item) => {
        data[item.item] = item.value
      })
      res2?.map((item) => {
        data_info[item.item] = item.value
      })
      let kindMap = {
        U: '买盘',
        E: '中性盘',
        D: '卖盘'
      }
      if (res3 && res3.length > 0) {
        daily_data_list = res3
          .map((el) => ({
            时间: el.ticktime || el.时间,
            成交价: el.price || el.成交价,
            手数: el.volume || el.手数,
            买卖盘性质: kindMap[el.kind] || el.买卖盘性质
          }))
          .filter((item) => {
            let startTime = new Date().setHours(9, 30, 0, 0)
            let breakStart = new Date().setHours(11, 30, 0, 0)
            let breakEnd = new Date().setHours(13, 0, 0, 0)
            let endTime = new Date().setHours(15, 0, 0, 0)
            let time = new Date().setHours(
              Number(item.时间.split(':')[0]),
              Number(item.时间.split(':')[1]),
              Number(item.时间.split(':')[2]),
              0
            )
            return (
              (time >= startTime && time <= breakStart) ||
              (time >= breakEnd && time <= endTime)
            )
          })
      }
      return {
        buy_sell_data_list,
        daily_data_list,
        data,
        data_info
      }
    }
    return null
  }
  const [symbolData, setSymbolData] = useState<{
    buy_sell_data_list: any[]
    daily_data_list: StockDaily[]
    data: Stock
    data_info: StockInfo
  }>()
  const onSearch = (value) => {
    if (!value || !value.trim()) {
      setSearchKey('')
      return
    }
    setSymbolData(undefined)
    setSearchKey(value.trim())
    onSearchRefresh(value)
  }
  const {
    data,
    loading: searchLoading,
    run: onSearchRefresh
  } = useRequest(fetchSearchData, {
    cacheKey: symbol,
    throttleWait: 500,
    pollingInterval: shouldQuery ? 3000 : 0,
    cacheTime: 1000 * 15,
    pollingErrorRetryCount: 3
  })
  useUpdateEffect(() => {
    data && setSymbolData(data)
  }, [data])
  useUpdateEffect(() => {
    symbol && onSearch(symbol)
    onScroll()
  }, [symbol])
  return (
    <div className="w-full">
      <div className="flex items-center w-full justify-center sm:justify-between gap-4 mb-4 mt-2">
        <h3 className="hidden sm:inline">股票自选</h3>
        <div>
          <Space>
            <Space.Compact>
              <Input
                autoFocus
                value={searchKey}
                placeholder="请输入股票代码"
                style={{ width: '100%' }}
                allowClear
                onChange={(e) => onSearch(e.target.value)}
              />
              <Button
                onClick={() => onSearch(symbol)}
                disabled={!searchKey}
                icon={<SearchOutlined />}>
                搜索
              </Button>
            </Space.Compact>
          </Space>
        </div>
      </div>
      {(symbolData || searchLoading) && (
        <div className="flex flex-col min-h-[160px]">
          <Spin spinning={searchLoading && !symbolData}>
            <StockInfoComponent data={symbolData || ({} as any)} />
          </Spin>
        </div>
      )}
    </div>
  )
}

function WidgetModal(props: {
  visible: boolean
  loading?: boolean
  cateId?: string
  cates?: News[]
  id?: string
  onCancel: (cateId: string) => void
  update?: (stockType: string) => void
  afterOpenChange: (visible: boolean) => void
}) {
  const { message } = App.useApp()
  const tabWrapRef = useRef<HTMLDivElement>(null)
  const [stockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data_self',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [symbol, setSymbol] = useState<string>('')
  const [cateId] = useState<string>(props.cateId || '')
  const [stockType, setStockType] = useState<string>('se')
  const [loading, setLoading] = useState<boolean>(false)
  const stockTableComponent = useMemo(
    () => <StockTable size="biggest" stockType={stockType} />,
    [stockType]
  )
  const rankComponent = useMemo(
    () => <StockRank size="biggest" withComponents />,
    [stockType]
  )
  useUpdateEffect(() => {
    // !props.loading && message.success('数据更新成功')
    setLoading(false)
  }, [props.loading])
  return (
    <SearchContext.Provider value={{ symbol, setSymbol }}>
      <ThemeProvider
        token={{
          colorBgContainer: 'rgba(0, 0, 0, 0.5)',
          colorText: 'rgba(255, 255, 255, 0.65)',
          colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
          placeholderColor: 'rgba(255, 255, 255, 0.35)',
          Tabs: {
            itemColor: 'rgba(255, 255, 255, 0.65)'
          }
        }}>
        <App>
          <Modal
            // title={<span className=" !text-white">新闻动态</span>}
            wrapClassName="!bg-black/30 backdrop-blur-md"
            classNames={{
              header: '!bg-transparent !text-white',
              container: '!overflow-hidden !rounded-xl !p-0 !bg-black/50',
              body: '!p-5'
            }}
            getContainer={() => document.body}
            width={1000}
            footer={null}
            open={props.visible}
            closeIcon={<CloseOutlined className="!text-white" />}
            afterOpenChange={props.afterOpenChange}
            onCancel={() => props.onCancel(cateId)}>
            <div
              className="flex w-full max-h-[70vh] overflow-y-auto mt-4 pr-2"
              ref={(el) => (tabWrapRef.current = el)}>
              <div className="w-full h-full">
                <Spin
                  spinning={!stockData || loading}
                  rootClassName="!h-full"
                  wrapperClassName="!h-full">
                  <div className="min-h-[160px] w-full h-full">
                    <SearchComponent
                      onScroll={() => {
                        tabWrapRef.current?.scrollTo({
                          left: 0,
                          top: 0,
                          behavior: 'smooth'
                        })
                      }}
                    />
                    {cateId === 'symbol_self' &&
                    stockData?.length &&
                    stockData.find((item) => item.type === stockType)?.list
                      ?.length ? (
                      <Tabs
                        defaultActiveKey={stockType}
                        indicator={{
                          align: 'start',
                          size: (origin) => origin * 1
                        }}
                        tabBarExtraContent={{
                          right: (
                            <Button
                              type="text"
                              loading={props.loading}
                              size="small"
                              icon={<ReloadOutlined />}
                              className="cursor-pointer hover:!text-white text-white"
                              onClick={() => props.update(stockType)}
                              title="获取最新数据">
                              刷新
                            </Button>
                          )
                        }}
                        more={{
                          trigger: 'click',
                          getPopupContainer: () => tabWrapRef.current,
                          overlayStyle: {
                            background: 'rgba(0, 0, 0, 0.5)'
                          },
                          icon: <MoreOutlined className="!text-white" />
                        }}
                        onChange={(key) => {
                          setStockType(key)
                          props.loading && setLoading(true)
                        }}
                        className="text-shadow"
                        items={stockData.map((item, index) => ({
                          label: item.name,
                          key: item.type,
                          icon: item.icon || <StockOutlined />,
                          children: <div>{stockTableComponent}</div>
                        }))}
                      />
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
                    <div className="w-full mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3>股票排行</h3>
                      </div>
                      {rankComponent}
                    </div>
                  </div>
                </Spin>
              </div>
            </div>
          </Modal>
        </App>
      </ThemeProvider>
    </SearchContext.Provider>
  )
}

export default WidgetModal
