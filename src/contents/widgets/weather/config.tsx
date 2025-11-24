import { CloseOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { ThemeProvider } from '~/contents/layouts'
import type { Weather } from '~/contents/widgets/weather'

function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [weather, setWeather] = useStorage<Weather>(
    'weather',
    (val) => val || ({} as Weather)
  )
  return (
    <ThemeProvider>
      <Modal
        title=""
        classNames={{
          content:
            '!overflow-hidden !box-radius-md !p-0 !bg-black/50 backdrop-blur-md',
          body: '!p-5'
        }}
        footer={null}
        open={props.visible}
        closeIcon={<CloseOutlined className="!text-white" />}
        onCancel={() => props.onCancel()}>
        <div className="w-full !text-white">
          <div className="flex w-full gap-5">
            <div>{weather?.location?.city}</div>
            <div>{weather?.weather?.condition}</div>
            <div>{weather?.weather?.temperature}℃</div>
            <div>
              更新于：{new Date(weather?.weather?.updated_at).toLocaleString()}
            </div>
          </div>
          <div className="text-3xl">{weather?.weather?.condition}℃</div>
        </div>
      </Modal>
    </ThemeProvider>
  )
}

export default WidgetModal
