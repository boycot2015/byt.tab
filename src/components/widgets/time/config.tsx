import { CloseOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import { clock, css, flipClock, theme } from 'flipclock'
import { useEffect, useMemo, useState } from 'react'

import { ThemeProvider } from '~layouts'

import FlipClock from './flipclock'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setLoading(false)
  }, [])
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
        <FlipClock />
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
