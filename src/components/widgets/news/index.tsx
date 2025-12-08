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
function Widget(props: {
  withComponents?: boolean
  source?: string // 壁纸源
  id?: string // 壁纸分类id
  size?: 'mini' | 'small' | 'middle' | 'large'
}) {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)
  const { data, loading } = useRequest(getNews, {
    cacheKey: 'news'
  })
  const [news, setNews] = useLocalStorageState<News>('news', {
    defaultValue: { cates: [], list: [] },
    listenStorageChange: true
  })
  useEffect(() => {
    if (data) {
      setNews({ ...news, list: data })
    }
  }, [data])
  useAsyncEffect(async () => {
    if (news.cates?.length) return
    const cates = await getNewsCate()
    const list = await getNews(cates[0]?.id || '')
    setNews({ cates, list: list || [] })
  }, [])
  return (
    <ThemeProvider token={{}}>
      <Card
        className={`!rounded-xl mx-auto overflow-hidden ${props.withComponents ? sizeMap[props.size || 'mini'] : 'h-full'} !border-none !bg-transparent`}
        classNames={{
          body: `!overflow-hidden w-full h-full !bg-black/50 !p-4 !rounded-xl mx-auto backdrop-blur-md`
        }}
        onClick={(e) => {
          !props.withComponents && setVisible(true)
          !props.withComponents && setShow(true)
        }}>
        <Spin spinning={loading} wrapperClassName={`w-full h-full`}>
          <div className="h-full flex flex-col text-white gap-2 justify-center">
            {news &&
              news.list?.slice(0, 4)?.map((item, index) => (
                <div
                  className="flex justify-between gap-2"
                  key={item.id || index}>
                  <span className="line-clamp-1 flex-1">
                    {index + 1}. {item.title}
                  </span>
                  {props.size === 'large' && <span>{item.hotValue || 0}</span>}
                </div>
              ))}
          </div>
        </Spin>
      </Card>
      {show && (
        <WidgetModal
          visible={visible}
          source={props.source || 'birdpaper'}
          id={props.id || ''}
          afterOpenChange={(visible) => {
            setShow(visible)
          }}
          onCancel={() => {
            setVisible(false)
          }}
        />
      )}
    </ThemeProvider>
  )
}

export default Widget
