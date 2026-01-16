import { CloseOutlined, ReloadOutlined } from '@ant-design/icons'
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
import { useEffect, useRef, useState } from 'react'

import { getStockBoardRank } from '~data/stock'
import { sizeMap, ThemeProvider } from '~layouts'

export interface Stock {
  type: 'se' | 'etf'
  name: '自选' | 'ETF'
  list: {
    序号: string
    名称: string
    代码?: string
    股票代码?: string
    股票名称?: string
    股票简称?: string
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
  }[]
}

type WidgetProp = {
  withComponents?: boolean
  stockType?: string
  cateId?: string
  id?: string
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'middle' | 'large' | 'biggest'
}

// 独立的个股排行面板组件
export function StockPanel(props: {
  loading?: boolean
  stockType: string
  stocks: Stock['list']
  className?: string
  height?: string
}) {
  const tabWrapRef = useRef<HTMLDivElement>(null)

  // 表格列配置 - 针对个股数据
  const columns = [
    {
      title: '名称',
      dataIndex: '股票简称',
      key: '名称',
      render: (text: string, record: Stock['list'][0]) => (
        <div className="flex flex-col gap-1">
          <div>
            <span className="text-white font-bold text-[18px] line-clamp-1">
              {record.股票简称 || record.名称}
            </span>
            <span className="text-white/70 text-sm text-[14px] line-clamp-1">
              {record.股票代码 || '--'}
            </span>
          </div>
        </div>
      )
    },
    {
      title: '现价',
      dataIndex: '最新',
      key: '最新',
      width: 100,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value?.toFixed(2)}</span>
      )
    },
    {
      title: '涨跌幅',
      dataIndex: '涨幅',
      key: '涨幅',
      sortable: true,
      width: 100,
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
      title: '最低',
      dataIndex: '最低',
      key: '最低',
      width: 100,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value?.toFixed(2) || '--'}</span>
      )
    },
    {
      title: '最高',
      dataIndex: '最高',
      key: '最高',
      width: 100,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value?.toFixed(2) || '--'}</span>
      )
    },
    {
      title: '昨收',
      dataIndex: '昨收',
      key: '昨收',
      width: 100,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value?.toFixed(2) || '--'}</span>
      )
    },
    {
      title: '涨跌额',
      dataIndex: '涨跌',
      key: '涨跌',
      width: 100,
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
            {value?.toFixed(2)}
          </span>
        ) : (
          '--'
        )
    }
  ]

  const TabContent = (props: { data?: Stock['list']; height?: string }) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    useTimeout(() => setLoaded(true), 500)
    return (
      <Spin spinning={!loaded && !props.data?.length}>
        <Table
          dataSource={props.data}
          columns={columns}
          scroll={props.height ? { y: props.height } : null}
          rowKey={(record, index) => record.序号 || index?.toString()}
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
        />
      </Spin>
    )
  }

  return (
    <ThemeProvider
      token={{
        colorBgContainer: 'rgba(0, 0, 0, 0.5)',
        colorText: 'rgba(255, 255, 255, 0.65)',
        colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
        colorBgElevated: 'rgba(0, 0, 0, 0.8)',
        Select: {
          optionSelectedBg: 'rgba(0, 0, 0, .9)'
        },
        Tabs: {
          itemColor: 'rgba(255, 255, 255, 0.65)'
        }
      }}>
      <App>
        <div
          className={`flex w-full overflow-hidden ${props.className || ''}`}
          ref={(el) => (tabWrapRef.current = el)}>
          <div className="flex flex-col w-full">
            <div className="min-h-[160px] w-full h-full">
              <TabContent
                data={props.stocks?.slice(0, 20)}
                height={props.height}
              />
            </div>
          </div>
        </div>
      </App>
    </ThemeProvider>
  )
}

// 个股排行小组件
function StockTableWidget(props: WidgetProp) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [currentStocks, setCurrentStocks] = useState<Stock['list']>([])
  const [stockData] = useLocalStorageState<Stock[]>('stock_spot_data_self', {
    defaultValue: [],
    listenStorageChange: true
  })
  useEffect(() => {
    if (stockData) {
      setCurrentStocks(
        stockData.find((item) => item.type === props.stockType)?.list || []
      )
      console.log(
        props.stockType,
        stockData.find((item) => item.type === props.stockType)?.list || [],
        'props.data'
      )
    }
  }, [stockData, props.stockType])
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
      <Spin spinning={!stockData.length} wrapperClassName="w-full h-full">
        <div className="h-full w-full px-2 min-h-[144px] flex flex-col text-white gap-2">
          {!stockData?.length && (
            <Empty
              description={<span className="!text-white">暂无数据~</span>}
            />
          )}
          <StockPanel
            stockType={props.stockType}
            stocks={currentStocks}
            {...props}
          />
        </div>
      </Spin>
    </ThemeProvider>
  )
}

export default StockTableWidget
