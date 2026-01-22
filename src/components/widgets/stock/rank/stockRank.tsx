import { CloseOutlined, CopyOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  useLocalStorageState,
  useRequest,
  useTimeout,
  useUpdateEffect
} from 'ahooks'
import {
  App,
  Button,
  Card,
  Empty,
  Modal,
  Select,
  Spin,
  Table,
  Tabs
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { SearchContext } from '~components/widgets/stock/self/config'
import { getStockBoardRank } from '~data/stock'
import { sizeMap, ThemeProvider } from '~layouts'

export interface StockRank {
  序号: string
  名称: string
  股票名称?: string
  代码?: string
  最新价: number
  涨跌幅: number
  涨跌额: number
  成交量: number
  成交额: number
  振幅: number
  换手率: number
  市盈率: number
  量比: number
  市净率: number
  流通市值: number
  总市值: number
  涨速: number
  '5分钟涨跌': number
  '60日涨跌幅': number
  年初至今涨跌幅: number
}

type WidgetProp = {
  withComponents?: boolean
  rankTypes?: any[]
  cateId?: string
  id?: string
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'middle' | 'large' | 'biggest'
}

// 独立的个股排行面板组件
export function StockRankPanel(props: {
  loading?: boolean
  stockTypes: any[]
  indicatorOptions: any[]
  currentStockType: string
  currentIndicator: string
  stockData: StockRank[]
  onUpdate: () => void
  onStockTypeChange: (key: string) => void
  onIndicatorChange: (value: string) => void
  className?: string
  height?: string
}) {
  const tabWrapRef = useRef<HTMLDivElement>(null)
  const { symbol, setSymbol } = React.useContext(SearchContext)
  // 表格列配置 - 针对个股数据
  const columns = [
    {
      title: '排名',
      dataIndex: '序号',
      key: '序号',
      width: 46,
      render: (text: string, record: StockRank, index: number) => (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-bold">{index + 1}</span>
        </div>
      )
    },
    {
      title: '名称',
      dataIndex: '股票名称',
      key: '股票名称',
      // minWidth: 100,
      render: (text: string, record: StockRank) => (
        <div>
          <div className="text-white font-medium line-clamp-1">
            {record.股票名称 || record.名称}
          </div>
          <p className="text-[12px] text-white/50">
            {record.代码 || '--'}
            <Button
              onClick={() => {
                navigator.clipboard.writeText(record.代码)
              }}
              type="link"
              icon={<CopyOutlined />}></Button>
          </p>
        </div>
      )
    },
    {
      title: '最新价',
      dataIndex: '最新价',
      key: '最新价',
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value || '--'}</span>
      )
    },
    {
      title: '涨跌幅',
      dataIndex: '涨跌幅',
      key: '涨跌幅',
      sorter: {
        compare: (a, b) => a.涨跌幅 - b.涨跌幅
      },
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span
          className={
            value > 0
              ? 'text-red-400'
              : value < 0
                ? 'text-green-400'
                : 'text-white'
          }>
          {value > 0 ? '+' : ''}
          {value || '--'}%
        </span>
      )
    },
    {
      title: '涨跌额',
      dataIndex: '涨跌额',
      key: '涨跌额',
      sorter: {
        compare: (a, b) => a.涨跌额 - b.涨跌额
      },
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) =>
        value ? (
          <span
            className={
              value > 0
                ? 'text-red-400'
                : value < 0
                  ? 'text-green-400'
                  : 'text-white'
            }>
            {value > 0 ? '+' : ''}
            {value}
          </span>
        ) : (
          '--'
        )
    }
  ]

  const TabContent = (props: { data?: StockRank[]; height?: string }) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    useTimeout(() => setLoaded(true), 500)

    return (
      <Spin spinning={!loaded && !props.data?.length}>
        <Table
          dataSource={props.data}
          columns={columns}
          scroll={
            props.height
              ? { y: props.height, x: 'max-content' }
              : { x: 'max-content' }
          }
          // sticky={{ offsetHeader: 64, getContainer: () => tabWrapRef.current }}
          rowKey={(record) => record?.股票名称 || record?.名称}
          pagination={false}
          size="small"
          className="bg-transparent"
          components={{
            header: {
              cell: (props: any) => (
                <th
                  {...props}
                  className="!bg-transparent !border-b-white/20 !text-white/70"
                />
              )
            },
            body: {
              row: (props: any) => (
                <tr
                  {...props}
                  className="!bg-transparent hover:!bg-white/5 !border-b-white/10"
                />
              ),
              cell: (props: any) => (
                <td
                  {...props}
                  className="!bg-transparent !border-b-white/10 !text-white"
                />
              )
            }
          }}
          locale={{
            emptyText: (
              <Empty
                description={<span className="!text-white">暂无数据~</span>}
              />
            )
          }}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                setSymbol?.(record.代码)
              },
              onClick: () => {
                setSymbol?.(record.代码)
              }
            }
          }}
        />
      </Spin>
    )
  }

  return (
    <ThemeProvider
      token={{
        colorBgContainer: 'rgba(0, 0, 0, 0.5)',
        colorText: 'rgba(255, 255, 255, 0.65)',
        colorSplit: 'rgba(0, 0, 0, 0.3)',
        colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
        colorBgElevated: 'rgba(0, 0, 0, 0.8)',
        Select: {
          optionSelectedBg: 'rgba(0, 0, 0, .9)'
        },
        Table: {
          stickyScrollBarBg: 'rgba(0, 0, 0, 0.3)'
        },
        Tabs: {
          itemColor: 'rgba(255, 255, 255, 0.65)'
        }
      }}>
      <App>
        <div
          className={`flex w-full overflow-hidden ${props.className || ''}`}
          ref={(el) => (tabWrapRef.current = el)}>
          <div className="flex flex-col w-full !px-4">
            {/* 使用Tabs组件展示个股排行类型 */}
            <div className="min-h-[160px] w-full h-full">
              <Tabs
                activeKey={props.currentStockType}
                onChange={props.onStockTypeChange}
                tabBarExtraContent={{
                  right: (
                    <div className="flex items-center gap-2 mr-4">
                      {/* 刷新按钮 */}
                      <Button
                        type="text"
                        loading={props.loading}
                        size="small"
                        icon={<ReloadOutlined />}
                        className="cursor-pointer hover:!text-white text-white"
                        onClick={props.onUpdate}
                        title="获取最新数据">
                        刷新
                      </Button>
                      {/* 时间周期选择器放在tabBarExtraContent中 */}
                      <Select
                        size="small"
                        value={props.currentIndicator}
                        onChange={props.onIndicatorChange}
                        options={props.indicatorOptions}
                        className="w-24"
                        styles={{
                          popup: {
                            root: {
                              background: 'rgba(0, 0, 0, 0.8)',
                              backdropFilter: 'blur(10px)'
                            }
                          }
                        }}
                      />
                    </div>
                  )
                }}
                items={props.stockTypes.map((item) => ({
                  label: (
                    <div className="flex items-center gap-1">
                      {item.icon}
                      {item.label}
                    </div>
                  ),
                  key: item.key,
                  disabled: props.loading,
                  children: (
                    <TabContent
                      data={props.stockData?.slice(0, 20)}
                      height={props.height}
                    />
                  )
                }))}
              />
            </div>
          </div>
        </div>
      </App>
    </ThemeProvider>
  )
}

