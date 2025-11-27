import { CloseOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import { clock, css, flipClock, theme } from 'flipclock'
import { useEffect, useRef } from 'react'

import { ThemeProvider } from '~layouts'

function flipclock(props?: {
  className?: string
  theme?: { css?: Record<string, string> }
  face?: Record<string, string>
}) {
  const parent = useRef(null)
  useEffect(() => {
    parent.current &&
      flipClock({
        parent: parent.current,
        face: clock({
          format: '[hh]:[mm]:[ss]',
          ...(props?.face || {})
        }),
        theme: theme({
          dividers: ':',
          css: css({
            width: '1em',
            height: '1.8em',
            fontSize: '4rem',
            ...(props?.theme?.css || {})
          })
        })
      })
  }, [])
  return (
    <ThemeProvider>
      <div
        ref={(el) => (parent.current = el)}
        className={`${props?.className || 'text-[100px] w-full flex fle-col items-center justify-center text-white min-h-[200px]'}`}></div>
    </ThemeProvider>
  )
}

export default flipclock
