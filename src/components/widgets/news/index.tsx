import {
  useAsyncEffect,
  useInterval,
  useLocalStorageState,
  useRequest
} from 'ahooks'
import { Card, message, Spin } from 'antd'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import React, { useEffect, useState } from 'react'

import { getNews, getNewsCate } from '~data/news'
import { sizeMap, ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config } from '~types.d'

import WidgetModal from './config'

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
export interface News {
  list?: {
    id?: string
    index?: string
    title?: string
    name?: string
    href?: string
    url?: string
    link?: string
    hotValue?: string
    desc?: string
  }[]
  cates?: {
    id: string
    name: string
    icon?: string
  }[]
}
type WidgetProp = {
  withComponents?: boolean
  cateId?: string // 源
  id?: string // id
  update?: (args: { id: WidgetProp['id']; props: WidgetProp }) => void
  size?: 'middle' | 'large'
}
function Widget(props: WidgetProp) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const { data, loading } = useRequest(getNews, {
    cacheKey: 'news',
    manual: true
  })
  const [cates, setCates] = useLocalStorageState<News['cates']>('newsCates', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [list, setList] = useState<News['list']>([])
  useEffect(() => {
    if (data) {
      setList(data)
    }
  }, [data])
  useAsyncEffect(async () => {
    let res = cates || []
    if (!cates?.length) {
      res = await getNewsCate()
      setCates(res || [])
    }
    res = await getNews({ id: props.cateId || res?.[0]?.id || '' })
    setList(res || [])
  }, [])
  return (
    <ThemeProvider>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full !bg-black/50 !backdrop-blur-md !p-0 !rounded-xl mx-auto`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        <Spin spinning={loading} wrapperClassName={`w-full h-full`}>
          <div className="h-full w-full !p-4 flex flex-col text-white gap-2 justify-center">
            {list?.slice(0, 4)?.map((item, index) => (
              <div
                className="flex justify-between gap-2"
                title={item.title}
                key={item.id || index}>
                <span
                  className={`line-clamp-1 ${props.size === 'large' ? 'flex-1' : ''}`}>
                  {index + 1}. {item.title}
                </span>
                {props.size === 'large' && item.hotValue && (
                  <span>{item.hotValue}</span>
                )}
              </div>
            ))}
          </div>
        </Spin>
      </Card>
      {show && (
        <WidgetModal
          visible={visible}
          cateId={props.cateId || ''}
          id={props.id || ''}
          cates={cates}
          afterOpenChange={(visible) => {
            setShow(visible)
          }}
          onCancel={(cateId, list) => {
            setVisible(false)
            setList(list)
            props.update({
              id: props.id,
              props: { size: props.size, cateId: cateId }
            })
          }}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
