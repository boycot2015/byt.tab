import { useAsyncEffect, useLocalStorageState, useRequest } from 'ahooks'
import { Button, Input, message } from 'antd'
import { useEffect, useState } from 'react'

import { useMessage, usePort } from '@plasmohq/messaging/hook'

import { appBase, getAppIcon } from '~data/apps'
import type { ItemType } from '~types'

import { ThemeProvider } from './layouts'

function IndexPopup() {
  let { data: websiteInfo = {} } = useMessage((req) => {
    console.log('websiteInfoRelay', req, websiteInfo)
  }) as any
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appBase
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ItemType>({
    name: '',
    src: '',
    href: '',
    ...websiteInfo
  })
  const getData = async (value: string) => {
    try {
      setLoading(true)
      if (!value) return { name: '', src: '', href: '', ...websiteInfo }
      const icon = await getAppIcon(value)
      setData({ ...icon, ...websiteInfo, href: value })
      return icon || { name: '', src: '', href: '', ...websiteInfo }
    } catch (error) {
      console.error('获取网站信息失败:', error)
      message.error('获取网站信息失败，请检查网址是否正确')
      setData({ name: '', src: '', href: '', ...websiteInfo })
      return { name: '', src: '', href: '', ...websiteInfo }
    } finally {
      setLoading(false)
    }
  }
  console.log(websiteInfo, 'websiteInfo---IndexPopup')

  // const { loading, data, run } = useRequest(getData, {
  //   debounceWait: 500,
  //   defaultParams: [websiteInfo.href || '']
  // })

  const handleSubmit = () => {
    if (!data?.href) {
      message.error('无效的网址信息')
      return
    }
    setApps([
      {
        ...apps[0],
        children: [
          ...apps[0].children,
          {
            id: apps[0].id + '_' + Date.now(),
            ...data,
            editable: true,
            closable: true,
            target: '_blank'
          }
        ]
      },
      ...apps.slice(1)
    ])
    message.success('添加成功')
  }
  useEffect(() => {
    if (websiteInfo.href) {
      setData(websiteInfo)
    }
  }, [websiteInfo])
  return (
    <ThemeProvider>
      <div
        style={{
          padding: 16,
          width: 300,
          height: 'auto',
          background: '#fff',
          // borderRadius: '12px',
          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
        }}>
        <h2
          style={{
            color: '#2563eb',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
          🎉 欢迎使用 byt tab！
        </h2>
        {/* <Input
          placeholder="在这里输入网址..."
          defaultValue={data.href || ''}
          onChange={(e) => {
            const value = e.target?.value?.trim()
            if (value) {
              getData(value)
            }
          }}
          onPressEnter={() => {
            if (data?.href && data?.name) {
              handleSubmit()
            }
          }}
          style={{
            maxWidth: '100%',
            minWidth: '100%',
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            marginBottom: '12px'
          }}
        /> */}
        <div
          className="flex flex-col gap-2"
          style={{ fontSize: '14px', color: '#9ca3af' }}>
          <span>描述：{loading ? '获取中...' : data?.name || '暂无内容'}</span>
          <span>网址：{loading ? '获取中...' : data?.href || '暂无内容'}</span>
          {data?.icon && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>图标：</span>
              <img
                src={data.icon}
                alt="网站图标"
                style={{ width: '16px', height: '16px' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>
        <Button
          type="primary"
          className="mt-4"
          disabled={loading || !data?.href || !data?.name}
          style={{ width: '100%' }}
          onClick={() => handleSubmit()}
          loading={loading}>
          {loading ? '获取中...' : '添加'}
        </Button>
        <div style={{ marginTop: '12px' }} className="text-center">
          <a
            href="https://docs.plasmo.com"
            target="_blank"
            style={{ color: '#2563eb' }}>
            查看开发文档
          </a>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
