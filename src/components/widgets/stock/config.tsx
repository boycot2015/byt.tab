import {
  CloseOutlined,
  MoreOutlined,
  ReadOutlined,
  ReloadOutlined,
  StockOutlined
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
  Col,
  Empty,
  Modal,
  Row,
  Spin,
  Tabs,
  Tag,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import type { Stock } from '~components/widgets/stock'
import type { News } from '~components/widgets/stock/news'
import Rank from '~components/widgets/stock/rank/index'
import { ThemeProvider } from '~layouts'

const { Paragraph, Text } = Typography

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
  const [news] = useLocalStorageState<News[]>('stock_news', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [stockData, setStockData] = useLocalStorageState<Stock[]>(
    'stock_spot_data',
    {
      defaultValue: [],
      listenStorageChange: true
    }
  )
  const [cateId, setCateId] = useState<string>(
    props.cateId || news?.[0]?.id || ''
  )
  const [stockType, setStockType] = useState<string>('se')
  const TabContent = (props: {
    id?: string | number
    data?: Stock['list'] | News['list']
  }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollTop
    }, [])
    useTimeout(() => setLoaded(true), 500)
    return (
      <Spin spinning={!loaded && !props.data?.length}>
        {props.id == 'symbol' ? (
          <div className="min-h-[180px]">
            <Row gutter={[10, 10]} className="w-full">
              {props.data
                ?.filter((item) => item['名称'])
                ?.map((item, index) => (
                  <Col
                    key={item['代码'] || index}
                    span={24}
                    sm={12}
                    md={8}
                    lg={6}>
                    <div
                      className={`rounded-xl py-2 shadow-md overflow-hidden ${
                        item['涨跌幅'] > 0
                          ? 'bg-gradient-to-b from-red-200 to-red-100 text-red-500'
                          : 'bg-gradient-to-b from-green-200 to-green-100 text-green-500'
                      }`}>
                      <div
                        className="flex-1 text-center line-clamp-1"
                        title={item['名称']}>
                        {item['名称']}
                      </div>
                      <h3 className="text-center my-1">{item['最新价']}</h3>
                      <div className="flex justify-center gap-2">
                        <span>{item['涨跌额']}</span>
                        <span>
                          {item['最新价'] > item['昨收'] ? '+' : ''}
                          {item['涨跌幅']}%
                        </span>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
            <div className="mt-2">
              <Rank size="biggest" stockType={stockType} />
            </div>
            {loaded && !props.data?.length && (
              <Empty
                description={<span className="!text-white">暂无数据~</span>}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {props.data?.map((item, index) => (
              <div
                className={`flex justify-between gap-2`}
                title={item['具体事项']}
                key={item['序号'] || item['代码'] || index}>
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className={`text-left`}>{item['简称']}</h3>
                  {item['具体事项'] && (
                    <Paragraph
                      ellipsis={{
                        rows: 4,
                        expandable: true,
                        symbol: '查看更多'
                      }}>
                      {item['具体事项']}
                    </Paragraph>
                  )}
                  <div className="flex gap-2">
                    <Tag>{item['事件类型']}</Tag>
                    {dayjs(item['交易日']).format('YYYY-MM-DD')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Spin>
    )
  }
  useUpdateEffect(() => {
    !props.loading && message.success('数据更新成功')
  }, [props.loading])
  return (
    <ThemeProvider
      token={{
        colorBgContainer: 'rgba(0, 0, 0, 0.5)',
        colorText: 'rgba(255, 255, 255, 0.65)',
        colorTextDisabled: 'rgba(255, 255, 255, 0.35)',
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
            content: '!overflow-hidden !rounded-xl !p-0 !bg-black/50',
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
            className="flex w-full overflow-hidden"
            ref={(el) => (tabWrapRef.current = el)}>
            <div className="flex w-full">
              <Tabs
                defaultActiveKey={cateId || 'symbol'}
                indicator={{
                  align: 'start',
                  size: (origin) => origin * 1.5
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
                  setCateId(key)
                }}
                tabPosition="left"
                className="text-shadow"
                items={[
                  {
                    id: 'symbol',
                    icon: <StockOutlined />,
                    name: '股票行情'
                  },
                  {
                    id: 'stockNews',
                    icon: <ReadOutlined />,
                    name: '股票资讯'
                  }
                ]?.map((item, index) => ({
                  label: item.name,
                  key: item.id || index.toString(),
                  icon: item.icon,
                  disabled: !stockData
                }))}
              />
              <div className="flex-1 mt-5 h-full">
                <Spin
                  spinning={!stockData}
                  rootClassName="!h-full"
                  wrapperClassName="!h-full">
                  <div className="min-h-[160px] w-full h-full">
                    {cateId === 'symbol' && stockData?.length ? (
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
                        }}
                        className="text-shadow"
                        items={stockData.map((item, index) => ({
                          label: item.name,
                          key: item.type,
                          icon: item.icon || <StockOutlined />,
                          children: (
                            <div className="h-[50vh] overflow-auto">
                              <TabContent id={'symbol'} data={item.list} />
                            </div>
                          )
                        }))}
                      />
                    ) : (
                      news &&
                      news.length && (
                        <div className="h-[50vh] overflow-auto">
                          <TabContent id={'stock_news'} data={news} />
                        </div>
                      )
                    )}
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </Modal>
      </App>
    </ThemeProvider>
  )
}

export default WidgetModal