// 个股排行小组件
function StockRankWidget(props: WidgetProp) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  // 个股排行类型配置
  const stockTypes = props.rankTypes || [
    {
      key: 'stock_hot_rank_em',
      label: '人气榜'
    },
    {
      key: 'stock_hot_up_em',
      label: '飙升榜'
    },
    {
      key: 'stock_hk_hot_rank_em',
      label: '人气榜-港股'
    }
  ]

  // 时间周期配置
  const indicatorOptions = [
    { label: '今日', value: '即时' },
    { label: '3日', value: '3日排行' },
    { label: '5日', value: '5日排行' },
    { label: '10日', value: '10日排行' },
    { label: '20日', value: '20日排行' }
  ]

  const [currentStockType, setCurrentStockType] = useState(stockTypes[0].key)
  const [currentIndicator, setCurrentIndicator] = useState('即时')
  const [stockData, setStockData] = useLocalStorageState<StockRank[]>(
    'stock_rank',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )

  // 获取个股排行数据
  const {
    data,
    loading,
    run: fetchStockRank
  } = useRequest(
    async () => {
      const result = await getStockBoardRank({
        code: currentStockType as any,
        symbol:
          stockTypes.find((item) => item.key === currentStockType)?.symbol ||
          undefined
      })
      return result || []
    },
    {
      cacheKey: `stock_rank_${currentStockType}_${currentIndicator}`,
      staleTime: 60 * 1000, // 缓存60秒
      manual: true
    }
  )

  useEffect(() => {
    if (data) {
      setStockData(data)
    }
  }, [data])

  // 初始化加载数据
  useEffect(() => {
    fetchStockRank()
  }, [currentStockType, currentIndicator])

  // 处理数据更新
  const handleUpdate = () => {
    fetchStockRank()
  }

  // 处理个股排行类型切换
  const handleStockTypeChange = (key: string) => {
    setCurrentStockType(key)
  }

  // 处理时间周期切换
  const handleIndicatorChange = (value: string) => {
    setCurrentIndicator(value)
  }

  return (
    <ThemeProvider
      token={{
        colorBgContainer: 'rgba(0, 0, 0, 0.5)',
        // colorText: 'rgba(255, 255, 255, 0.65)',
        colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
        Message: {
          contentBg: 'rgba(0, 0, 0, 0.8)'
        },
        Select: {
          selectorBg: 'rgba(0, 0, 0, 0.65)'
        },
        Tabs: {
          itemColor: 'rgba(255, 255, 255, 0.65)'
        }
      }}>
      {/* 小组件卡片 */}
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full !bg-black/50 !backdrop-blur-md !p-0 !rounded-xl mx-auto`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        <Spin spinning={!stockData.length} wrapperClassName="w-full h-full">
          <div
            className={`h-full w-full ${!props.withComponents ? 'p-4' : ''} min-h-[144px] flex flex-col text-white gap-2`}>
            {!props.withComponents &&
              stockData?.slice(0, 4)?.map((item, index) => (
                <div
                  className={`flex justify-between w-full gap-2 ${props.size === 'large' ? 'flex-row' : 'flex-col'}`}
                  key={item.序号 || index}>
                  <div className="flex justify-between w-full items-center gap-2 flex-1">
                    <span
                      className="flex-1 line-clamp-1"
                      title={item.股票名称 || item.名称}>
                      {item.股票名称 || item.名称}
                    </span>
                    <span className={props.size === 'large' ? 'hidden' : ''}>
                      {item['最新价']}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={props.size === 'large' ? '' : 'hidden'}>
                      {item['最新价']}
                    </span>
                    <span>{item['涨跌额']?.toFixed(2) || ''}</span>
                    <span
                      className={
                        item.涨跌幅 > 0
                          ? 'text-red-500'
                          : item.涨跌幅 < 0
                            ? 'text-green-500'
                            : 'text-white'
                      }>
                      {item.涨跌幅 > 0 ? '+' : ''}
                      {item.涨跌幅}%
                    </span>
                  </div>
                </div>
              ))}
            {!loading && !stockData?.length && (
              <Empty
                description={<span className="!text-white">暂无数据~</span>}
              />
            )}
            {props.size == 'biggest' && (
              <StockRankPanel
                loading={loading}
                stockTypes={stockTypes}
                indicatorOptions={indicatorOptions}
                currentStockType={currentStockType}
                currentIndicator={currentIndicator}
                stockData={stockData}
                onUpdate={handleUpdate}
                onStockTypeChange={handleStockTypeChange}
                onIndicatorChange={handleIndicatorChange}
                {...props}
              />
            )}
          </div>
        </Spin>
      </Card>

      {/* 使用独立的个股排行面板组件 */}
      {show && (
        <Modal
          wrapClassName="!bg-black/30 backdrop-blur-md"
          classNames={{
            header: '!bg-transparent !text-white',
            container: '!overflow-hidden !rounded-xl !p-0 !bg-black/50',
            body: '!py-5'
          }}
          getContainer={() => document.body}
          width={1000}
          footer={null}
          open={visible}
          closeIcon={<CloseOutlined className="!text-white" />}
          onCancel={() => {
            setVisible(false)
            props.update({
              id: props.id,
              props: { size: props.size, cateId: 'stock_rank' }
            })
          }}>
          <StockRankPanel
            loading={loading}
            stockTypes={stockTypes}
            indicatorOptions={indicatorOptions}
            currentStockType={currentStockType}
            currentIndicator={currentIndicator}
            stockData={stockData}
            onUpdate={handleUpdate}
            onStockTypeChange={handleStockTypeChange}
            onIndicatorChange={handleIndicatorChange}
            height="400px"
            {...props}
          />
        </Modal>
      )}
    </ThemeProvider>
  )
}

export default StockRankWidget
