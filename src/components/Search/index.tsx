import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select, Space } from 'antd'
import React, { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'

const Search = () => {
  const [config, setConfig] = useStorage<Config>('config', (val) => {
    return val || tabConfig
  })
  const [data, setData] = useState('')
  const seoList = [
    {
      name: '百度',
      url: 'https://www.baidu.com/s?wd='
    },
    {
      name: 'Google',
      url: 'https://www.google.com/search?q='
    },
    {
      name: '必应',
      url: 'https://www.bing.com/search?q='
    },
    {
      name: '搜狗',
      url: 'https://www.sogou.com/web?query='
    },
    {
      name: '360搜索',
      url: 'https://www.so.com/s?q='
    }
  ]
  const [url, setUrl] = useState(
    seoList.find((item) => item.name === config.seo)?.url || ''
  )
  return (
    <div className="flex gap-2 w-full lg:max-w-[1000px] mb-5 text-shadow">
      <Space.Compact block>
        <Select
          value={url}
          size="large"
          style={{ width: '120px' }}
          onClick={(e) => e.stopPropagation()}
          onChange={(value) => {
            setConfig({
              ...config,
              seo: seoList.find((item) => item.url === value)?.name || ''
            })
            setUrl(value)
          }}
          options={seoList.map((item) => ({
            label: item.name,
            value: item.url
          }))}
        />
        <Input
          allowClear
          style={{ width: 'calc(100% - 120px)' }}
          onChange={(e) => setData(e.target.value)}
          value={data}
          size="large"
          placeholder="请输入搜索内容..."
          prefix={<SearchOutlined />}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => window.open(`${url}${data}`)}>
          搜索
        </Button>
      </Space.Compact>
    </div>
  )
}
export default Search
