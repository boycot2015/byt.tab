import { useLocalStorageState } from 'ahooks'
import { Card, ConfigProvider, message, Tabs } from 'antd'
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
import { ThemeProvider } from '~layouts'
import Footer from '~layouts/footer'
import Header from '~layouts/header'
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
const sizeMap = {
  small: 'icon-size-1x1',
  middle: 'icon-size-2x2',
  large: 'icon-size-2x4'
}
function IndexNewtab() {
  const [config] = useStorage<Config>('config', (val) => {
    return (
      val || {
        theme: {
          background: 'https://bing.img.run/rand.php',
          primary: '#1677ff'
        }
      }
    )
  })
  const [primary, setPrimary] = useState(config.theme.primary)
  const [currentItem, setCurrentItem] = useState<ItemType>()
  const [activeKey, setActiveKey] = useState('1')
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appsBase,
    listenStorageChange: true
  })
  const [visible, setVisible] = useState(false)
  const TabConents = (item: ItemType) => {
    const addItem = {
      id: item.id + '' + 'add',
      href: null,
      target: null,
      component: null,
      props: {
        classnames: {
          body: '!bg-black/50 !text-white text-center'
        },
        size: 'small'
      },
      name: '添加小组件',
      icon: 'PlusOutlined'
    }
    const children = item.children.find((_) => _.id == addItem.id)
      ? item.children
      : [...item.children, addItem]
    const [list, setList] = useState(children)
    useEffect(() => {
      setList(children)
    }, [item.children])
    return (
      <div className="app-main">
        <ReactSortable
          list={list}
          group={item.id + ''}
          key={item.id + ''}
          className="app-grid w-full"
          setList={setList}
          onEnd={({ oldIndex, newIndex }) => {
            const newAppsList = [...apps]
            const newList = [...list]
            newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
            newAppsList.splice(Number(item.id) - 1, 1, {
              ...item,
              children: newList
            })
            setApps(newAppsList)
          }}
          animation={200}>
          {children
            .filter((_) => _)
            ?.map((child) => (
              <a
                href={child.href || '#'}
                target={child.target}
                key={child.id}
                onContextMenu={(event) =>
                  handleContextMenu(event, { ...child, pid: item.id })
                }
                className={`cursor-pointer app-item ${sizeMap[child.props?.size || 'small']}`}>
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
                        body: 'w-full h-full !p-3',
                        ...(child.props?.classnames || {})
                      }}
                      onClick={() =>
                        child.name == '添加小组件' && setVisible(true)
                      }
                      className={`app-item-icon !text-[24px] w-[60px] h-[60px] text-center !border-none`}>
                      {renderComponent(child.icon, child.props) || child.name}
                    </Card>
                  </ConfigProvider>
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
  return (
    <ThemeProvider token={{ colorPrimary: primary }}>
      <div
        className={`md:h-[100vh] lg:overflow-hidden p-5 flex flex-col items-center justify-between backdrop-blur-md bg-[url(${config.theme?.background || ''})]`}>
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <Header />
          <Search />
        </div>
        <div className="!px-2 flex-2 w-full max-w-[1200px]">
          <Tabs
            animated
            defaultActiveKey="1"
            activeKey={activeKey}
            items={apps.map((item) => {
              const id = String(item.id)
              return {
                key: id,
                label: item.name,
                icon: renderComponent(item.icon, item.props),
                children: TabConents(item)
              }
            })}
            onChange={setActiveKey}
          />
        </div>
        <Footer />
        <div className="bg absolute top-0 left-0 w-full h-full z-[-1]">
          <img src={config.theme?.background || ''} alt="" />
        </div>
      </div>
      {/* <Gridstack /> */}
      <ContextMenu data={currentItem} />
      {visible && (
        <WidgetsModal
          visible={visible}
          data={currentItem}
          onCancel={() => setVisible(false)}
        />
      )}
    </ThemeProvider>
  )
}

export default IndexNewtab
