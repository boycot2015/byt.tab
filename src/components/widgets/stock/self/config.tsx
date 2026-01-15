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
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'

import type { Stock } from '~components/widgets/stock'
import type { News } from '~components/widgets/stock/news'
import StockTable from '~components/widgets/stock/self/stockTable'
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
  const [stockData] = useLocalStorageState<Stock[]>('stock_spot_data_self', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [cateId] = useState<string>(props.cateId || '')
  const [stockType, setStockType] = useState<string>('se')
  const [loading, setLoading] = useState<boolean>(false)
  const rankComponent = useMemo(
    () => <StockTable size="biggest" />,
    [stockType]
  )

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
        {props.id == 'symbol_self' ? (
          <div className="min-h-[180px] w-full">{rankComponent}</div>
        ) : null}
      </Spin>
    )
  }
  useUpdateEffect(() => {
    !props.loading && message.success('数据更新成功')
    setLoading(false)
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
            className="flex w-full overflow-hidden"
            ref={(el) => (tabWrapRef.current = el)}>
            <div className="w-full h-full">
              <Spin
                spinning={!stockData || loading}
                rootClassName="!h-full"
                wrapperClassName="!h-full">
                <div className="min-h-[160px] w-full h-full">
                  {cateId === 'symbol_self' && stockData?.length ? (
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
                            className="cursor-pointer mr-8 hover:!text-white text-white"
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
                        children: (
                          <div className="h-[60vh] overflow-auto">
                            <TabContent id={'symbol_self'} data={item.list} />
                          </div>
                        )
                      }))}
                    />
                  ) : null}
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
