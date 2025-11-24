import { Button, Drawer, message } from 'antd'
import { useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  return (
    <ThemeProvider>
      <Drawer
        title="配置"
        open={props.visible}
        onClose={() => props.onCancel()}>
        <h2 style={{ color: '#2563eb', marginBottom: '12px' }}>
          🎉 欢迎使用 byt tab！
        </h2>
      </Drawer>
    </ThemeProvider>
  )
}

export default WidgetModal
