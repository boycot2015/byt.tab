import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  MenuOutlined,
  MinusCircleOutlined,
  MoreOutlined,
  SearchOutlined,
  SkinOutlined
} from '@ant-design/icons'
import { useAsyncEffect, useLocalStorageState, useRequest } from 'ahooks'
import {
  AutoComplete,
  Card,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Spin,
  Tabs
} from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { News } from '~components/widgets/news'
import { getNews } from '~data/news'
import { ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config } from '~types.d'

let scrollTop = 0

function WidgetModal(props: {
  visible: boolean
  source?: string
  id?: string
  onCancel: () => void
  afterOpenChange: (visible: boolean) => void
}) {
  const tabWrapRef = useRef<HTMLDivElement>(null)
  const [news, setNews] = useLocalStorageState<News>('news', {
    defaultValue: { cates: [], list: [] },
    listenStorageChange: true
  })
  const [cateId, setCateId] = useState<string>(news?.cates?.[0]?.id || '')
  const TabContent = (props) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollTop
    }, [])
    return (
      <div
        ref={(el) => el && (scrollRef.current = el)}
        id={`scrollable_${props.id || 'main'}`}
        className="h-[50vh] overflow-auto">
        <Row gutter={[50, 10]} className="w-full">
          {news?.list
            ?.filter((item) => item.title)
            ?.map((item, index) => (
              <Col
                key={item.id || item.index || index}
                span={24}
                md={news?.list?.length >= 50 ? 12 : 24}>
                <a
                  href={item.link || item.href || item.url || ''}
                  target="_blank"
                  className="flex flex-row gap-4 rounded-xl overflow-hidden max-h-[160px] lg:max-h-[120px]">
                  <span className="flex-1 line-clamp-1">
                    {item.index}. {item.title}
                  </span>
                  <span>{item.hotValue}</span>
                </a>
              </Col>
            ))}
        </Row>
      </div>
    )
  }
  const { data, loading } = useRequest(() => getNews({ id: cateId }), {
    refreshDeps: [cateId]
  })
  useEffect(() => {
    setNews({
      ...news,
      list: data || []
    })
  }, [data])
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
      <Modal
        // title={<span className=" !text-white">新闻动态</span>}
        classNames={{
          content: `!bg-black/50 !overflow-hidden backdrop-blur-md`,
          body: '!p-0',
          header: `!bg-transparent`
        }}
        getContainer={() => document.body}
        width={1000}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        afterOpenChange={props.afterOpenChange}
        onCancel={() => props.onCancel()}>
        <div
          className="flex h-[60vh] w-full overflow-hidden"
          ref={(el) => (tabWrapRef.current = el)}>
          <div className="flex-1 overflow-hidden rounded-xl">
            <Spin
              spinning={loading}
              rootClassName="!h-full"
              wrapperClassName="!h-full">
              {news?.cates?.length ? (
                <Tabs
                  defaultActiveKey={cateId}
                  more={{
                    trigger: 'click',
                    getPopupContainer: () => tabWrapRef.current,
                    overlayStyle: {
                      background: 'rgba(0, 0, 0, 0.5)'
                    },
                    icon: <MoreOutlined className="!text-white" />
                  }}
                  onTabClick={(key) => {
                    console.log(key, 'onTabClick')
                    setCateId(key)
                  }}
                  className="text-shadow"
                  items={news?.cates?.map((item, index) => ({
                    label: item.name,
                    key: item.id || index.toString(),
                    // icon: <SkinOutlined className="!text-white" />,
                    icon: (
                      <img
                        width={16}
                        height={16}
                        className="anticon rounded-md overflow-hidden"
                        src={item.icon || ''}
                        alt={item.name || ''}
                      />
                    ),
                    disabled: loading,
                    children: <TabContent id={item.id || index} />
                  }))}
                />
              ) : (
                <TabContent />
              )}
            </Spin>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
