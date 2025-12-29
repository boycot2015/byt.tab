import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import {
  App,
  Button,
  ColorPicker,
  Drawer,
  Form,
  Image,
  Popconfirm,
  Select,
  Switch,
  Upload
} from 'antd'
import type { FormProps, UploadFile } from 'antd'
import type { FormInstance } from 'antd/lib/form'
import React, { useEffect, useRef, useState } from 'react'

import { appBase, getAppBase } from '~data/apps'
import { getFestivalBackground } from '~data/wallpaper'
import { ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'
import { exportJson, importJson } from '~utils'

import Wallpaper from '../wallpaper/config'

const { seoList = [] } = tabConfig.search || {}

const configDefault: Config = {
  ...tabConfig
}
const settingOptions = {
  primary: configDefault.theme.primary,
  seo: configDefault.seo,
  festival: configDefault.theme.festival,
  fontFamily: configDefault.theme.fontFamily,
  background: configDefault.theme.background
}
type FieldType = {
  primary?: string
  seo?: string
  festival?: boolean
  fontFamily?: string
  background?: string
}
function WidgetModal(props: { visible: boolean; onCancel: () => void }) {
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appBase
  })
  const [jobs, setJobs] = useLocalStorageState<ItemType[]>('jobs', {
    defaultValue: []
  })
  const formRef = useRef<FormInstance>()
  const [config, setConfig] = useLocalStorageState<Config>('config', {
    defaultValue: configDefault,
    listenStorageChange: true
  })
  const [initialValues, setInitialValues] = useState({
    primary: config?.theme?.primary || settingOptions.primary,
    seo: config?.seo || settingOptions.seo,
    festival: config.theme.festival || false,
    fontFamily: config.theme.fontFamily || settingOptions.fontFamily,
    background:
      (config.theme.festival.open && config.theme.festival.url) ||
      config?.theme?.cover ||
      config.theme.background ||
      settingOptions.background
  })
  const [wallpaperVisible, setWallpaperVisible] = useState<boolean>(false)
  const { message } = App.useApp()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // console.log('Success:', values)
    setConfig({ ...config })
    message.success('保存成功')
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }
  useEffect(() => {
    setInitialValues({
      primary: config?.theme?.primary || settingOptions.primary,
      seo: config?.seo || settingOptions.seo,
      fontFamily: config.theme.fontFamily || settingOptions.fontFamily,
      festival: config.theme.festival || false,
      background:
        (config.theme.festival.open && config.theme.festival.url) ||
        config?.theme?.cover ||
        config.theme.background ||
        settingOptions.background
    })
  }, [config])
  return (
    <ThemeProvider
      token={{
        fontFamily: config.theme.fontFamily,
        colorPrimary: config.theme.primary,
        Form: { labelColor: '#fff' }
      }}>
      <Drawer
        title="配置"
        open={props.visible}
        className="!bg-white/50 !text-white backdrop-blur-md text-shadow"
        onClose={() => props.onCancel()}>
        {/* <h2
          className="text-center"
          style={{ color: '#2563eb', marginBottom: '12px' }}>
          🎉 欢迎使用 byt tab！
        </h2> */}
        <Form
          name="config"
          ref={formRef}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: '100%' }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="主题色"
            name="primary"
            rules={[{ required: true, message: '请选择主题色！' }]}>
            <ColorPicker
              showText
              allowClear
              presets={[
                {
                  label: '推荐',
                  colors: [
                    config.theme.primary,
                    '#f43f5e',
                    '#2563eb',
                    '#10b981',
                    '#059669',
                    '#06b6d4',
                    '#0ea5e9',
                    '#0284c7'
                  ]
                }
              ]}
              onChange={(value) => {
                value &&
                  setConfig({
                    ...config,
                    theme: { ...config.theme, primary: value.toHexString() }
                  })
              }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="字体"
            name="fontFamily"
            rules={[{ required: true, message: '请选择字体' }]}>
            <Select
              showSearch
              filterOption={true}
              optionFilterProp="label"
              onChange={(value) => {
                setConfig({
                  ...config,
                  theme: { ...config.theme, fontFamily: value }
                })
              }}
              options={[
                { label: '苍耳渔阳体', value: 'CangErYuYang' },
                { label: '微软雅黑', value: 'Microsoft YaHei' },
                { label: '楷体', value: 'KaiTi' },
                { label: '黑体', value: 'Black' },
                { label: '宋体', value: 'Song' },
                { label: 'OPPO 字体', value: 'OPPOSans' }
              ]}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="搜索引擎"
            name="seo"
            rules={[{ required: true, message: '请选择搜索引擎！' }]}>
            <Select
              showSearch
              filterOption={true}
              optionFilterProp="label"
              onChange={(value) => {
                setConfig({
                  ...config,
                  seo: seoList.find((item) => item.url == value)?.name || value
                })
              }}
              options={seoList.map((item) => ({
                label: item.name,
                value: item.url
              }))}
            />
          </Form.Item>

          <Form.Item<FieldType> label="主题背景" name="background">
            {initialValues.background &&
            initialValues.background.includes('http') ? (
              <div
                className="img rounded-xl flex flex-col overflow-hidden cursor-pointer"
                onClick={() => setWallpaperVisible(true)}>
                <Image
                  src={initialValues.background}
                  alt="背景"
                  preview={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }}
                />
                <Button
                  type="primary"
                  className="absolute bottom-[10%] left-[33%]"
                  onClick={() => setWallpaperVisible(true)}>
                  选择壁纸
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <ColorPicker
                  showText
                  onChange={(value) => {
                    setConfig({
                      ...config,
                      theme: {
                        ...config.theme,
                        background: value.toHexString()
                      }
                    })
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => setWallpaperVisible(true)}>
                  选择壁纸
                </Button>
              </div>
            )}
          </Form.Item>
          <Form.Item<FieldType> label="节日壁纸" name="festival">
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              onChange={(value) => {
                getFestivalBackground().then((res) => {
                  setConfig({
                    ...config,
                    theme: {
                      ...config.theme,
                      festival: {
                        ...res,
                        url: res.customFestivals ? res.url : '',
                        open: value
                      }
                    }
                  })
                })
              }}
              defaultChecked
            />
          </Form.Item>
          <Form.Item label={'备份'}>
            <div className="flex justify-start gap-2">
              <Upload
                {...{
                  beforeUpload: (file) => {
                    importJson(file).then(({ jobs, apps, ...reset }) => {
                      setConfig(reset)
                      setApps(apps)
                      setJobs(jobs)
                      message.success('导入成功')
                      formRef.current?.setFieldsValue({
                        seo: reset.seo,
                        primary: reset.theme.primary,
                        fontFamily: reset.theme.fontFamily,
                        background: reset.theme.background,
                        festival: reset.theme.festival
                      })
                    })
                    return false
                  },
                  showUploadList: false,
                  accept: '.json',
                  maxCount: 1
                }}>
                <Button icon={<UploadOutlined />}>导入</Button>
              </Upload>
              <Button
                type="primary"
                danger
                icon={<DownloadOutlined />}
                onClick={() => {
                  exportJson({ ...config, jobs, apps }, 'byt_tab_config')
                  message.success('导出成功')
                }}>
                导出
              </Button>
            </div>
          </Form.Item>
          <Form.Item label={null}>
            <div className="flex justify-end gap-2">
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Popconfirm
                {...{
                  title: '重置将还原所有配置，确定要重置吗？',
                  okText: '确定',
                  okType: 'danger',
                  onConfirm: async () => {
                    const appBase = await getAppBase()
                    setApps(appBase)
                    setConfig(configDefault)
                    formRef.current?.setFieldsValue(settingOptions)
                    message.success('重置成功')
                  }
                }}>
                <Button type="primary" danger htmlType="button">
                  重置
                </Button>
              </Popconfirm>
            </div>
          </Form.Item>
        </Form>
        <Wallpaper
          visible={wallpaperVisible}
          onCancel={() => setWallpaperVisible(false)}
        />
      </Drawer>
    </ThemeProvider>
  )
}

export default (props: { visible: boolean; onCancel: () => void }) => {
  const [config] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  const [primary] = useState(config.theme.primary)
  return (
    <ThemeProvider
      token={{
        colorPrimary: primary,
        Tabs: { itemColor: 'rgba(255, 255, 255, 0.8)' },
        Button: {
          primaryBg: primary
        },
        Input: { hoverBorderColor: primary }
      }}>
      <App message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
        <WidgetModal visible={props.visible} onCancel={props.onCancel} />
      </App>
    </ThemeProvider>
  )
}
