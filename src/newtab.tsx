import {
  MinusCircleOutlined,
  PlusOutlined,
  SkinFilled
} from '@ant-design/icons'
import { useAsyncEffect, useLocalStorageState, useResponsive } from 'ahooks'
import {
  App,
  Button,
  Card,
  ConfigProvider,
  Input,
  message,
  Modal,
  Tabs
} from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { Component, useEffect, useRef, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { ReactSortable } from 'react-sortablejs'

import { renderComponent } from '~components'
import Search from '~components/Search'
import WidgetsModal from '~components/widgets'
import ContextMenu, { MENU_ID } from '~components/widgets/context'
import SettingModal from '~components/widgets/setting/config'
import type { Wallpaper } from '~components/widgets/wallpaper'
import { wallpaperSources } from '~components/widgets/wallpaper/config'
import { addProps, getAppBase } from '~data/apps'
import { sizeMap, ThemeProvider } from '~layouts'
import Footer from '~layouts/footer'
import Header from '~layouts/header'
import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'

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
function IndexTab() {
  const [config, setConfig] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  const { message, modal } = App.useApp()
  const [primary, setPrimary] = useState(config.theme.primary)
  const [currentItem, setCurrentItem] = useState<ItemType>()
  const [activeKey, setActiveKey] = useState('1')
  const [isEdit, setEdit] = useState(false)
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [wallpaper] = useLocalStorageState<Wallpaper>('wallpaper', {
    defaultValue: {
      source: wallpaperSources,
      list: []
    },
    listenStorageChange: true
  })
  const setWallpaper = () => {
    const source =
      wallpaper.list[Math.floor(Math.random() * wallpaper.list.length)]
    if (source?.url == config.theme.background) {
      setWallpaper()
      return
    }
    setConfig({
      ...config,
      theme: {
        ...config.theme,
        background: source?.url || ''
      }
    })
  }
  const { md } = useResponsive()
  const [visible, setVisible] = useState(false)
  const [settingVisible, setSettingVisible] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const { show, hideAll } = useContextMenu({
    id: MENU_ID
  })
  const TabConents = (item: ItemType) => {
    return (
      <div
        className="md:blur-bg app-main md:h-[48vh] pb-3"
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
          animation={200}>
          {item.children
            .filter((_) => _)
            ?.map((child) => (
              <a
                href={isEdit ? '#' : child.href || '#'}
                target={isEdit ? undefined : child.target}
                key={child.id}
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
    setApp: (app: ItemType) => void
  }) => {
    let tabName: string = ''
    const setData = (data: string) => {
      tabName = data
    }
    return (
      <ThemeProvider
        token={{
          colorPrimary: primary,
          Button: {
            textTextColor: primary,
            textTextHoverColor: primary,
            textTextActiveColor: primary
          }
        }}>
        <Button
          className="text-shadow"
          type="text"
          size="small"
          onClick={() => {
            modal.confirm({
              title: (
                <div className="flex gap-2">
                  <PlusOutlined style={{ fontSize: '20px', color: primary }} />
                  添加页签
                </div>
              ),
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
                  <div className="py-2">
                    <Input
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        setData(e.target.value)
                      }}
                      placeholder="请输入页签名称"
                    />
                  </div>
                </ThemeProvider>
              ),
              onOk: () => {
                if (!tabName) {
                  message.error('请输入页签名称')
                  return Promise.reject()
                }
                props.setApp({
                  id: Date.now().toString(),
                  closable: true,
                  name: tabName,
                  children: [
                    { ...addProps, id: Date.now().toString() + '_add' }
                  ]
                })
                message.success('添加成功!')
              },
              onCancel: () => {}
            })
          }}
          icon={<PlusOutlined />}>
          添加页签
        </Button>
      </ThemeProvider>
    )
  }
  const deleteComponent = (item: ItemType) => {
    setApps(
      apps.map((app) => ({
        ...app,
        children: app.children?.filter((_) => _?.id !== item.id)
      }))
    )
    message.success('删除成功')
  }
  const deleteAllComponent = (item: ItemType) => {
    const newApps = [...apps].filter((app) => app.id != item.pid)
    setApps([...newApps])
    setActiveKey(apps[0]?.id.toString() + '' || '')
    hideAll()
    message.success('删除成功')
  }
  const updateComponent = (item: Record<string, any>) => {
    console.log(item, 'updateComponent')
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
          let newApps = [...apps]
          newApps.map((el) => {
            if (el.id === item.pid) {
              el.children = el.children.filter((child) => child.id !== item.id)
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
        },
        editAllComponent: (data) => {
          // console.log(data, 'editAllComponent')
          setEdit(!isEdit)
        },
        deleteAllComponent,
        openSetting: () => {
          setSettingVisible(true)
        }
      }
    })
    setCurrentItem(item)
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
    if (apps.length) return
    const appBase = await getAppBase()
    setApps([...appBase])
  }, [])
  useEffect(() => {
    md && document.body.classList.add('scale-in')
    let image = new Image()
    image.src = config.theme.background || ''
    let timer = null
    image.onload = () => {
      clearTimeout(timer)
      config.theme.background &&
        document.documentElement.style.setProperty(
          '--byt-bg-image',
          config.theme.background?.includes('http')
            ? `url(${config.theme.background}) center/100% no-repeat fixed`
            : config.theme.background
        )
      document.body.classList.remove('scale-in')
      document.body.classList.add('scale-out')
      timer = setTimeout(() => {
        document.body.classList.remove('scale-out')
      }, 500)
    }
    return () => {}
  }, [config.theme.background])
  return (
    <ThemeProvider
      token={{
        colorPrimary: primary,
        Tabs: { itemColor: 'rgba(255, 255, 255, 0.8)' }
      }}>
      <div
        onContextMenu={(event) =>
          handleContextMenu(event, { id: '', closable: false })
        }
        onDoubleClick={() => {
          setEdit(false)
        }}
        className={`md:h-[100vh] lg:overflow-hidden p-5 flex flex-col items-center justify-between`}>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <Header />
          <Search />
        </div>
        <div className="!px-2 flex-2 w-full max-w-[1200px] relative">
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
                label: <span className="text-shadow">{item.name}</span>,
                icon: (
                  <span className="text-shadow">
                    {renderComponent(item.icon, {
                      ...item.props,
                      id: item.id
                    })}
                  </span>
                ),
                children: TabConents(item)
              }
            })}
            onChange={setActiveKey}
          />
        </div>
        <Footer />
      </div>
      <div className="fixed top-[-10px] right-10" title="更换壁纸">
        <div className="flex flex-col items-center">
          <div className="line w-[2px] h-[40px] bg-white shadow-[0px_5px_10px_rgba(0,0,0,0.5)]"></div>
          <Button type="primary" variant="text" onClick={() => setWallpaper()}>
            <SkinFilled />
          </Button>
        </div>
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
  const [config] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  return (
    <ThemeProvider>
      <App message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
        <IndexTab />
      </App>
    </ThemeProvider>
  )
}
