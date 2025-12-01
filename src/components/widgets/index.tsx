import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Carousel, Col, message, Modal, Row, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useEffect, useRef, useState } from 'react'

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
  size: ('mini' | 'small' | 'middle' | 'large')[]
  component: string
}
let containerId: string | number = ''
// import { data } from '~data/weather'
const TabConents = (props: {
  key: string
  components: Component[]
  onAdd: (e: React.MouseEvent, item: ItemType) => void
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
  const onCellClick = (e: React.MouseEvent, item: ItemType) => {
    e.preventDefault()
    props.onAdd(e, item)
  }
  return (
    <Row gutter={6}>
      {props.components.map((component) => (
        <Col span={24} sm={12} md={8} xxl={6} key={component.id}>
          <Carousel
            arrows={true}
            key={props.key + '_' + component.id}
            style={{
              perspective: 500,
              transformStyle: 'preserve-3d'
            }}
            draggable={true}
            className="p-5">
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
                  ref={(ref) => parentRefs?.push({ ref })}
                  onClick={(e) =>
                    onCellClick(e, {
                      ...component,
                      props: { size }
                    })
                  }>
                  <div
                    ref={(ref) =>
                      itemRefs?.push({ ref, props: { size, ...component } })
                    }
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'all .2s',
                      transform: 'rotateX(5deg) rotateY(20deg)'
                    }}
                    className="w-full mb-2 h-[144px] overflow-hidden !rounded-xl select-none !flex flex-col cursor-pointer item-center justify-center">
                    <div>
                      {renderComponent(component.component, {
                        withComponents: true,
                        size
                      })}
                    </div>
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
  containerId = props.data?.pid || ''
  const [config] = useStorage<Config>('config')
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appsBase,
    listenStorageChange: true
  })
  const [components, setComponents] = useState<Component[]>([
    {
      id: 'DateWidget',
      ctype: 'hot',
      name: '日历',
      size: ['mini', 'middle', 'large'],
      component: 'DateWidget'
    },
    {
      id: 'TimeWidget',
      ctype: 'common',
      name: '时间',
      size: ['small', 'large'],
      component: 'TimeWidget'
    },
    {
      id: 'WeatherWidget',
      ctype: 'recommend',
      size: ['mini', 'middle', 'large'],
      name: '天气',
      component: 'WeatherWidget'
    }
  ])
  const onAdd = (e, { component, props: data, name }: ItemType) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log(containerId, props.data, data, name)
    let newApps = [...apps]
    newApps.map((item) => {
      if (item.id == (props.data?.pid || containerId)) {
        item.children?.push({
          id:
            containerId +
            '_' +
            Date.now().toString() +
            '_' +
            item.children.length,
          name,
          closable: true,
          props: data,
          chosen: false,
          selected: false,
          component
        })
      }
    })
    setApps([...newApps])
    message.success('添加成功')
  }
  const [tabs, setTabs] = useState<TabsProps['items']>([
    {
      key: 'all',
      label: '全部',
      forceRender: true,
      children: TabConents({
        key: 'all',
        components,
        onAdd
      })
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
        Modal: {
          contentBg: 'rgba(0, 0, 0, 0.8)'
        },
        Tabs: { itemColor: '#fff' }
      }}>
      <Modal
        title={<h3 className="!text-white">添加小组件</h3>}
        wrapClassName="!bg-black/30 backdrop-blur-md"
        classNames={{
          header: '!bg-transparent !text-white',
          content: '!overflow-hidden !rounded-xl !p-3 !bg-black/30',
          body: '!p-0'
        }}
        width={1200}
        footer={null}
        forceRender={true}
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
