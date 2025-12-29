import {
  MinusCircleOutlined,
  PlusOutlined,
  SkinFilled
} from '@ant-design/icons'
import * as icons from '@ant-design/icons/lib/icons/index'
import { useAsyncEffect, useLocalStorageState } from 'ahooks'
import {
  App,
  Button,
  Card,
  ConfigProvider,
  Input,
  Select,
  Space,
  Tabs
} from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { useEffect, useRef, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { ReactSortable } from 'react-sortablejs'

import { renderComponent } from '~components'
import Search from '~components/Search'
import WidgetsModal from '~components/widgets'
import ContextMenu, { MENU_ID } from '~components/widgets/context'
import { getCurrentJobs } from '~components/widgets/date/config'
import type { Job } from '~components/widgets/date/config'
import SettingModal from '~components/widgets/setting/config'
import type { Wallpaper } from '~components/widgets/wallpaper'
import { addProps, getAppBase } from '~data/apps'
import { sizeMap, ThemeProvider } from '~layouts'
import Footer from '~layouts/footer'
import Header from '~layouts/header'
import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'
import { buildDay } from '~utils'
import job from '~utils/job'

export type PlasmoCSUIAnchor = {
  type: 'overlay' | 'inline'
  element: Element
}
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
  all_frames: true
}

/**
 * 执行元素动画效果
 *
 * 该函数根据指定方向对目标元素及其右侧元素应用缩放和平移动画，
 * 动画完成后重置样式
 *
 * @param {Object} options - 动画配置选项
 * @param {ItemType} options.item - 目标元素对应的数据项
 * @param {string} [options.selector='.app-item'] - 要动画的元素选择器
 * @param {number} [options.duration=300] - 动画持续时间（毫秒）
 * @param {'left'|'right'} [options.direction='left'] - 动画方向
 * @param {Function} [callback] - 动画完成后的回调函数
 */
