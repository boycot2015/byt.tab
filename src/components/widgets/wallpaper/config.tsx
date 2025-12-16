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
import type { AutoCompleteProps } from 'antd'
import { useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import type { Wallpaper } from '~components/widgets/wallpaper'
import { getWallpaper, getWallpaperCategory } from '~data/wallpaper'
import { ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config } from '~types.d'

function WidgetModal(props: {
  visible: boolean
  source?: string
  id?: string
  onCancel: () => void
  afterOpenChange?: (visible: boolean) => void
}) {
  const [page, setPage] = useState(1)
  const [config, setConfig] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  const pageSize = 16
  const tabWrapRef = useRef<HTMLDivElement>(null)
  const [wallpaper, setWallpaper] = useLocalStorageState<Wallpaper>(
    'wallpaper',
    {
      defaultValue: {
        source: [],
        list: []
      },
      listenStorageChange: true
    }
  )
  const [loading, setLoading] = useState(true)
  const TabContent = (props) => {
    return (
      <InfiniteScroll
        dataLength={wallpaper?.list?.length || 0}
        next={() => {
          run({
            source: wallpaper?.cate || '',
            id: wallpaper?.id,
            page: page + 1
          })
        }}
        key={props.id || wallpaper?.id || wallpaper?.cate || ''}
        hasMore={wallpaper?.list?.length >= pageSize}
        loader={
          <span className="w-full h-[30px] gap-2 flex items-center justify-center">
            <LoadingOutlined />
            加载中...
          </span>
        }
        endMessage={
          wallpaper?.list?.length < pageSize && (
            <Divider plain>没有更多了～</Divider>
          )
        }
        scrollableTarget={`scrollable_${props.id || wallpaper?.id || wallpaper?.cate || 'main'}`}>
        <Row gutter={[10, 10]} className="w-full">
          {wallpaper?.list
            ?.filter((item) => item.img || item.url)
            ?.map((item) => (
              <Col key={item.id || item.url} span={12} md={8} lg={6}>
                <div className="flex flex-col rounded-xl overflow-hidden max-h-[160px] lg:max-h-[120px]">
                  <Image
                    src={item.url || item.img}
                    alt={item.category}
                    placeholder={
                      <Image
                        preview={false}
                        src={item.img || item.url}
                        width={200}
                      />
                    }
                    preview={{
                      mask: (
                        <div
                          className="flex items-center justify-center w-[30px] h-[30px] bg-black/50 rounded-xl cursor-pointer text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            setWallpaperData(item)
                          }}>
                          <CheckOutlined />
                        </div>
                      ) // 设置自定义文字
                    }}
                    className="!w-full !h-full object-cover"
                  />
                </div>
              </Col>
            ))}
        </Row>
      </InfiniteScroll>
    )
  }
  const getWallpaperData = async (params?: Record<string, any>) => {
    params.page === 1 && setLoading(true)
    let res = await getWallpaper({
      ...params,
      page: params.page,
      size: pageSize
    })
    let source = wallpaper.source
    if (!source || source?.length === 0) {
      let category = await getWallpaperCategory({
        source: 'wallpaper'
      })
      source = category || []
    }
    setWallpaper({
      ...res,
      source,
      cate: params?.source,
      id: params?.id || '0',
      list:
        params.page == 1
          ? [...(res?.list || [])]
          : [...(wallpaper?.list || []), ...(res?.list || [])].filter(
              (el, index, self) =>
                self.findIndex((t) => t.id == el.id || t.url == el.url) ===
                index
            )
    } as Wallpaper)
    setLoading(false)
    setPage(params.page)
    return res
  }
  const { run } = useRequest(getWallpaperData, {
    debounceWait: 3000,
    manual: true
  })
  const setWallpaperData = (item) => {
    item?.url &&
      setConfig({
        ...config,
        theme: {
          ...config.theme,
          background: item?.url || ''
        }
      })
    item?.url &&
      document.documentElement.style.setProperty(
        '--byt-bg-image',
        config.theme.background?.includes('http')
          ? `url(${config.theme.background}) center/cover no-repeat fixed`
          : config.theme.background
      )
  }
  useAsyncEffect(async () => {
    if (wallpaper.list?.length > 0) {
      setLoading(false)
      return
    }
    await getWallpaperData({
      page: 1,
      size: pageSize,
      source: props.source || ''
    })
  }, [])
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
        // title={<span className=" !text-white">设置壁纸</span>}
        classNames={{
          content: `!bg-black/50 h-[500px] !overflow-hidden backdrop-blur-md`,
          body: '!p-0',
          header: `!bg-transparent`
        }}
        centered
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
        onCancel={() => props.onCancel()}>
        <div
          className="flex h-full w-full overflow-hidden"
          ref={(el) => (tabWrapRef.current = el)}>
          <Tabs
            defaultActiveKey={wallpaper?.cate || '0'}
            tabPosition="left"
            onTabClick={(key) => {
              getWallpaperData({
                source: key,
                size: pageSize,
                page: 1
              })
              setWallpaper({
                ...wallpaper,
                cate: key,
                id: '0'
              })
            }}
            items={wallpaper?.source?.map((item) => ({
              label: item.label,
              key: item.value,
              disabled: loading,
              children: null
            }))}
          />
          <div className="flex-1 overflow-hidden rounded-xl">
            <Spin
              spinning={loading}
              key={wallpaper.id}
              rootClassName="!h-full"
              wrapperClassName="!h-full">
              {wallpaper?.cates?.length ? (
                <Tabs
                  defaultActiveKey={wallpaper.id || '0'}
                  more={{
                    trigger: 'click',
                    getPopupContainer: () => tabWrapRef.current,
                    overlayStyle: {
                      background: 'rgba(0, 0, 0, 0.5)'
                    },
                    icon: <MoreOutlined className="!text-white" />
                  }}
                  onTabClick={(key) => {
                    getWallpaperData({
                      id: key,
                      size: pageSize,
                      source: wallpaper.cate,
                      page: 1
                    })
                    setWallpaper({
                      ...wallpaper,
                      id: key
                    })
                  }}
                  className="text-shadow"
                  items={wallpaper?.cates?.map((item, index) => ({
                    label: item.name || item.label,
                    key: item.id || item.value || index.toString(),
                    disabled: loading,
                    children: (
                      <div
                        id={`scrollable_${item.id || 'main'}`}
                        className="h-[400px] overflow-hidden overflow-y-auto">
                        <TabContent id={item.id || item.value || index} />
                      </div>
                    )
                  }))}
                />
              ) : (
                <div
                  id={'scrollable_main_' + wallpaper.cate}
                  className="h-[460px] overflow-hidden overflow-y-auto">
                  <TabContent id={wallpaper.cate} />
                </div>
              )}
            </Spin>
          </div>
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
