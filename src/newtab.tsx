import { Button, Card, ColorPicker, ConfigProvider, Input, Tabs } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { useEffect, useRef, useState } from 'react'
import { useContextMenu } from 'react-contexify'
import { ReactSortable } from 'react-sortablejs'

import { useStorage } from '@plasmohq/storage/hook'

import { renderComponent } from '~/contents/components'

import { ThemeProvider } from './contents/layouts'
import ContextMenu, { MENU_ID } from './contents/widgets/context'
import tabsBase from './data/tabs.json'
import type { Config, ItemType } from './types'

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
    'tabs',
    (val) => val || tabsBase || []
  )
  const [weather, setWeather] = useStorage<any>('weather', (val) => val || {})
  // const carouselRef = useRef<CarouselRef>(null)
  const TabConents = (item: ItemType) => {
    const [list, setList] = useState(item.children || [])
    return (
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
        {item.children?.map((item) => (
          <a
            href={item.href || '#'}
            target={item.target}
            onContextMenu={(event) => handleContextMenu(event, item)}
            className="text-center cursor-pointer">
            {item.component ? (
              renderComponent(item.component) || item.name
            ) : (
              <ConfigProvider
                prefixCls="byt"
                theme={{ components: { Card: { bodyPadding: 14 } } }}>
                <Card key={item.id} className="text-xl">
                  {renderComponent(item.icon) || item.name}
                </Card>
              </ConfigProvider>
            )}
            <div className="title mt-2">{item.name}</div>
          </a>
        ))}
      </ReactSortable>
    )
  }
  const { show } = useContextMenu({
    id: MENU_ID
  })
  function handleContextMenu(event, item) {
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
  useEffect(() => {
    setWeather({})
  }, [tabs])
  // useEffect(() => {
  //   carouselRef.current?.goTo(Number(activeKey) - 1)
  // }, [activeKey])
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
    </ThemeProvider>
  )
}

export default IndexNewtab
