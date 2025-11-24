import { Card, message } from 'antd'
import { useEffect, useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

import Config from './config'

function Widget() {
  const [visible, setVisible] = useState(false)
  const [time, setTime] = useState<any>(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <ThemeProvider>
      <Card
        onClick={() => {
          setVisible(true)
        }}>
        <div className="text-md">{time.toLocaleTimeString()}</div>
      </Card>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
