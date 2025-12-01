import { useLocalStorageState } from 'ahooks'
import {
  Button,
  Card,
  ColorPicker,
  ConfigProvider,
  Drawer,
  Input,
  message,
  Tabs
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import appsBase from '~data/apps.json'
import { ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'

const configDefault: Config = {
  ...tabConfig
}

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [config, setConfig] = useStorage<Config>(
    'config',
    (val) => val || configDefault
  )
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appsBase
  })
  const [primary, setPrimary] = useState(
    config?.theme?.primary || configDefault.theme.primary
  )
  return (
    <ThemeProvider>
      <Drawer
        title="配置"
        open={props.visible}
        onClose={() => props.onCancel()}>
        <h2 style={{ color: '#2563eb', marginBottom: '12px' }}>
          🎉 欢迎使用 byt tab！
        </h2>
        <ColorPicker
          showText
          value={primary}
          onChange={(color) => setPrimary(color.toHexString())}
        />
        <Button
          type="primary"
          onClick={() => {
            message.success('保存成功')
            setConfig({
              ...config,
              theme: {
                ...config?.theme,
                primary
              }
            })
          }}>
          保存
        </Button>
        {/* <Button type="link" color="primary" href="/options.html">
          设置
        </Button> */}
        <Button
          type="primary"
          color="danger"
          onClick={() => {
            message.success('重置成功')
            setApps(appsBase)
            setConfig(configDefault)
          }}>
          重置
        </Button>
      </Drawer>
    </ThemeProvider>
  )
}

export default WidgetModal
