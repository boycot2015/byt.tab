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
import { useEffect, useRef, useState } from 'react'
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
  const [page, setPage] = useState(wallpaper?.currentPage || 1)
  const [loading, setLoading] = useState(true)
  const LazyImage = ({ src, alt }) => {
    const imgRef = useRef()

    useEffect(() => {
      const imgElement = imgRef.current

      const handleIntersection = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
            lazyImage.classList.remove('lazy')
            observer.unobserve(lazyImage)
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersection, {
        root: null, // 使用视口作为根
        rootMargin: '0px',
        threshold: 0.1 // 当至少 10% 的图片进入视口时触发
      })

      if (imgElement) {
        observer.observe(imgElement)
      }

      return () => {
        if (imgElement) {
          observer.unobserve(imgElement)
        }
      }
    }, [])

    return (
      <img
        ref={imgRef}
        data-src={src}
        alt={alt}
        className="lazy flex items-center justify-center w-full h-full bg-black/30"
      />
    )
  }
  const TabContent = (props) => {
    return (
      <InfiniteScroll
        scrollThreshold={0.9}
        pullDownToRefresh
        refreshFunction={() => {
          run({
            source: wallpaper?.cate || '',
            id: wallpaper?.id,
            page: 1
          })
        }}
        dataLength={wallpaper?.list?.length || 0}
        next={() => {
          run({
            source: wallpaper?.cate || '',
            id: wallpaper?.id,
            page: page + 1
          })
        }}
        key={props.id || wallpaper.cate || ''}
        hasMore={wallpaper?.list?.length >= pageSize}
        loader={
          <span className="w-full h-[30px] gap-2 flex items-center justify-center">
            <LoadingOutlined />
            加载中...
          </span>
        }
        endMessage={
          wallpaper?.list?.length < pageSize && wallpaper?.list?.length > 12 ? (
            <Divider plain>没有更多了～</Divider>
          ) : null
        }
        scrollableTarget={`scrollable_${props.id || wallpaper.cate || 'main'}`}>
        <Row gutter={[10, 10]} className="w-full">
          {wallpaper?.list
            ?.filter((item) => item.img || item.url)
            ?.map((item) => (
              <Col key={item.id || item.url} sm={12} md={8} lg={6}>
                <div className="flex flex-col rounded-xl overflow-hidden max-h-[160px] lg:max-h-[120px]">
                  <Image
                    src={item.poster || item.url || item.img}
                    alt={item.category}
                    placeholder={
                      <LazyImage
                        src={item.poster || item.img || item.url}
                        alt={item.category}
                      />
                    }
                    preview={{
                      destroyOnHidden: true,
                      imageRender: () =>
                        item.url.includes('.mp4') ? (
                          <video
                            muted
                            autoPlay
                            loop
                            width="100%"
                            src={item.url || item.img}
                          />
                        ) : (
                          <Image preview={false} src={item.url || item.img} />
                        ),
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
      console.log(category, 'category')

      source = category || []
    }
    setWallpaper({
      ...res,
      source,
      currentPage: params?.page || 1,
      cate: params?.source,
      id: params?.id || '0',
      list:
        params.page == 1
          ? [...(res?.list || [])]
          : [...(wallpaper?.list || []), ...(res?.list || [])].filter(
              (el, index, self) =>
                self.findIndex((t) => t.id && t.id == el.id) === index
            )
    } as Wallpaper)
    setLoading(false)
    setPage(params.page)
    return res
  }
  const { run } = useRequest(getWallpaperData, {
    debounceWait: 500,
    manual: true
  })
  const setWallpaperData = (item) => {
    item?.url &&
      setConfig({
        ...config,
        theme: {
          ...config.theme,
          cover: item?.url.includes('.mp4') ? item.img : undefined,
          background: item?.url || ''
        }
      })
    // item?.url &&
    //   document.documentElement.style.setProperty(
    //     '--byt-bg-image',
    //     config.theme.background?.includes('http')
    //       ? `url(${config.theme.background}) center/cover no-repeat fixed`
    //       : config.theme.background
    //   )
  }
  useAsyncEffect(async () => {
    setPage(wallpaper?.currentPage || 1)
    if (wallpaper.list?.length > 0 && wallpaper?.source?.length > 0) {
      setLoading(false)
      return
    }
    await getWallpaperData({
      page: wallpaper?.currentPage || 1,
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
            tabBarExtraContent={{
              left: <span className=" !text-white text-2xl">壁纸库</span>
            }}
            onTabClick={(key) => {
              getWallpaperData({
                source: key,
                size: pageSize,
                page: 1
              })
              setWallpaper({
                ...wallpaper,
                cate: key,
                currentPage: 1,
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
                      currentPage: 1,
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
                  id={'scrollable_' + wallpaper.cate}
                  className="h-[462px] overflow-hidden overflow-y-auto">
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
