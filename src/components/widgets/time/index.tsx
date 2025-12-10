import { Card, message } from 'antd'
import { useEffect, useState } from 'react'

import { sizeMap, ThemeProvider } from '~layouts'

import Clock from './clock'
import Config from './config'
import FlipClock from './flipclock'

function Widget(props: {
  withComponents?: boolean
  size?: 'mini' | 'small' | 'middle' | 'large'
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
        className={`!overflow-hidden !rounded-xl !border-none mx-auto ${sizeMap[props.size || 'small']} ${props.size === 'middle' || props.size === 'large' ? '!bg-black' : ''}`}
        classNames={{
          body: `flex items-center !p-2 w-full h-full !overflow-hidden justify-center`
        }}
        onClick={() => {
          !props.withComponents && setVisible(true)
        }}>
        {!props.size || props.size === 'small' ? (
          <div className="text-[28px] font-bold">
            {time.toLocaleTimeString()}
          </div>
        ) : props.size === 'middle' ? (
          <Clock time={time} />
        ) : (
          <FlipClock
            className="text-md font-bold"
            theme={{ css: { height: '2em', fontSize: '2rem' } }}
          />
        )}
      </Card>
      <Config visible={visible} onCancel={() => setVisible(false)} />
    </ThemeProvider>
  )
}

export default Widget
