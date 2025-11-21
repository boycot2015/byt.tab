import { Card, message } from 'antd'
import { useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

import Config from './config'

function Widget() {
  const [visible, setVisible] = useState(false)
  return (
    <ThemeProvider>
      <Card
        style={{ color: '#2563eb', marginBottom: '12px' }}
        onClick={() => {
          setVisible(true)
        }}>
        🎉 欢迎使用 byt tab！
      </Card>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
