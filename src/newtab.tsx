import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useLocalStorageState, useSetState } from 'ahooks'
import {
  Button,
  Card,
  ConfigProvider,
  Input,
  message,
  Modal,
  Space,
  Tabs
} from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { Component, useEffect, useRef, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { ReactSortable } from 'react-sortablejs'

import { useStorage } from '@plasmohq/storage/hook'

import { renderComponent } from '~components'
import Search from '~components/Search'
import WidgetsModal from '~components/widgets'
import ContextMenu, { MENU_ID } from '~components/widgets/context'
import appsBase from '~data/apps.json'
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
const addData = {
  href: null,
  target: null,
  component: null,
  props: {
    style: {
      fontSize: '20px'
    },
    size: 'mini'
  },
  name: '添加小组件',
  icon: 'PlusOutlined'
}
function IndexNewtab() {
  const [config] = useStorage<Config>('config', (val) => {
    return val || tabConfig
  })
  const [primary, setPrimary] = useState(config.theme.primary)
  const [currentItem, setCurrentItem] = useState<ItemType>()
  const [activeKey, setActiveKey] = useState('1')
  const [isEdit, setEdit] = useState(false)
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appsBase,
    listenStorageChange: true
  })
  const [visible, setVisible] = useState(false)
  const AddComponent = (props: {
    apps: ItemType[]
    setApp: (app: ItemType) => void
  }) => {
    let tabName: string = ''
    const Content = (props) => {
      return (
        <ThemeProvider
          token={{
            colorPrimary: primary,
            Input: { hoverBorderColor: primary }
          }}>
          <div className="py-2">
            <Input
              style={{ width: '100%' }}
              onChange={(e) => {
                props.setData(e.target.value)
              }}
              placeholder="请输入tab名称"
            />
          </div>
        </ThemeProvider>
      )
    }
    const setData = (data: string) => {
      tabName = data
    }
    return (
      <ThemeProvider
        token={{
          colorPrimary: primary,
          Button: {
            textTextColor: primary,
            primaryColor: primary
          }
        }}>
        <Button
          className="absolute right-0 top-3 text-shadow"
          type="text"
          onClick={() => {
            Modal.confirm({
              title: '添加tab',
              okButtonProps: {
                style: {
                  backgroundColor: primary
                }
              },
              okType: 'primary',
              forceRender: true,
              icon: (
                <ThemeProvider
                  token={{
                    colorPrimary: primary,
                    Button: { textTextColor: primary, textHoverBg: '#fff' }
                  }}>
                  <Button type="text" size="small">
                    <PlusOutlined style={{ fontSize: '20px' }} />
                  </Button>
                </ThemeProvider>
              ),
              content: Content({ setData }),
              onOk: () => {
                if (!tabName) {
                  message.error('请输入tab名称')
                  return Promise.reject()
                }
                props.setApp({
                  id: Date.now().toString(),
                  name: tabName,
                  children: [{ ...addData, id: Date.now().toString() + '_add' }]
                })
              },
              onCancel: () => {}
            })
          }}
          icon={<PlusOutlined />}>
          添加
        </Button>
      </ThemeProvider>
    )
  }
  const TabConents = (item: ItemType) => {
    return (
      <div
        className="app-main min-h-[48vh] md:max-h-[60vh]"
        onContextMenu={(event) =>
          handleContextMenu(event, { id: item.id, pid: item.id })
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
                href={child.href || '#'}
                target={child.target}
                key={child.id}
                onContextMenu={(event) =>
                  handleContextMenu(event, { ...child, pid: item.id })
                }
                className={`cursor-pointer app-item ${sizeMap[child.props?.size || 'mini']}`}>
                {child.component ? (
                  <div className="app-item-icon">
                    {renderComponent(child.component, child.props) ||
                      child.name}
                  </div>
                ) : (
                  <ConfigProvider
                    prefixCls="byt"
                    theme={{ components: { Card: { bodyPadding: 14 } } }}>
                    <Card
                      key={child.id}
                      classNames={{
                        body: '!w-full !rounded-xl !overflow-hidden !h-full !p-3 !bg-[rgba(255,255,255,0.5)]'
                      }}
                      onClick={() =>
                        child.name == '添加小组件' && setVisible(true)
                      }
                      className={`app-item-icon !text-[24px] !w-[60px] !h-[60px] backdrop-blur-md text-center text-white !border-none !bg-transparent`}>
                      {renderComponent(child.icon, child.props) || child.name}
                    </Card>
                  </ConfigProvider>
                )}
                {child.closable && isEdit && (
                  <div className="close absolute rounded-full overflow-hidden text-shadow top-[-8px] right-[-8px] text-[#f00] text-[14px] cursor-pointer">
                    <MinusCircleOutlined />
                  </div>
                )}
                <div className="app-item-title title text-center mt-2">
                  {child.name}
                </div>
              </a>
            ))}
        </ReactSortable>
      </div>
    )
  }
  const { show } = useContextMenu({
    id: MENU_ID
  })
  function handleContextMenu(event, item: ItemType) {
    event.preventDefault()
    event.stopPropagation()
    show({
      id: MENU_ID,
      event,
      props: {
        ...item,
        addComponent: () => setVisible(true),
        deleteComponent: () => {
          setApps(
            apps.map((app) => ({
              ...app,
              children: app.children?.filter((_) => _?.id !== item.id)
            }))
          )
          message.success('删除成功')
        },
        editComponent: () => {
          // setEdit(true)
        },
        editAllComponent: () => {
          setEdit(true)
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
  useEffect(() => {
    setApps(
      apps.map((app) => {
        const children = app.children?.find((_) => _.id == app.id + '_add')
          ? app.children || []
          : [
              ...(app.children || []),
              {
                id: app.id + '_add',
                ...addData
              }
            ]
        return {
          ...app,
          children
        }
      })
    )
  }, [])
  return (
    <ThemeProvider
      token={{
        colorPrimary: primary,
        Tabs: { itemColor: 'rgba(255, 255, 255, 0.8)' }
      }}>
      <div
        className={`md:h-[100vh] lg:overflow-hidden p-5 flex flex-col items-center justify-between`}>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <Header />
          <Search />
        </div>
        <div className="!px-2 flex-2 w-full max-w-[1200px] relative">
          <Tabs
            animated
            defaultActiveKey="1"
            activeKey={activeKey}
            items={apps.map((item) => {
              const id = String(item.id)
              return {
                key: id,
                label: <span className="text-shadow">{item.name}</span>,
                icon: (
                  <span className="text-shadow">
                    {renderComponent(item.icon, item.props)}
                  </span>
                ),
                children: TabConents(item)
              }
            })}
            onChange={setActiveKey}
          />
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
        </div>
        <Footer />
        {/* <div className="bg absolute top-0 left-0 w-full h-full z-[-1]">
          <img src={config.theme?.background || ''} alt="" />
        </div> */}
      </div>
      {/* <Gridstack /> */}
      <ContextMenu data={currentItem} />
      <WidgetsModal
        visible={visible}
        data={currentItem}
        onCancel={() => setVisible(false)}
      />
    </ThemeProvider>
  )
}

export default IndexNewtab
