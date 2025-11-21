import { Button, message, Popover } from 'antd'
import { useState } from 'react'

import { ThemeProvider } from '~/contents/layouts'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  return (
    <ThemeProvider>
      <Popover
        title="配置"
        open={props.visible}
        onOpenChange={() => props.onCancel()}>
        <h2 style={{ color: '#2563eb', marginBottom: '12px' }}>
          🎉 欢迎使用 byt tab！
        </h2>
      </Popover>
    </ThemeProvider>
  )
}

export default WidgetModal
