import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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
import type { TableColumnsType } from 'antd'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

import type {
  Stock,
  StockDaily,
  StockData,
  StockInfo
} from '~components/widgets/stock'
import { getStockBoardRank } from '~data/stock'
import { sizeMap, ThemeProvider } from '~layouts'

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void
  listeners?: SyntheticListenerMap
}
type WidgetProp = {
  withComponents?: boolean
  stockType?: string
  cateId?: string
  id?: string
  ref?: HTMLDivElement
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'middle' | 'large' | 'biggest'
}
const RowContext = React.createContext<RowContextProps>({})
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string
}
const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props['data-row-key'] })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {})
  }

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  )

  return (
    <RowContext.Provider value={contextValue}>
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        onClick={(ev) => {
          props.onClick?.(ev)
        }}
        className="!bg-transparent hover:!bg-white/5 !border-b-white/10"
      />
    </RowContext.Provider>
  )
}
const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext)
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined className="!text-white" />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  )
}
// 独立的个股排行面板组件
export function StockPanel(props: {
  loading?: boolean
  stockType: string
  stocks: Stock[]
  className?: string
  height?: string
  ref?: HTMLDivElement
  update?: (args: Stock[]) => void
}) {
  const tabWrapRef = useRef<HTMLDivElement>(null)
  const { message } = App.useApp()
  const [dataSource, setDataSource] = React.useState<Stock[]>(props.stocks)
  const [stockData, setStockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data_self',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.股票代码 === active?.id
        )
        const overIndex = prevState.findIndex(
          (record) => record.股票代码 === over?.id
        )
        // console.log(prevState, activeIndex, overIndex, 'onDragEnd')
        props.update(arrayMove(prevState, activeIndex, overIndex))
        return arrayMove(prevState, activeIndex, overIndex)
      })
    }
  }
  const onDelete = (row) => {
    let newData = [...stockData]
    newData.map((el) => {
      el.list = el.list.filter((i) => i.股票代码 !== row?.股票代码)
    })
    setStockData(newData)
    message.success('取消成功')
  }
  // 表格列配置 - 针对个股数据
  const columns: TableColumnsType<any> = [
    {
      key: 'sort',
      title: '排序',
      align: 'center',
      width: 46,
      render: () => <DragHandle />
    },
    {
      title: '名称',
      dataIndex: '股票简称',
      // minWidth: 100,
      fixed: 'left' as const,
      key: '股票代码',
      render: (text: string, record: StockInfo) => (
        <div className="flex flex-col gap-1">
          <div>
            <span className="text-white font-bold text-[16px] line-clamp-1">
              {record.股票简称 || '--'}
            </span>
            <span className="text-white/70 text-sm text-[14px]">
              {record.股票代码 || '--'}{' '}
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(record.股票代码)
                  message.success('复制成功')
                }}
                type="link"
                icon={<CopyOutlined />}></Button>
              <Button
                onClick={() => onDelete(record)}
                type="link"
                danger
                title={'取消自选'}
                icon={<DeleteOutlined />}></Button>
            </span>
          </div>
        </div>
      )
    },
    {
      title: '现价',
      dataIndex: '最新',
      key: '最新',
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value || '--'}</span>
      )
    },
    {
      title: '涨跌幅',
      dataIndex: '涨幅',
      key: '涨幅',
      sorter: {
        compare: (a, b) => a.涨幅 - b.涨幅
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
      dataIndex: '涨跌',
      key: '涨跌',
      // minWidth: 100,
      sorter: {
        compare: (a, b) => a.涨幅 - b.涨幅
      },
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
    },
    {
      title: '最高',
      dataIndex: '最高',
      key: '最高',
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value || '--'}</span>
      )
    },
    {
      title: '最低',
      dataIndex: '最低',
      key: '最低',
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value || '--'}</span>
      )
    },
    {
      title: '今开',
      dataIndex: '今开',
      key: '今开',
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value || '--'}</span>
      )
    },
    {
      title: '昨收',
      dataIndex: '昨收',
      key: '昨收',
      // minWidth: 80,
      align: 'right' as const,
      render: (value: number) => (
        <span className="text-white">{value || '--'}</span>
      )
    }
  ]

  const [loaded, setLoaded] = useState<boolean>(false)
  useTimeout(() => setLoaded(true), 500)
  useEffect(() => {
    if (props.stocks) {
      setDataSource(props.stocks)
    }
  }, [props.stocks])
  return (
    <ThemeProvider
      token={{
        colorBgContainer: 'rgba(0, 0, 0, 0.5)',
        colorText: 'rgba(0, 0, 0, 0.5)',
        colorSplit: 'rgba(0, 0, 0, 0.3)',
        messageContentBg: 'rgba(0, 0, 0, 0.8)',
        colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
        colorBgElevated: 'rgba(0, 0, 0, 0.8)',
        Message: {
          contentBg: 'rgba(0, 0, 0, 0.8)'
        },
        Select: {
          optionSelectedBg: 'rgba(0, 0, 0, .9)'
        },
        Tabs: {
          itemColor: 'rgba(255, 255, 255, 0.65)'
        }
      }}>
      <div
        className={`flex w-full overflow-hidden ${props.className || ''}`}
        ref={(el) => (tabWrapRef.current = el)}>
        <div className="flex flex-col w-full">
          <div className="w-full h-full">
            <Spin spinning={!loaded && !props.stocks?.length}>
              <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={onDragEnd}>
                <SortableContext
                  items={dataSource.map((i) => i.股票代码)}
                  strategy={verticalListSortingStrategy}>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    sticky={{
                      offsetHeader: 0,
                      getContainer: () => props.ref
                    }}
                    scroll={
                      props.height
                        ? { y: props.height, x: 'max-content' }
                        : { x: 'max-content' }
                    }
                    rowKey={(record: Stock) => record?.股票代码 || record?.名称}
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
                        row: Row,
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
                          description={
                            <span className="!text-white">暂无数据~</span>
                          }
                        />
                      )
                    }}
                  />
                </SortableContext>
              </DndContext>
            </Spin>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

// 个股排行小组件
function StockTableWidget(props: WidgetProp) {
  const [currentStocks, setCurrentStocks] = useState<Stock[]>([])
  const [stockData, setStockData] = useLocalStorageState<StockData[]>(
    'stock_spot_data_self',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  useEffect(() => {
    if (stockData) {
      setCurrentStocks(
        stockData.find((item) => item.type === props.stockType)?.list || []
      )
    }
  }, [stockData, props.stockType])
  return (
    <ThemeProvider>
      <App>
        <Spin spinning={!stockData.length} wrapperClassName="w-full h-full">
          <div className="h-full w-full min-h-[144px] flex flex-col text-white gap-2">
            {!stockData && (
              <Empty
                description={<span className="!text-white">暂无数据~</span>}
              />
            )}
            <StockPanel
              stockType={props.stockType}
              stocks={currentStocks}
              {...props}
              update={(stocks) => {
                setStockData((prev) => {
                  const index = prev.findIndex(
                    (item) => item.type === props.stockType
                  )
                  if (index !== -1) {
                    prev[index].list = stocks
                  }
                  return prev
                })
              }}
            />
          </div>
        </Spin>
      </App>
    </ThemeProvider>
  )
}

export default StockTableWidget