const animationFN = (
  options: {
    item: ItemType
    selector?: string
    duration?: number
    scale?: number
    direction?: 'left' | 'right'
  },
  callback?: () => void
) => {
  const directionMap = {
    left: '-',
    right: ''
  }
  let timer = null
  const {
    selector = '.app-item',
    direction = 'left',
    duration = 300,
    scale = 0,
    item
  } = options
  let elements = document.querySelectorAll(selector) as unknown as HTMLElement[]
  let currentIndex = 0
  let offsetWidth = 0
  elements.entries().forEach(([index, element]) => {
    element.style.transition = `all ${duration / 1000}s ease`
    if (element.getAttribute('data-id') == item.id) {
      offsetWidth = element.offsetWidth
      if (scale !== 1) element.style.transform = `scale(${scale})`
      currentIndex = index
    }
  })
  elements.entries().forEach(([index, element]) => {
    if (index > currentIndex) {
      element.style.transition = `all ${duration / 2 / 1000}s ${duration / 1000}s ease`
      element.style.transform = `translate3d(${directionMap[direction]}${offsetWidth}px, 0, 0)`
    }
  })
  timer = setTimeout(() => {
    elements = document.querySelectorAll(selector) as unknown as HTMLElement[]
    elements.entries().forEach(([index, element]) => {
      if (index >= currentIndex) {
        element.style.transition = 'none'
        element.style.transform = ''
      }
    })
    callback?.()
    clearTimeout(timer) // 与CSS过渡时间匹配
  }, duration + 100)
}
function IndexTab() {
  const [config, setConfig] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  const [jobs, setJobs] = useLocalStorageState<Job[]>('jobs', {
    defaultValue: [],
    listenStorageChange: true
  })
  const day = buildDay()
  const { message, modal, notification } = App.useApp()
  const [primary, setPrimary] = useState(config.theme.primary)
  const [currentItem, setCurrentItem] = useState<ItemType>()
  const [activeKey, setActiveKey] = useState('1')
  const [toggleClass, setToggleClass] = useState('')
  const [isEdit, setEdit] = useState(false)
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [wallpaper] = useLocalStorageState<Wallpaper>('wallpaper', {
    defaultValue: {
      source: [],
      list: []
    },
    listenStorageChange: true
  })
  const setWallpaper = () => {
    const list = wallpaper.list.filter(
      (source) => source?.url != config.theme.background
    )
    const source = list[Math.floor(Math.random() * list.length)]
    if (source?.url == config.theme.background) {
      setWallpaper()
      return
    }
    setConfig({
      ...config,
      theme: {
        ...config.theme,
        cover: source?.url.includes('.mp4')
          ? source.img || source.poster
          : undefined,
        background: source?.url || list[0]?.url
      }
    })
  }
  const [visible, setVisible] = useState(false)
  const [settingVisible, setSettingVisible] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const { show, hideAll } = useContextMenu({
    id: MENU_ID
  })
  const AppContent = (item: ItemType) => {
    return (
      <div
        className={`md:blur-bg app-main sm:h-[56vh] overflow-hidden sm:overflow-y-auto ${toggleClass}`}
        onContextMenu={(event) =>
          handleContextMenu(event, {
            id: item.id,
            pid: item.id,
            closable: item.closable
          })
        }>
        <ReactSortable
          list={item.children}
          group={item.id + ''}
          key={item.id + ''}
          className="app-grid w-full"
          setList={() => {}}
          onEnd={({ oldIndex, newIndex }) => {
            const newAppsList = [...apps]
            const newList = [...(item.children || [])]
            newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
            newAppsList.splice(Number(item.id) - 1, 1, {
              ...item,
              children: newList
            })
            setApps(
              newAppsList.filter(
                (item, index, self) =>
                  self.findLastIndex((el) => el.id === item.id) == index
              )
            )
          }}
          swapThreshold={1}
          invertSwap={true}
          animation={200}>
          {item.children
            .filter((_) => _)
            ?.map((child) => (
              <a
                href={isEdit ? '#' : child.href || '#'}
                target={isEdit ? undefined : child.target}
                key={child.id}
                data-id={child.id}
                onContextMenu={(event) =>
                  handleContextMenu(event, { ...child, pid: item.id })
                }
                className={`cursor-pointer app-item ${sizeMap[child.props?.size || 'mini']}`}>
                {child.component ? (
                  <div className="app-item-icon">
                    {renderComponent(child.component, {
                      ...child.props,
                      id: child.id,
                      update: updateComponent
                    }) || child.name}
                  </div>
                ) : (
                  <ConfigProvider
                    prefixCls="byt"
                    theme={{ components: { Card: { bodyPadding: 14 } } }}>
                    <Card
                      key={child.id}
                      styles={{
                        body: {
                          backgroundColor: child.backgroundColor || ''
                        }
                      }}
                      classNames={{
                        body: `!w-full !rounded-xl bg-[rgba(255,255,255,0.5)] !overflow-hidden !h-full ${child.icon?.includes('http') ? '!p-0' : '!p-3'}`
                      }}
                      onClick={() => {
                        if (child.name == '添加小组件') {
                          setShowAdd(true)
                          setVisible(true)
                          setCurrentItem({
                            pid: activeKey,
                            icon: 'PlusOutlined',
                            name: '',
                            id: ''
                          })
                        }
                      }}
                      className={`app-item-icon !text-[24px] !w-[60px] !h-[60px] backdrop-blur-md text-center text-white !border-none !bg-transparent`}>
                      {child.icon?.includes('http') ||
                      (child.icon && child.iconType === 'image') ? (
                        <img
                          src={child.icon}
                          className="w-full h-full"
                          style={{
                            objectFit: 'cover',
                            backgroundColor:
                              child.backgroundColor || 'transparent'
                          }}
                          alt={child.name}
                        />
                      ) : (
                        renderComponent(child.icon, {
                          ...child.props,
                          id: child.id
                        }) || (
                          <div className="h-full flex items-center justify-center text-[16px]">
                            {child.icon?.slice(0, 4)}
                          </div>
                        )
                      )}
                    </Card>
                  </ConfigProvider>
                )}
                {child.closable && isEdit && (
                  <div
                    onClick={() => deleteComponent(child)}
                    className="close absolute rounded-full overflow-hidden text-shadow top-[-8px] right-[-8px] text-[#f00] text-[14px] cursor-pointer">
                    <MinusCircleOutlined />
                  </div>
                )}
                <div className="app-item-title title text-center !line-clamp-1 mt-2">
                  {child.name}
                </div>
              </a>
            ))}
        </ReactSortable>
      </div>
    )
  }
  const AddComponent = (props: {
    apps: ItemType[]
    disabled?: boolean
    setApp: (app: ItemType) => void
  }) => {
    let tabName: string = ''
    let tabIcon: string = ''
    const inputRef = useRef(null)
    const [addVisible, setAddVisible] = useState(false)
    const setData = (data: Record<string, any>) => {
      tabName = data.name || tabName
      tabIcon = data.icon || tabIcon
    }
    useEffect(() => {
      if (addVisible && inputRef.current) {
        inputRef.current.focus()
      }
    }, [addVisible])
    return (
      <ThemeProvider
        token={{
          Button: {
            textTextColor: primary,
            textTextHoverColor: primary,
            textTextActiveColor: primary
          },
          colorBorder: 'rgba(0, 0, 0, 0.3)'
        }}>
        <Button
          className="text-shadow"
          type="text"
          size="small"
          disabled={props.disabled}
          onClick={() => {
            modal.confirm({
              title: (
                <div className="flex gap-2">
                  <PlusOutlined style={{ fontSize: '20px', color: primary }} />
                  添加页签
                </div>
              ),
              centered: true,
              okButtonProps: {
                style: {
                  backgroundColor: primary
                }
              },
              cancelButtonProps: {
                style: {
                  borderColor: primary,
                  color: primary
                }
              },
              maskClosable: true,
              closable: true,
              okType: 'primary',
              forceRender: true,
              icon: null,
              content: (
                <ThemeProvider
                  token={{
                    colorPrimary: primary,
                    Input: { hoverBorderColor: primary }
                  }}>
                  <Space.Compact className="py-2 w-full">
                    <Select
                      showSearch
                      filterOption={(inputValue, option) =>
                        option.value
                          ?.toLowerCase()
                          ?.indexOf(inputValue.toLowerCase()) >= 0
                      }
                      notFoundContent="暂无"
                      style={{ width: '20%' }}
                      placeholder="图标"
                      options={Object.keys(icons).map((key) => ({
                        label: (
                          <div className="flex items-center gap-2 justify-center">
                            {/* <span className="line-clamp-1">{key}</span> */}
                            <span className="text-2xl">
                              {renderComponent(key)}
                            </span>
                          </div>
                        ),
                        value: key
                      }))}
                      onChange={(value) => setData({ icon: value })}
                    />
                    <Input
                      ref={inputRef}
                      style={{ width: '80%' }}
                      onChange={(e) => {
                        setData({ name: e.target.value })
                      }}
                      placeholder="请输入页签名称"
                    />
                  </Space.Compact>
                </ThemeProvider>
              ),
              afterOpenChange(open) {
                setAddVisible(open)
              },
              onOk: () => {
                if (!tabName) {
                  message.error('请输入页签名称')
                  return Promise.reject()
                }
                props.setApp({
                  id: Date.now().toString(),
                  closable: true,
                  name: tabName,
                  icon: tabIcon,
                  children: [
                    { ...addProps, id: Date.now().toString() + '_add' }
                  ]
                })
                message.success('添加成功!')
              },
              onCancel: () => {
                setAddVisible(false)
              }
            })
          }}
          icon={<PlusOutlined />}>
          添加页签
        </Button>
      </ThemeProvider>
    )
  }
  const deleteComponent = (item: ItemType) => {
    // 添加删除动画效果
    animationFN({ item, direction: 'left' }, () => {
      setApps(
        apps.map((app) => ({
          ...app,
          children: app.children?.filter((_) => _?.id !== item.id)
        }))
      )
    })
  }
  const deleteAllComponent = (item: ItemType) => {
    const newApps = [...apps].filter((app) => app.id != item.pid)
    setApps([...newApps])
    setActiveKey(apps[0]?.id.toString() + '' || '')
    hideAll()
    message.success('删除成功')
  }
  const updateComponent = (item: Record<string, any>) => {
    setApps(
      apps.map((app) => ({
        ...app,
        children: app.children?.map((_) => ({
          ..._,
          ...(item.id == _?.id ? { ...item } : {})
        }))
      }))
    )
    item.editable && message.success('更新成功')
  }
  function handleContextMenu(event, item: ItemType) {
    event.preventDefault()
    event.stopPropagation()
    show({
      id: MENU_ID,
      event,
      props: {
        ...item,
        addComponent: () => {
          setCurrentItem({
            pid: activeKey,
            icon: 'PlusOutlined',
            name: '',
            id: ''
          })
          setShowAdd(true)
          setVisible(true)
        },
        deleteComponent,
        editComponent: (data) => {
          // setEdit(true)
          setShowAdd(true)
          setVisible(true)
          console.log(data, 'editComponent')
        },
        moveComponent: (item, targetData) => {
          // console.log(item, targetData, 'moveComponent')
          animationFN({ item, direction: 'left' }, () => {
            let newApps = [...apps]
            newApps.map((el) => {
              if (el.id === item.pid) {
                el.children = el.children.filter(
                  (child) => child.id !== item.id
                )
              }
              if (el.id === targetData.id) {
                el.children = [
                  ...el.children,
                  {
                    ...item,
                    id:
                      targetData.id +
                      '_' +
                      Date.now().toString() +
                      '_' +
                      el.children.length +
                      1
                  }
                ]
              }
            })
            setApps(newApps)
            message.success('操作成功')
          })
        },
        editAllComponent: (data) => {
          // console.log(data, 'editAllComponent')
          setEdit(!isEdit)
        },
        deleteAllComponent,
        openSetting: () => {
          setSettingVisible(true)
        },
        resizeComponent: (data, size) => {
          let currentSize = data.props?.size
          let direction: 'left' | 'right' = 'left'
          if (currentSize == 'large') {
            direction = 'left'
          } else if (currentSize == 'mini') {
            direction = 'right'
          } else if (
            currentSize == 'small' &&
            (size == 'large' || size == 'middle')
          ) {
            direction = 'right'
          } else if (currentSize == 'small' && size == 'mini') {
            direction = 'left'
          } else if (
            currentSize == 'middle' &&
            (size == 'small' || size == 'mini')
          ) {
            direction = 'left'
          } else if (currentSize == 'middle' && size == 'large') {
            direction = 'right'
          }
          animationFN({ item: data, direction, scale: 1 }, () => {
            let newApp = [...apps]
            setApps(
              newApp.map((item) => {
                item.children = item.children?.map((child) => {
                  if (child.id == data.id) {
                    return {
                      ...child,
                      props: { ...(child.props || {}), size }
                    }
                  }
                  return child
                })
                return item
              })
            )
          })
        }
      }
    })
    setCurrentItem(item)
  }
  const initTheme = (delay = 300) => {
    let background = config.theme.background || ''
    let image = config.theme.cover ? new Audio() : new Image()
    const wrapper = document.querySelector('.wallpaper') as HTMLBodyElement
    image.src = background || ''
    let timer = null
    wrapper.classList.add('change')
    image.onload = () => {
      if (
        config.theme.festival &&
        config.theme.festival.open &&
        day.customFestivals.length
      ) {
        background = config.theme.festival?.url || background
      }
      console.log(background)
      timer = setTimeout(() => {
        if (!background?.includes('.mp4')) {
          wrapper.style.backgroundImage = `url(${config.theme.cover || background})`
        }
        wrapper.classList.remove('change')
      }, delay)
    }
    return () => {
      clearTimeout(timer)
    }
  }
  useEffect(() => {
    setPrimary(config.theme.primary)
  }, [config])
  useEffect(() => {
    setCurrentItem({
      pid: activeKey,
      ...apps.find((item) => item.id == activeKey)
    })
  }, [activeKey])
  useAsyncEffect(async () => {
    setConfig({
      ...config
    })
    if (apps.length) return
    const appBase = await getAppBase()
    setApps([...appBase])
  }, [])
  useEffect(() => {
    initTheme()
  }, [config.theme.background, config.theme.festival])
  useEffect(() => {
    initTheme(10)
  }, [config.theme.cover])
  useEffect(() => {
    let dailyJobs = getCurrentJobs(jobs, buildDay())
    dailyJobs.map((el) => {
      let cron = `0 0 0 * * *`
      let jobInstance = job(cron, () => {
        notification.success({
          placement: 'topRight',
          closable: true,
          message: el.title,
          duration: 0,
          description: el.content
        })
      })
      return () => {
        jobInstance.stop()
      }
    })
  }, [])
  return (
    <ThemeProvider
      token={{
        colorPrimary: primary,
        Tabs: { itemColor: 'rgba(255, 255, 255, 0.8)' }
      }}>
      <div
        className="sm:h-[100vh] overflow-hidden relative"
        onDoubleClick={(e) => {
          e.stopPropagation()
          if (isEdit) return
          setToggleClass(toggleClass === 'simple' ? '' : 'simple')
        }}>
        <div
          onContextMenu={(event) =>
            handleContextMenu(event, { id: '', closable: false })
          }
          onDoubleClick={() => {
            setEdit(false)
          }}
          className={`relative z-[2] h-full px-5 pb-5 sm:pb-2 pt-5 flex flex-col items-center justify-center`}>
          <div className="flex flex-1 flex-col items-center justify-center w-full">
            <Header />
            <Search />
          </div>
          <div className={`flex-2 w-full max-w-[1200px] app-tab-main relative`}>
            <Tabs
              animated={{
                inkBar: true,
                tabPane: true
              }}
              defaultActiveKey="1"
              activeKey={activeKey}
              tabBarExtraContent={
                <AddComponent
                  apps={apps}
                  disabled={toggleClass === 'simple'}
                  setApp={(app) => {
                    let newApps = [...apps]
                    newApps.push({ ...app })
                    setActiveKey(app.id as string)
                    setCurrentItem({ ...app, pid: app.id })
                    setApps(newApps)
                  }}
                />
              }
              items={apps.map((item) => {
                const id = String(item.id)
                return {
                  key: id,
                  disabled: toggleClass === 'simple',
                  label: <span className="text-shadow">{item.name}</span>,
                  icon: (
                    <span className="text-shadow">
                      {renderComponent(item.icon, {
                        ...item.props,
                        id: item.id
                      })}
                    </span>
                  ),
                  children: AppContent(item)
                }
              })}
              onChange={setActiveKey}
            />
          </div>
          <Footer />
          <div className="fixed top-[-10px] right-5 z-[999]" title="更换壁纸">
            <div className="flex flex-col items-center">
              <div className="line w-[2px] h-[40px] bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.5)]"></div>
              <Button
                type="primary"
                variant="text"
                onClick={() =>
                  (!day.customFestivals?.length ||
                    !config.theme.festival?.open) &&
                  setWallpaper()
                }>
                {day.customFestivals?.length ? day.dateIcon : <SkinFilled />}
              </Button>
            </div>
          </div>
        </div>
        {config.theme.background?.includes('.mp4') ? (
          <video
            poster={config.theme.cover}
            src={config.theme.background}
            className={`wallpaper-video wallpaper`}
            autoPlay
            loop
            muted></video>
        ) : (
          <div className={`wallpaper`}></div>
        )}
      </div>
      <ContextMenu data={currentItem} isEdit={isEdit} />
      {showAdd && (
        <WidgetsModal
          visible={visible}
          data={currentItem}
          onUpdate={updateComponent}
          afterOpenChange={(open) => {
            !open && setShowAdd(false)
          }}
          onCancel={() => {
            setVisible(false)
          }}
        />
      )}
      <SettingModal
        visible={settingVisible}
        onCancel={() => {
          setSettingVisible(false)
        }}
      />
    </ThemeProvider>
  )
}

export default () => {
  return (
    <ThemeProvider>
      <App message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
        <IndexTab />
      </App>
    </ThemeProvider>
  )
}
