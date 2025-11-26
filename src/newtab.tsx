import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, ColorPicker, ConfigProvider, Input, Tabs } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { useEffect, useRef, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { ReactSortable } from 'react-sortablejs'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import { renderComponent } from '~components'
import WidgetsModal from '~components/widgets'
import ContextMenu, { MENU_ID } from '~components/widgets/context'
import tabsBase from '~data/tabs.json'
import { ThemeProvider } from '~layouts'
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
function IndexNewtab() {
  const [data, setData] = useState('')
  const [config, setConfig] = useStorage<Config>('config', (val) => {
    return (
      val || {
        theme: {
          primary: '#1677ff'
        }
      }
    )
  })
  const [primary, setPrimary] = useState(config.theme.primary)
  const [currentItem, setCurrentItem] = useState<ItemType>()
  const [activeKey, setActiveKey] = useState('1')
  const [tabs, setTabs] = useStorage<ItemType[]>(
    {
      key: 'tabs',
      instance: new Storage({
        area: 'local'
      })
    },
    (val) => {
      return val || tabsBase
    }
  )
  const [visible, setVisible] = useState(false)
  const TabConents = (item: ItemType) => {
    const [list, setList] = useState(item.children || [])
    return (
      <div className="flex flex-wrap gap-1">
        <ReactSortable
          list={list}
          group={item.id + ''}
          key={item.id + ''}
          className="flex flex-wrap gap-2"
          setList={setList}
          onEnd={({ oldIndex, newIndex }) => {
            const newTabList = [...tabs]
            const newList = [...list]
            newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
            newTabList.splice(item.id - 1, 1, { ...item, children: newList })
            setTabs(newTabList)
          }}
          animation={200}>
          {item.children?.map((child) => (
            <a
              href={child.href || '#'}
              target={child.target}
              onContextMenu={(event) =>
                handleContextMenu(event, { ...child, pid: item.id })
              }
              className="cursor-pointer">
              {child.component ? (
                renderComponent(child.component) || child.name
              ) : (
                <ConfigProvider
                  prefixCls="byt"
                  theme={{ components: { Card: { bodyPadding: 14 } } }}>
                  <Card
                    key={child.id}
                    className="text-xl text-center !border-none">
                    {renderComponent(child.icon) || child.name}
                  </Card>
                </ConfigProvider>
              )}
              <div className="title text-center mt-2">{child.name}</div>
            </a>
          ))}
        </ReactSortable>
        ,
        <a href="#" onClick={() => setVisible(true)}>
          <Card className="text-xl text-center !border-none">
            <PlusOutlined />
          </Card>
          <div className="title text-center mt-2">添加</div>
        </a>
      </div>
    )
  }
  const { show } = useContextMenu({
    id: MENU_ID
  })
  function handleContextMenu(event, item) {
    event.preventDefault()
    event.stopPropagation()
    show({
      id: MENU_ID,
      event,
      props: item
    })
    setCurrentItem(item)
  }
  useEffect(() => {
    setPrimary(config.theme.primary)
  }, [config])
  return (
    <ThemeProvider token={{ colorPrimary: primary }}>
      <div className="h-[100vh] lg:overflow-hidden p-5 flex flex-col items-center justify-center backdrop-blur-md">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <h1 className="text-xl font-bold text-center">
              Welcome to byt tab by
            </h1>
            <Button
              color="primary"
              type="link"
              variant="link"
              size="small"
              href="https://www.plasmo.com"
              target="_blank">
              Plasmo
            </Button>
            Extension!
            <ColorPicker
              showText
              value={primary}
              onChange={(color) => setPrimary(color.toHexString())}
            />
            <Button
              type="primary"
              onClick={() =>
                setConfig({
                  ...config,
                  theme: {
                    ...config.theme,
                    primary
                  }
                })
              }>
              保存
            </Button>
            <Button type="link" color="primary" href="/options.html">
              设置
            </Button>
          </div>
          <div className="flex gap-2 w-full lg:w-[1000px]">
            <Input
              onChange={(e) => setData(e.target.value)}
              value={data}
              size="large"
              style={{
                marginBottom: '12px'
              }}
            />
            <Button type="primary" size="large">
              搜索
            </Button>
          </div>
        </div>
        <div className="!px-2 flex-2 w-full max-w-[1200px]">
          <Tabs
            animated
            defaultActiveKey="1"
            activeKey={activeKey}
            items={tabs.map((item) => {
              const id = String(item.id)
              return {
                key: id,
                label: item.name,
                icon: renderComponent(item.icon),
                children: TabConents(item)
              }
            })}
            onChange={setActiveKey}
          />
        </div>
      </div>
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
