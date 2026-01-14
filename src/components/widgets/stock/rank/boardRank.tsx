import {
  CloseOutlined,
  MoreOutlined,
  ReloadOutlined,
  RiseOutlined
} from '@ant-design/icons'
import {
  useLocalStorageState,
  useRequest,
  useTimeout,
  useUpdateEffect
} from 'ahooks'
import {
  App,
  Button,
  Dropdown,
  Empty,
  Modal,
  Select,
  Spin,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd'
import { useEffect, useRef, useState } from 'react'

import { getStockBoardRank } from '~data/stock'
import { ThemeProvider } from '~layouts'

export interface BoardRank {
  序号: string
  名称: string
  今日涨跌幅: number
  '今日主力净流入-净占比': number
  '今日主力净流入-净额': number
  今日主力净流入最大股: string
  板块类型: string
}

type WidgetProp = {
  withComponents?: boolean
  rankTypes?: any[]
  cateId?: string
  id?: string
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'middle' | 'large' | 'biggest'
}

// 独立的排行面板组件 - 可以在任何地方使用
export function RankPanel(props: {
  loading?: boolean
  boardTypes: any[]
  indicatorOptions: any[]
  currentBoardType: string
  currentIndicator: string
  boardData: BoardRank[]
  onUpdate: () => void
  onBoardTypeChange: (key: string) => void
  onIndicatorChange: (value: string) => void
  className?: string
  height?: string
}) {
  const { message } = App.useApp()
  const tabWrapRef = useRef<HTMLDivElement>(null)

  // 表格列配置
  const columns = [
    {
      title: '排名',
      dataIndex: '序号',
      key: '序号',
      width: 60,
      render: (text: string, record: BoardRank, index: number) => (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-bold">{index + 1}</span>
        </div>
      )
    },
    {
      title: '板块名称',
      dataIndex: '名称',
      key: '名称',
      render: (text: string, record: BoardRank) => (
        <div>
          <div className="text-white font-medium line-clamp-1">{text}</div>
          <div className="text-white/70 text-sm">{record.板块类型}</div>
        </div>
      )
    },
    {
      title: '涨跌幅',
      dataIndex: '今日涨跌幅',
      key: '今日涨跌幅',
      sortable: true,
      width: 100,
      align: 'right' as const,
      render: (value: number) => (
        <span className={value > 0 ? 'text-red-400' : 'text-green-400'}>
          {value > 0 ? '+' : ''}
          {value}%
        </span>
      )
    },
    {
      title: '资金流入',
      dataIndex: '今日主力净流入-净额',
      key: '今日主力净流入-净额',
      sortable: true,
      width: 120,
      align: 'right' as const,
      render: (value: number) => (
        <div className={`${value > 0 ? 'text-red-400' : 'text-green-400'}`}>
          {(value / 100000000).toFixed(2)}亿
        </div>
      )
    }
  ]

  const TabContent = (props: { data?: BoardRank[]; height?: string }) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    useTimeout(() => setLoaded(true), 500)

    return (
      <Spin spinning={!loaded && !props.data?.length}>
        <div style={{ overflow: 'auto' }}>
          <Table
            dataSource={props.data}
            columns={columns}
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
        </div>
      </Spin>
    )
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
        Tabs: {
          itemColor: 'rgba(255, 255, 255, 0.65)'
        }
      }}>
      <App>
        <div
          className={`flex w-full overflow-hidden bg-black/50 backdrop-blur-md rounded-xl p-5 ${props.className || ''}`}
          ref={(el) => (tabWrapRef.current = el)}>
          <div className="flex flex-col w-full">
            {/* 使用Tabs组件替代下拉筛选 */}
            <div className="min-h-[160px] w-full h-full">
              <Tabs
                activeKey={props.currentBoardType}
                onChange={props.onBoardTypeChange}
                tabBarExtraContent={{
                  right: (
                    <div className="flex items-center gap-2">
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
                    </div>
                  )
                }}
                items={props.boardTypes.map((item) => ({
                  label: (
                    <div className="flex items-center gap-1">
                      {item.icon}
                      {item.label}
                    </div>
                  ),
                  key: item.key,
                  disabled: props.loading,
                  children: (
                    <TabContent data={props.boardData} height={props.height} />
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

// 排行小组件 - 保持原有功能
function BoardRankWidget(props: WidgetProp) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  // 板块类型配置
  const boardTypes = [
    {
      key: '行业资金流',
      label: '行业板块',
      icon: <RiseOutlined />
    },
    {
      key: '概念资金流',
      label: '概念板块',
      icon: <RiseOutlined />
    },
    {
      key: '地域资金流',
      label: '地域板块',
      icon: <RiseOutlined />
    }
  ]

  // 时间周期配置
  const indicatorOptions = [
    { label: '今日', value: '今日' },
    { label: '5日', value: '5日' },
    { label: '10日', value: '10日' }
  ]

  const [currentBoardType, setCurrentBoardType] = useState(boardTypes[0].key)
  const [currentIndicator, setCurrentIndicator] = useState('今日')
  const [boardData, setBoardData] = useLocalStorageState<BoardRank[]>(
    'stock_board_rank',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )

  // 获取排行数据
  const {
    data,
    loading,
    run: fetchBoardRank
  } = useRequest(
    async () => {
      const result = await getStockBoardRank({
        code: 'stock_sector_fund_flow_rank',
        sector_type: currentBoardType as any,
        indicator: currentIndicator as any
      })
      return result || []
    },
    {
      cacheKey: `stock_board_rank_${currentBoardType}_${currentIndicator}`,
      staleTime: 60 * 1000, // 缓存60秒
      manual: true
    }
  )

  useEffect(() => {
    if (data) {
      setBoardData(data)
    }
  }, [data])

  // 初始化加载数据
  useEffect(() => {
    fetchBoardRank()
  }, [currentBoardType, currentIndicator])

  // 处理数据更新
  const handleUpdate = () => {
    fetchBoardRank()
  }

  // 处理板块类型切换
  const handleBoardTypeChange = (key: string) => {
    setCurrentBoardType(key)
  }

  // 处理时间周期切换
  const handleIndicatorChange = (value: string) => {
    setCurrentIndicator(value)
  }

  return (
    <ThemeProvider>
      {/* 小组件卡片 */}
      <div
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? 'h-full' : 'cursor-pointer'} !border-none !bg-transparent`}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        <Spin spinning={!boardData.length} wrapperClassName="w-full h-full">
          <div className="h-full w-full min-h-[144px]flex flex-col text-white gap-2">
            {boardData?.slice(0, 4)?.map((item, index) => (
              <div
                className="flex justify-between items-center gap-2 mb-4"
                key={item.序号 || index}>
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm opacity-70 w-6 text-center">
                    {index + 1}
                  </span>
                  <span className="flex-1 line-clamp-1" title={item.名称}>
                    {item.名称}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      item.今日涨跌幅 > 0 ? 'text-red-500' : 'text-green-500'
                    }>
                    {item.今日涨跌幅 > 0 ? '+' : ''}
                    {item.今日涨跌幅}%
                  </span>
                  <span className="text-sm opacity-70">
                    {item['今日持股-市值']?.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {!loading && !boardData?.length && (
              <Empty
                description={<span className="!text-white">暂无数据~</span>}
              />
            )}
            {props.size == 'biggest' && (
              <RankPanel
                loading={loading}
                boardTypes={boardTypes}
                indicatorOptions={indicatorOptions}
                currentBoardType={currentBoardType}
                currentIndicator={currentIndicator}
                boardData={boardData}
                onUpdate={handleUpdate}
                onBoardTypeChange={handleBoardTypeChange}
                onIndicatorChange={handleIndicatorChange}
                className="my-custom-class"
                height="400px"
                {...props}
              />
            )}
          </div>
        </Spin>
      </div>

      {/* 使用独立的排行面板组件 */}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          {/* 排行榜面板 */}
          <Modal>
            <RankPanel
              loading={loading}
              boardTypes={boardTypes}
              indicatorOptions={indicatorOptions}
              currentBoardType={currentBoardType}
              currentIndicator={currentIndicator}
              boardData={boardData}
              onUpdate={handleUpdate}
              onBoardTypeChange={handleBoardTypeChange}
              onIndicatorChange={handleIndicatorChange}
              className="my-custom-class"
              height="400px"
              {...props}
            />
          </Modal>
          <button
            onClick={() => setVisible(false)}
            className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition-colors">
            ×
          </button>
        </div>
      )}
    </ThemeProvider>
  )
}

export default BoardRankWidget
