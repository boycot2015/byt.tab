import { Button, message, Modal } from 'antd'
import { useEffect, useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
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
      <Modal
        title=""
        centered
        open={props.visible}
        onCancel={() => props.onCancel()}
        footer={null}>
        <div className="text-[100px] flex items-center justify-center h-[300px]">
          {time.toLocaleTimeString()}
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
