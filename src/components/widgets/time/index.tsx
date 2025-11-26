import { Card, message } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import { useEffect, useState } from 'react'

import { ThemeProvider } from '~layouts'

import Config from './config'

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
function Widget(props: { withComponents?: boolean }) {
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
        className="rounded-md overflow-hidden !border-none mx-auto"
        onClick={(e) => {
          e.stopPropagation()
          !props.withComponents && setVisible(true)
        }}>
        <div className="text-md font-bold">{time.toLocaleTimeString()}</div>
      </Card>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
