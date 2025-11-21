import {
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined
} from '@ant-design/icons'
import { Button, Card, Carousel, ColorPicker, Input, Tabs } from 'antd'
import type { CarouselRef } from 'antd/lib/carousel'
import type { PlasmoCSConfig } from 'plasmo'
import { useEffect, useRef, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { useStorage } from '@plasmohq/storage/hook'

import { ThemeProvider } from './contents/layouts'
import DateWidget from './contents/widgets/date'
import SettingWidget from './contents/widgets/setting'
import TimeWidget from './contents/widgets/time'
import WeatherWidget from './contents/widgets/weather'

interface ItemType {
  id: number
  name: string
  href?: string
  target?: string
  row?: number
  col?: number
  icon?: React.ReactNode
  component?: React.ReactNode
  closable?: boolean
  editable?: boolean
  children?: ItemType[]
}
interface Config {
  theme: {
    primary: string
  }
}
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
  const [activeKey, setActiveKey] = useState('1')
  const [tabs, setTabs] = useState<ItemType[]>([
    {
      id: 1,
      name: '新闻',
      icon: <AndroidOutlined />,
      children: [
        {
          id: 11,
          icon: <WindowsOutlined />,
          href: 'https://www.baidu.com',
          target: '_blank',
          name: 'shrek'
        },
        {
          id: 12,
          name: '天气',
          component: <WeatherWidget />
        },
        {
          id: 13,
          name: '日历',
          component: <DateWidget />
        },
        {
          id: 14,
          name: '时间',
          component: <TimeWidget />
        },
        {
          id: 15,
          name: '设置',
          component: <SettingWidget />
        }
      ]
    },
    {
      id: 2,
      name: '娱乐',
      icon: <AppleOutlined />,
      children: [
        {
          id: 21,
          name: 'shrek2'
        },
        {
          id: 22,
          name: 'shrek22'
        },
        {
          id: 23,
          name: 'shrek23'
        }
      ]
    },
    {
      id: 3,
      name: '办公',
      icon: <WindowsOutlined />,
      children: [
        {
          id: 31,
          name: 'shrek31'
        },
        {
          id: 32,
          name: 'shrek32'
        },
        {
          id: 33,
          name: 'shrek33'
        },
        {
          id: 34,
          name: 'shrek34'
        }
      ]
    }
  ])
  const carouselRef = useRef<CarouselRef>(null)
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
            className="text-center cursor-pointer">
            {item.component ? (
              item.component
            ) : (
              <Card key={item.id}>
                {item.component || item.icon || item.name}
              </Card>
            )}
            <div className="title">{item.name}</div>
          </a>
        ))}
      </ReactSortable>
    )
  }
  useEffect(() => {
    setPrimary(config.theme.primary)
  }, [config])
  useEffect(() => {
    carouselRef.current?.goTo(Number(activeKey) - 1)
  }, [activeKey])
  return (
    <ThemeProvider colorPrimary={primary}>
      <div className="h-[100vh] lg:overflow-hidden p-5 flex flex-col items-center justify-center">
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
                icon: item.icon,
                children: TabConents(item)
              }
            })}
            onChange={setActiveKey}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default IndexNewtab
