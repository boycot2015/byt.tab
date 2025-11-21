import { Button, message, Modal } from 'antd'
import { useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  return (
    <ThemeProvider>
      <Modal
        title="配置"
        open={props.visible}
        onCancel={() => props.onCancel()}>
        <h2 style={{ color: '#2563eb', marginBottom: '12px' }}>
          🎉 欢迎使用 byt tab！
        </h2>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
