import { useAsyncEffect, useLocalStorageState } from 'ahooks'
import { Button, Input, message, Space } from 'antd'
import { useState } from 'react'

import { appBase, getAppIcon } from '~data/apps'
import type { ItemType } from '~types'

import { ThemeProvider } from './layouts'

function IndexPopup() {
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appBase
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<ItemType>({
    name: '',
    id: '',
    href: ''
  })
  const [hasApp, setHasApp] = useState<boolean>(false)
  useAsyncEffect(async () => {
    setLoading(true)
    async function getCurrentTab() {
      let queryOptions = { active: true, lastFocusedWindow: true }
      let [tab] = await chrome.tabs.query(queryOptions)
      return tab
    }
    const tab = await getCurrentTab()
    tab &&
      setData({
        ...tab,
        name: tab?.title.split(' - ')[0] || '',
        href: tab?.url || '',
        icon: tab?.favIconUrl,
        description: tab?.title || '',
        id: tab?.id || ''
      })
    setHasApp(apps[0].children.some((el) => el.href === tab?.url))
    setLoading(false)
  }, [])
  const getData = async (value: string) => {
    try {
      setLoading(true)
      if (!value) return { name: '', src: '', href: '' }
      const icon = await getAppIcon(value)
      setData({ ...icon, href: value })
      return icon || { name: '', src: '', href: '' }
    } catch (error) {
      console.error('获取网站信息失败:', error)
      message.error('获取网站信息失败，请检查网址是否正确')
      setData({ name: '', id: '', href: '' })
      return { name: '', id: '', href: '' }
    } finally {
      setLoading(false)
    }
  }
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
            iconType: 'image',
            editable: true,
            closable: true,
            target: '_blank'
          }
        ]
      },
      ...apps.slice(1)
    ])
    setHasApp(true)
    message.success('添加成功')
  }
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
        {!data.id && (
          <div className="w-full flex items-center gap-2 mb-2">
            <Input
              placeholder="在这里输入网址..."
              defaultValue={data.href || ''}
              onChange={(e) => {
                const value = e.target?.value?.trim()
                if (value && value.includes('http')) {
                  getData(value)
                }
              }}
              onPressEnter={() => {
                if (data?.href && data?.name) {
                  handleSubmit()
                }
              }}
              className="!flex-1"
              style={{
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px'
              }}
            />
          </div>
        )}
        <div
          className="flex flex-col gap-2"
          style={{ fontSize: '14px', color: '#9ca3af' }}>
          <span>
            名称：
            <span className="text-[#333]">
              {loading ? '获取中...' : data?.name || '暂无内容'}
            </span>
          </span>
          <span className="flex">
            网址：
            <span
              title={data?.href || ''}
              className="max-w-[200px] flex-1 text-[#333] whitespace-nowrap line-clamp-1">
              {loading ? '获取中...' : data?.href || '暂无内容'}
            </span>
          </span>
          <span>
            描述：
            <span className="text-[#333]">
              {loading ? '获取中...' : data?.description || '暂无内容'}
            </span>
          </span>
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
          disabled={loading || !data?.href || !data?.name || hasApp}
          style={{ width: '100%' }}
          onClick={() => handleSubmit()}
          loading={loading}>
          {loading ? '获取中...' : hasApp && data?.href ? '已添加' : '添加'}
        </Button>
        {process.env.NODE_ENV === 'development' && (
          <div style={{ marginTop: '12px' }} className="text-center">
            <a
              href="https://docs.plasmo.com"
              target="_blank"
              style={{ color: '#2563eb' }}>
              查看开发文档
            </a>
          </div>
        )}
      </div>
    </ThemeProvider>
  )
}

export default IndexPopup
