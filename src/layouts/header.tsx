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
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
      <h1 className="text-[54px] font-bold text-center">
        {time.toLocaleTimeString()}
      </h1>
    </div>
  )
}
