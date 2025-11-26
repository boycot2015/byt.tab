import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { Card, Col, Modal, Row } from 'antd'
import { useState } from 'react'

import { Storage } from '@plasmohq/storage'
import { useStorage } from '@plasmohq/storage/hook'

import { renderComponent } from '~components'
import tabsBase from '~data/tabs.json'
import { ThemeProvider } from '~layouts'
import type { Config, ItemType } from '~types'

// import { data } from '~data/weather'

const components = [
  {
    id: 'DateWidget',
    name: '日历',
    component: 'DateWidget'
  },
  {
    id: 'TimeWidget',
    name: '时间',
    component: 'TimeWidget'
  },
  {
    id: 'WeatherWidget',
    name: '天气',
    component: 'WeatherWidget'
  }
]

function WidgetModal(props: {
  visible: boolean
  onCancel: () => void
  data: ItemType
}) {
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
  const onAdd = (
    e,
    { component, name }: { component: string; name: string }
  ) => {
    e.preventDefault()
    console.log(props.data, component, name)
    let newTabs = [...tabs]
    newTabs.map((item) => {
      if (item.id == props.data?.pid) {
        item.children?.push({
          id: Date.now(),
          name,
          component
        })
      }
    })
    setTabs([...newTabs])
  }
  return (
    <ThemeProvider>
      <Modal
        title=""
        classNames={{
          content:
            '!overflow-hidden !rounded-md !p-0 !bg-black/50 backdrop-blur-md',
          body: '!p-5'
        }}
        width={800}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        onCancel={() => props.onCancel()}>
        <div className="flex gap-2">
          {components.map((component) => (
            <Card
              key={component.id}
              className="rounded-md overflow-hidden !border-none !bg-transparent"
              classNames={{
                body: `!bg-transparent`
              }}>
              <div
                onClick={(e) => onAdd(e, component)}
                className="w-full cursor-pointer item-center justify-center">
                {renderComponent(component.component, { withComponents: true })}
                <div className="text-center text-md text-white mt-2">
                  {component.name}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
