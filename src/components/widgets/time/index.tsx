import { Card, message } from 'antd'
import { useEffect, useState } from 'react'

import { sizeMap, ThemeProvider } from '~layouts'

import Config from './config'
import FlipClock from './flipclock'

function Widget(props: {
  withComponents?: boolean
  size?: 'middle' | 'large'
}) {
  const [visible, setVisible] = useState(false)
  const [time, setTime] = useState<any>(new Date())
  useEffect(() => {
    if (props.size === 'large') {
      return () => {}
    }
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
        className={`!overflow-hidden !border-none mx-auto ${sizeMap[props.size || 'small']} ${props.size === 'large' ? '!bg-black' : ''}`}
        classNames={{
          body: `flex !rounded-xl items-center w-full h-full !overflow-hidden justify-center`
        }}
        onClick={() => {
          !props.withComponents && setVisible(true)
        }}>
        {!props.size || props.size === 'middle' ? (
          <div className="text-md font-bold">{time.toLocaleTimeString()}</div>
        ) : (
          <FlipClock
            className="text-md font-bold"
            theme={{ css: { height: '2em', fontSize: '2rem' } }}
          />
        )}
      </Card>
      {visible && (
        <Config visible={visible} onCancel={() => setVisible(false)} />
      )}
    </ThemeProvider>
  )
}

export default Widget
