import { useAsyncEffect, useInterval, useLocalStorageState } from 'ahooks'
import { Card, message, theme } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import React, { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import { sizeMap, ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config } from '~types.d'

import WidgetModal from './config'

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
export interface Wallpaper {
  source: {
    value: string
    label: string
    sort: number
  }[]
  count?: number
  total_count?: number
  currentPage?: number
  pageSize?: number
  list?: {
    id?: string
    category?: string
    tag?: string
    url?: string
    status?: string
    live_open?: boolean
    class_id?: string
    img?: string
  }[]
  cates?: {
    id: string
    name: string
    img?: string
    hot_tag: {
      tag: string
      show_tag?: string
      icon?: string
    }[]
  }[]
  scrollTop?: number
  cate?: string // 当前壁纸来源
  id?: string // 当前壁纸分类id
}
function Widget(props: {
  withComponents?: boolean
  source?: string // 壁纸源
  id?: string // 壁纸分类id
  size?: 'mini' | 'small' | 'middle' | 'large'
}) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [config] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  useAsyncEffect(async () => {}, [])
  return (
    <ThemeProvider token={{}}>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full ${props.size === 'mini' ? '!p-1' : ''} !rounded-xl mx-auto`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        {!props.size || props.size === 'middle' ? (
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            {/* 🎉 欢迎使用 byt tab！ */}
          </div>
        ) : props.size === 'mini' ? (
          <div className="flex flex-col items-center justify-center text-white"></div>
        ) : (
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            🎉 欢迎使用 byt tab！
          </div>
        )}
      </Card>
      {show && (
        <WidgetModal
          visible={visible}
          source={props.source || 'birdpaper'}
          id={props.id || ''}
          onCancel={() => {
            setVisible(false)
            setTimeout(() => {
              setShow(false)
            }, 1000)
          }}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
