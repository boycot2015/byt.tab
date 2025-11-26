import { CloseOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import { clock, css, flipClock, theme } from 'flipclock'
import { useMemo, useState } from 'react'

import { ThemeProvider } from '~layouts'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  // const [time, setTime] = useState<any>(new Date())
  const [loading, setLoading] = useState<boolean>(true)
  // const parent = useRef<HTMLDivElement>(null)
  const parent = document.querySelector('#clock')
  useMemo(() => {
    parent &&
      flipClock({
        parent,
        face: clock({
          format: '[hh]:[mm]:[ss]'
        }),
        theme: theme({
          dividers: ':',
          css: css({
            width: '1em',
            height: '1.8em',
            fontSize: '4rem'
          })
        })
      })
    setLoading(false)
  }, [parent])
  return (
    <ThemeProvider>
      <Modal
        title=""
        centered
        open={props.visible}
        loading={loading}
        classNames={{
          content:
            '!overflow-hidden !box-radius-md !p-0 !bg-black backdrop-blur-md',
          body: '!p-5'
        }}
        closeIcon={<CloseOutlined className="!text-white" />}
        onCancel={() => props.onCancel()}
        footer={null}>
        <div
          id="clock"
          className="text-[100px] w-full flex fle-col items-center justify-center text-white min-h-[200px]"></div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
