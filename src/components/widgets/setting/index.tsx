import { SettingOutlined } from '@ant-design/icons'
import { Card, ConfigProvider } from 'antd'
import { useState } from 'react'

import { ThemeProvider } from '~layouts'

import Config from './config'

function Widget() {
  const [visible, setVisible] = useState(false)
  return (
    <ThemeProvider>
      <ConfigProvider
        prefixCls="byt"
        theme={{ components: { Card: { bodyPadding: 14 } } }}>
        <Card
          className="text-xl"
          onClick={() => {
            setVisible(true)
          }}>
          <SettingOutlined />
        </Card>
      </ConfigProvider>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
