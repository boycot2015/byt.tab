import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { Carousel, Col, Modal, Row, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import { renderComponent } from '~components'
import appsBase from '~data/apps.json'
import { ThemeProvider } from '~layouts'
import type { Config, ItemType } from '~types'
import { mouseOverEffect } from '~utils'

interface Component {
  id: string
  ctype: 'hot' | 'common' | 'recommend'
  name: string
  size: ('small' | 'middle' | 'large')[]
  component: string
}
// import { data } from '~data/weather'
const TabConents = (props: {
  key: string
  components: Component[]
  onAdd: (e: React.MouseEvent, component: Component) => void
}) => {
  const [parentRefs] = useState<
    { ref: HTMLDivElement; props?: Record<string, any> }[]
  >([])
  const [itemRefs] = useState<
    { ref: HTMLDivElement; props: Record<string, any> }[]
  >([])
  useEffect(() => {
    parentRefs?.forEach((parent, index) => {
      let multiple = {
        small: 5,
        middle: 10,
        large: 15
      }
      mouseOverEffect(parent.ref, itemRefs[index].ref, {
        multiple: multiple[itemRefs[index].props?.size || 'middle']
      })
    })
    return () => {
      parentRefs?.forEach((parent) => {
        parent.ref?.removeEventListener('mouseover', null)
      })
    }
  }, [parentRefs])
  return (
    <Row gutter={6}>
      {props.components.map((component) => (
        <Col key={component.id} span={24} sm={12} lg={8} xxl={6}>
          <Carousel
            key={props.key + '_' + component.id}
            style={{
              perspective: 500,
              transformStyle: 'preserve-3d'
            }}
            className="p-5"
            draggable>
            {component.size.map((size, index) => (
              <div key={props.key + '_' + component.id + '_' + size}>
                <div
                  style={{
                    perspective: 500,
                    padding: '15px',
                    transition: 'all .2s',
                    transformStyle: 'preserve-3d'
                  }}
                  className="cursor-pointer"
                  ref={(ref) => parentRefs?.push({ ref })}>
                  <div
                    ref={(ref) => itemRefs?.push({ ref, props: { size } })}
                    onClick={(e) => props.onAdd(e, component)}
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'all .2s',
                      transform: 'rotateX(5deg) rotateY(20deg)'
                    }}
                    className="w-full mb-2 h-[140px] select-none !flex flex-col cursor-pointer item-center justify-center">
                    {renderComponent(component.component, {
                      withComponents: true,
                      size
                    })}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="text-center select-none text-md text-white mt-2">
            {component.name}
          </div>
        </Col>
      ))}
    </Row>
  )
}
function WidgetModal(props: {
  visible: boolean
  onCancel: () => void
  data: ItemType
}) {
  const [config] = useStorage<Config>('config')
  const [apps, setApps] = useStorage<ItemType[]>(
    {
      key: 'apps',
      instance: new Storage({
        area: 'local'
      })
    },
    (val) => {
      return val || appsBase
    }
  )
  const [components, setComponents] = useState<Component[]>([
    {
      id: 'DateWidget',
      ctype: 'hot',
      name: '日历',
      size: ['small', 'middle', 'large'],
      component: 'DateWidget'
    },
    {
      id: 'TimeWidget',
      ctype: 'common',
      name: '时间',
      size: ['middle', 'large'],
      component: 'TimeWidget'
    },
    {
      id: 'WeatherWidget',
      ctype: 'recommend',
      size: ['small', 'middle', 'large'],
      name: '天气',
      component: 'WeatherWidget'
    }
  ])
  const onAdd = (
    e,
    { component, name }: { component: string; name: string }
  ) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log(props.data, component, name)
    let newApps = [...apps]
    newApps.map((item) => {
      if (item.id == props.data?.pid) {
        item.children?.push({
          id: Date.now(),
          name,
          component
        })
      }
    })
    setApps([...newApps])
  }
  const [tabs, setTabs] = useState<TabsProps['items']>([
    {
      key: 'all',
      label: '全部',
      children: TabConents({ key: 'all', components, onAdd })
    },
    {
      key: 'recommend',
      label: '推荐',
      forceRender: true,
      children: TabConents({
        key: 'recommend',
        components: components.filter((item) => item.ctype == 'recommend'),
        onAdd
      })
    },
    {
      key: 'common',
      label: '常用',
      forceRender: true,
      children: TabConents({
        key: 'common',
        components: components.filter((item) => item.ctype == 'common'),
        onAdd
      })
    },
    {
      key: 'hot',
      label: '热门',
      forceRender: true,
      children: TabConents({
        key: 'hot',
        components: components.filter((item) => item.ctype == 'hot'),
        onAdd
      })
    }
  ])
  const onTabsChange = (key: string) => {
    console.log(key)
  }
  return (
    <ThemeProvider
      token={{
        colorPrimary: config?.theme?.primary,
        Tabs: { itemColor: '#fff' }
      }}>
      <Modal
        title={<h3 className="!text-white">添加小组件</h3>}
        classNames={{
          header: '!bg-transparent !text-white',
          content:
            '!overflow-hidden !rounded-md !p-3 !bg-black/50 backdrop-blur-md',
          body: '!p-0'
        }}
        width={1000}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        onCancel={() => props.onCancel()}>
        <Tabs
          defaultActiveKey="all"
          animated
          items={tabs}
          onChange={onTabsChange}
        />
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
