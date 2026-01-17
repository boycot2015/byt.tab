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
import React, { useEffect, useMemo, useRef, useState } from 'react'

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
import { getStockIntraday, getStockRealTime } from '~data/stock'
import { ThemeProvider } from '~layouts'

let scrollTop = 0

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
  const [stockData, setStockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data_self',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [cateId] = useState<string>(props.cateId || '')
  const [stockType, setStockType] = useState<string>('se')
  const [symbol, setSymbol] = useState<string>('')
  const [symbolData, setSymbolData] = useState<{
    buy_sell_data_list: any[]
    daily_data_list: StockDaily[]
    data: Stock
    data_info: StockInfo
  }>()
  const [loading, setLoading] = useState<boolean>(false)
  const stockTableComponent = useMemo(
    () => (
      <StockTable
        size="biggest"
        ref={tabWrapRef.current}
        stockType={stockType}
      />
    ),
    [stockType]
  )
  const rankComponent = useMemo(
    () => <StockRank size="biggest" withComponents />,
    [stockType]
  )
  useUpdateEffect(() => {
    !props.loading && message.success('数据更新成功')
    setLoading(false)
  }, [props.loading])
  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.value &&
      (e.target.value.length === 6 || e.target.value.length === 8)
    ) {
      setSymbolData(undefined)
      return
    }
    let symbol =
      e.target.value.length === 6 ? e.target.value : e.target.value.substring(2)
    setSymbol(symbol)
    setSearchLoading(true)
    let res = await getStockRealTime({
      code: 'stock_bid_ask_em',
      symbol
    })
    let res2 = await getStockRealTime({
      code: 'stock_individual_info_em',
      symbol
    })
    let res3 = await getStockIntraday({
      code: 'stock_intraday_em',
      symbol
    })
    if (!res) return
    let buy_sell_data_list = res.slice(0, 20)
    let data = {} as Stock
    let daily_data_list = [] as StockDaily[]
    let data_info = {} as StockInfo
    res.slice(20)?.map((item) => {
      data[item.item] = item.value
    })
    res2?.map((item) => {
      data_info[item.item] = item.value
    })
    daily_data_list = res3
    setSymbolData({
      buy_sell_data_list,
      daily_data_list,
      data,
      data_info
    })
    setSearchLoading(false)
  }
  return (
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
                  <div className="w-full">
                    <div className="flex items-center w-full justify-center sm:justify-between gap-4 mb-4 mt-2">
                      <h3 className="hidden sm:inline">股票自选</h3>
                      <div>
                        <Space>
                          <Space.Compact>
                            <Input
                              autoFocus
                              placeholder="请输入股票代码"
                              style={{ width: '80%' }}
                              onChange={onSearch}
                            />
                            <Button
                              disabled={!symbol}
                              icon={<SearchOutlined />}>
                              搜索
                            </Button>
                          </Space.Compact>
                        </Space>
                      </div>
                    </div>
                    {(symbolData || searchLoading) && (
                      <div className="flex flex-col min-h-[160px]">
                        <Spin spinning={searchLoading}>
                          {symbolData && (
                            <StockInfoComponent data={symbolData} />
                          )}
                        </Spin>
                      </div>
                    )}
                  </div>
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
  )
}

export default WidgetModal
