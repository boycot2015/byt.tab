import { CloseOutlined, MoreOutlined } from '@ant-design/icons'
import { useLocalStorageState, useRequest, useTimeout } from 'ahooks'
import { Col, Empty, Modal, Row, Spin, Tabs } from 'antd'
import { useEffect, useRef, useState } from 'react'

import type { News } from '~components/widgets/news'
import { getNews } from '~data/news'
import { ThemeProvider } from '~layouts'

let scrollTop = 0

function WidgetModal(props: {
  visible: boolean
  cateId?: string
  cates?: News[]
  id?: string
  onCancel: (cateId: string, cates: News['list']) => void
  afterOpenChange: (visible: boolean) => void
}) {
  const tabWrapRef = useRef<HTMLDivElement>(null)
  const [news, setNews] = useLocalStorageState<News[]>('news', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [cateId, setCateId] = useState<string>(
    props.cateId || news?.[0]?.id || ''
  )
  const TabContent = (props: { id?: string | number; data?: News['list'] }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollTop
    }, [])
    useTimeout(() => setLoaded(true), 500)
    return (
      <Spin spinning={!loading && !loaded && !props.data?.length}>
        <div
          ref={(el) => el && (scrollRef.current = el)}
          id={`scrollable_${props.id || 'main'}`}
          className="h-[50vh] overflow-auto">
          <Row gutter={[20, 10]} className="w-full">
            {props.data
              ?.filter((item) => item.title)
              ?.map((item, index) => (
                <Col key={item.id || item.index || index} span={24} md={12}>
                  <a
                    href={item.link || item.href || item.url || ''}
                    target="_blank"
                    className="flex flex-row gap-4 rounded-xl overflow-hidden max-h-[160px] lg:max-h-[120px]">
                    <span className="flex-1 line-clamp-1" title={item.title}>
                      {item.index}. {item.title}
                    </span>
                    <span>{item.hotValue}</span>
                  </a>
                </Col>
              ))}
          </Row>
          {!loading && loaded && !props.data?.length && (
            <Empty
              description={<span className="!text-white">暂无数据~</span>}
            />
          )}
        </div>
      </Spin>
    )
  }
  const { data, loading } = useRequest(() => getNews({ id: cateId }), {
    cacheKey: 'news_' + cateId,
    staleTime: 1000 * 60 * 5,
    ready: news?.find((item) => item.id === cateId)?.list?.length == 0
    // refreshDeps: [cateId]
  })
  useEffect(() => {
    if (!news || !news.length) return
    let newNews = [...news]
    newNews = news.map((item) => {
      if (item.id === cateId) {
        return {
          ...item,
          list: data || item?.list || []
        }
      }
      return item
    })
    setNews(newNews)
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
        wrapClassName="!bg-black/30 backdrop-blur-md"
        classNames={{
          header: '!bg-transparent !text-white',
          content: '!overflow-hidden !rounded-xl !p-0 !bg-black/50',
          body: '!p-5'
        }}
        getContainer={() => document.body}
        width={{
          xxl: 1200,
          xl: 1000,
          lg: 800,
          md: 600
        }}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        afterOpenChange={props.afterOpenChange}
        onCancel={() =>
          props.onCancel(
            cateId,
            news?.find((item) => item.id === cateId)?.list || []
          )
        }>
        <div
          className="flex w-full overflow-hidden"
          ref={(el) => (tabWrapRef.current = el)}>
          <div className="flex-1 overflow-hidden rounded-xl">
            <Spin
              spinning={!news}
              rootClassName="!h-full"
              wrapperClassName="!h-full">
              {news && news.length ? (
                <Tabs
                  defaultActiveKey={cateId}
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
                  className="text-shadow"
                  items={news?.map((item, index) => ({
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
                    children: (
                      <Spin spinning={loading}>
                        <TabContent id={item.id || index} data={item.list} />
                      </Spin>
                    )
                  }))}
                />
              ) : null}
            </Spin>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
