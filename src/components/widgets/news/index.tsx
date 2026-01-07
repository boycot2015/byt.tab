import {
  useAsyncEffect,
  useInterval,
  useLocalStorageState,
  useRequest
} from 'ahooks'
import { Card, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

import { getNews, getNewsCate } from '~data/news'
import { sizeMap, ThemeProvider } from '~layouts'

import WidgetModal from './config'

export interface News {
  id: string
  name: string
  icon?: string
  list: {
    id?: string
    index?: string
    title?: string
    name?: string
    href?: string
    url?: string
    icon?: string
    link?: string
    hotValue?: string
    desc?: string
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
  const { data, run } = useRequest(getNews, {
    cacheKey: 'news_' + props.cateId,
    staleTime: 1000 * 60 * 5
  })
  const [page, setPage] = useState(1)
  const [news, setNews] = useLocalStorageState<News[]>('news', {
    defaultValue: [],
    listenStorageChange: true
  })
  const [list, setList] = useState<News['list']>([])
  const [currentList, setCurrentList] = useState<News['list']>([])
  useEffect(() => {
    if (data) {
      setList(data)
      setCurrentList(data.slice(0, 4))
    }
  }, [data])
  useAsyncEffect(async () => {
    let res = news || []
    let cateId = props.cateId || res?.[0]?.id || ''
    if (!res.length) {
      res = await getNewsCate()
      let res2 = await getNews({ id: cateId })
      cateId = cateId || res?.[0]?.id || ''
      setNews(
        res.map((item) => ({
          ...item,
          list: cateId === item.id ? res2 : []
        })) || []
      )
      setList(res2 || [])
    } else {
      let res2 = res.filter((item) => item.id === cateId)?.[0]?.list || []
      setList(res2)
    }
  }, [])
  useInterval(() => {
    setPage((page) => {
      let data = list.slice(page * 4, (page + 1) * 4)
      data.length && setCurrentList(data)
      return data.length ? page + 1 : 0
    })
  }, 1000 * 10)
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
        <Spin spinning={!currentList.length} wrapperClassName={`w-full h-full`}>
          <div className="h-full w-full min-h-[144px] !p-4 flex flex-col text-white gap-2">
            {currentList?.map((item, index) => (
              <div
                className="flex justify-between gap-2"
                title={item.title}
                key={item.id || index}>
                <span
                  className={`line-clamp-1 ${props.size === 'large' ? 'flex-1' : ''}`}>
                  {item.title}
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
          cates={news}
          afterOpenChange={(visible) => {
            setShow(visible)
          }}
          onCancel={(cateId, list) => {
            setVisible(false)
            setList(list)
            setCurrentList(list.slice(0, 4))
            setNews(
              news.map((item) => ({
                ...item,
                list: cateId === item.id ? list : item.list || []
              })) || []
            )
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
