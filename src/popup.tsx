import { useRequest } from 'ahooks'
import { Button, Input, message } from 'antd'

import { getAppIcon } from '~data/apps'

import { ThemeProvider } from './layouts'

function IndexPopup() {
  const getData = async (value: string) => {
    const icon = await getAppIcon(value)
    return icon || { name: '', src: '', url: '' }
  }
  const { loading, data, run } = useRequest(getData, {
    debounceWait: 500,
    defaultParams: [window.location.href || ''],
    manual: true
  })
  const handleSubmit = () => {
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
        <h2 style={{ color: '#2563eb', marginBottom: '12px' }}>
          🎉 欢迎使用 byt tab！,输入网址以添加到 tab 中
        </h2>
        <Input
          placeholder="在这里输入网址..."
          onChange={(e) => run(e.target.value)}
          style={{
            maxWidth: '100%',
            minWidth: '100%',
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            marginBottom: '12px'
          }}
        />
        <div
          className="flex flex-col gap-2"
          style={{ fontSize: '14px', color: '#9ca3af' }}>
          <span>名称：{data?.name || '暂无内容'}</span>
          <span>网址：{data?.url || '暂无内容'}</span>
        </div>
        <Button
          type="primary"
          className="mt-4"
          disabled={!data?.url}
          style={{ width: '100%' }}
          onClick={() => handleSubmit()}>
          添加
        </Button>
        <div style={{ marginTop: '12px' }}>
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
