import {
  Button,
  Card,
  ColorPicker,
  ConfigProvider,
  Input,
  message,
  Tabs
} from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

export default function Header() {
  return (
    <div className="flex w-full flex-col md:flex-row items-center justify-center gap-4 mb-1 text-white text-shadow">
      <div className="power flex items-center justify-center text-center">
        <h1 className="text-md">Powered by</h1>
        <Button
          color="primary"
          type="link"
          variant="link"
          size="small"
          href="https://www.plasmo.com"
          target="_blank">
          Plasmo
        </Button>
      </div>
      <div className="copyright">
        <h1 className="text-sm font-bold">
          © 2025 Boycot. All rights reserved.
        </h1>
      </div>
    </div>
  )
}
