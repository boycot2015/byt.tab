import {
  AppstoreOutlined,
  CloseOutlined,
  LinkOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  ToolOutlined
} from '@ant-design/icons'
import * as icons from '@ant-design/icons/lib/icons/index'
import { useGetState, useLocalStorageState, useRequest } from 'ahooks'
import {
  App,
  Button,
  Card,
  Carousel,
  Col,
  ColorPicker,
  Empty,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
  Upload
} from 'antd'
import type {
  FormInstance,
  GetProp,
  TabsProps,
  UploadFile,
  UploadProps
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { renderComponent } from '~components'
import { appBase, getAppIcon, getWebsites } from '~data/apps'
import websitesBase from '~data/website.json'
import { ThemeProvider } from '~layouts'
import type { ItemType } from '~types'
import { mouseOverEffect } from '~utils'

interface Widget {
  id: string
  ctype: 'hot' | 'common' | 'recommend'
  name: string
  size: ('mini' | 'small' | 'middle' | 'large')[]
  component: string
}
interface Website {
  id: string
  name: string
  href: string
  icon?: string
  description?: string
  backgroundColor?: string
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
export const widgets: Widget[] = [
  {
    id: 'DateWidget',
    ctype: 'hot',
    name: '日历',
    size: ['mini', 'middle', 'large'],
    component: 'DateWidget'
  },
  {
    id: 'TimeWidget',
    ctype: 'common',
    name: '时钟',
    size: ['small', 'middle', 'large'],
    component: 'TimeWidget'
  },
  {
    id: 'WeatherWidget',
    ctype: 'recommend',
    size: ['mini', 'middle', 'large'],
    name: '天气',
    component: 'WeatherWidget'
  },
  {
    id: 'WallpaperWidget',
    ctype: 'recommend',
    size: ['mini', 'middle', 'large'],
    name: '壁纸',
    component: 'WallpaperWidget'
  },
  {
    id: 'NewsWidget',
    ctype: 'recommend',
    size: ['middle', 'large'],
    name: '新闻动态',
    component: 'NewsWidget'
  }
]
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
const ComponentContent = (props: {
  ctype: 'all' | 'hot' | 'common' | 'recommend'
  widgets: Widget[]
  onAdd: (e: React.MouseEvent, item: ItemType) => void
}) => {
  const [parentRefs] = useState<
    { ref: HTMLDivElement; props?: Record<string, any> }[]
  >([])
  const [itemRefs] = useState<
    { ref: HTMLDivElement; props: Record<string, any> }[]
  >([])
  useEffect(() => {
    parentRefs?.forEach((parent, index) => {
      let multiple = {
        small: 5,
        middle: 10,
        large: 15
      }
      mouseOverEffect(parent.ref, itemRefs[index].ref, {
        multiple: multiple[itemRefs[index].props?.size || 'middle']
      })
    })
    return () => {
      parentRefs?.forEach((parent) => {
        parent.ref?.removeEventListener('mouseover', null)
      })
    }
  }, [parentRefs])
  return (
    <div className="max-h-[60vh] overflow-hidden overflow-y-auto">
      <Row gutter={[0, 10]}>
        {props.widgets.map((component) => (
          <Col span={24} lg={12} xl={8} key={component.id}>
            <Carousel
              arrows={true}
              key={props.ctype + '_' + component.id}
              style={{
                perspective: 500,
                transformStyle: 'preserve-3d'
              }}
              draggable={true}
              className="p-2">
              {component.size.map((size, index) => (
                <div key={props.ctype + '_' + component.id + '_' + size}>
                  <div
                    style={{
                      perspective: 500,
                      padding: '10px',
                      transition: 'all .2s',
                      transformStyle: 'preserve-3d'
                    }}
                    className="cursor-pointer"
                    ref={(ref) => parentRefs?.push({ ref })}
                    onClick={(e) =>
                      props.onAdd(e, {
                        ...component,
                        props: { size }
                      })
                    }>
                    <div
                      ref={(ref) =>
                        itemRefs?.push({ ref, props: { size, ...component } })
                      }
                      style={{
                        transformStyle: 'preserve-3d',
                        transition: 'all .2s',
                        transform: 'rotateX(5deg) rotateY(20deg)'
                      }}
                      className="w-full mb-2 h-[144px] overflow-hidden !rounded-xl select-none !flex flex-col cursor-pointer item-center justify-center">
                      <div>
                        {renderComponent(component.component, {
                          withComponents: true,
                          size
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            <div className="text-center select-none text-md text-white mt-2">
              {component.name}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
const WebsiteContent = (props: {
  key: string
  children: Website[]
  onAdd: (e: React.MouseEvent, item: ItemType) => void
}) => {
  const [parentRefs] = useState<
    { ref: HTMLDivElement; props?: Record<string, any> }[]
  >([])
  const [itemRefs] = useState<
    { ref: HTMLDivElement; props: Record<string, any> }[]
  >([])
  useEffect(() => {
    parentRefs?.forEach((parent, index) => {
      let multiple = {
        small: 5,
        middle: 10,
        large: 15
      }
      mouseOverEffect(parent.ref, itemRefs[index].ref, {
        multiple: multiple[itemRefs[index].props?.size || 'middle']
      })
    })
    return () => {
      parentRefs?.forEach((parent) => {
        parent.ref?.removeEventListener('mouseover', null)
      })
    }
  }, [parentRefs])
  return (
    <Row gutter={[10, 10]}>
      {props.children.map((item) => (
        <Col span={24} sm={12} md={8} lg={6} key={item.id}>
          <Card
            className="!rounded-xl !bg-[rgba(255, 255, 255, 0.3)] backdrop-blur-md overflow-hidden h-full p-2 !border-none "
            classNames={{
              body: '!p-0 h-full !bg-transparent'
            }}>
            <a
              href={item.href}
              target="_blank"
              className="flex items-center h-full gap-4 select-none text-md">
              <div className=" w-12 h-12 rounded-xl overflow-hidden">
                <img
                  src={item.icon || ''}
                  alt={item.name}
                  style={{
                    backgroundColor:
                      item.backgroundColor || 'rgba(255, 255, 255, 0.3)'
                  }}
                  className={`w-full h-full object-cover`}
                />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                {item.name}
                <p className="line-clamp-2 h-[40px]">{item.description}</p>
                <Space className="!flex !justify-end">
                  <Button type="link" size="small" icon={<LinkOutlined />}>
                    访问
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={(e) => props.onAdd(e, item)}>
                    添加
                  </Button>
                </Space>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
const UploadComponent = (props?: {
  icon: string
  url: string | undefined
  onSuccess?: (url: string) => void
}) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: props.icon,
      status: 'done',
      url: props.url
    }
    // {
    //   uid: '-1',
    //   name: props.icon,
    //   status: 'done',
    //   url: props.url
    // }
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error'
    // }
  ])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </button>
  )
  useEffect(() => {
    setFileList([
      {
        uid: '-1',
        name: props.icon,
        status: 'done',
        url: props.url
      }
    ])
  }, [props.icon, props.url])
  useEffect(() => {
    if (fileList[0]?.response)
      props.onSuccess?.(fileList[0].response?.data || '')
  }, [fileList])
  return (
    <ThemeProvider token={{ colorText: '#fff' }}>
      <Upload
        action="https://api.boycot.top/api/upload"
        listType="picture-card"
        fileList={fileList}
        maxCount={1}
        onPreview={handlePreview}
        onChange={handleChange}>
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </ThemeProvider>
  )
}
const IconContent = (props: {
  data: ItemType
  onAdd: (item: ItemType) => void
  onUpdate: (item: ItemType) => void
}) => {
  interface SubmitButtonProps {
    form: FormInstance
  }
  const [form] = Form.useForm()
  const [state, setState] = useState<ItemType>({
    ...props.data,
    iconType: props.data?.iconType || 'font',
    href: props.data?.href || '',
    name:
      props.data?.id && props.data?.pid != props.data?.id.toString()
        ? props.data.name || ''
        : ''
  })
  const onFinish = (values: ItemType) => {
    let data = {
      ...values,
      id: state.id || undefined,
      icon: state.icon || '',
      iconType: state.iconType || 'text',
      href: state.href,
      editable: props.data.editable || false,
      backgroundColor: state.backgroundColor || 'rgba(255, 255, 255, 0.3)'
    }
    !state.id ? props.onAdd(data) : props.onUpdate(data)
  }
  const getIcon = () => {
    if (!state.href) {
      return
    }
    getAppIcon(state.href).then((icon) => {
      setState({
        ...state,
        ...icon,
        iconType: 'image',
        icon: icon?.src || ''
      })
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
    form,
    children
  }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false)

    // Watch all values
    const values = Form.useWatch([], form)

    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false))
    }, [form, values])

    return (
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%' }}
        disabled={!submittable}>
        {children}
      </Button>
    )
  }
  useEffect(() => {
    props.data?.icon && props.data?.editable
      ? setState({
          ...props.data,
          iconType: props.data?.iconType || 'font',
          href: props.data?.href || '',
          name:
            props.data?.id && props.data?.pid != props.data?.id.toString()
              ? props.data.name || ''
              : ''
        })
      : setState({
          id: '',
          icon: '',
          name: '',
          href: '',
          iconType: 'font'
        })
  }, [props.data])
  return (
    <Form
      form={form}
      initialValues={{
        ...state
      }}
      name="config"
      size="large"
      autoComplete="off"
      labelCol={{ span: 4, md: 4 }}
      wrapperCol={{ span: 20, md: 16 }}
      onFinish={onFinish}
      colon={false}
      onFinishFailed={onFinishFailed}>
      <Form.Item label="名称" name="name" rules={[{ required: true }]}>
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item
        label="链接"
        name="href"
        rules={[
          {
            required: true,
            pattern: /^(http|https)?:\/\//g,
            message: '请输入正确的链接'
          }
        ]}>
        <Space.Compact className="w-full">
          <Input
            defaultValue={state.href || ''}
            placeholder="例如：https://www.baidu.com"
            style={{ width: '100%' }}
            onChange={(e) => {
              setState({ ...state, href: e.target.value })
            }}
            onBlur={getIcon}
          />
          <Button type="primary" onClick={() => getIcon()}>
            获取图标
          </Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item label="图标背景" name="backgroundColor">
        <ColorPicker
          onChange={(value) =>
            setState({ ...state, backgroundColor: value.toHexString() })
          }
        />
      </Form.Item>
      <Form.Item label="文字图标" name="icon">
        <div className="flex flex-col gap-2">
          <Space.Compact className="w-full">
            <Select
              style={{ width: '24%' }}
              defaultValue={state.iconType || 'text'}
              value={state.iconType || 'text'}
              options={[
                { label: '文字', value: 'text' },
                { label: '字体图标', value: 'font' },
                { label: '图片', value: 'image' }
              ]}
              onChange={(value) =>
                setState({ ...state, iconType: value })
              }></Select>
            {state.iconType === 'text' && (
              <Input
                placeholder="请输入文字"
                defaultValue={state.icon || ''}
                onChange={(e) => setState({ ...state, icon: e.target.value })}
              />
            )}
            {state.iconType == 'font' && (
              <Select
                showSearch
                filterOption={(inputValue, option) =>
                  option.value
                    ?.toLowerCase()
                    ?.indexOf(inputValue.toLowerCase()) >= 0
                }
                defaultValue={state.icon || ''}
                placeholder="请选择字体图标"
                options={Object.keys(icons).map((key) => ({
                  label: (
                    <div className="flex items-center gap-2 justify-between">
                      <span>{key}</span>
                      <span>{renderComponent(key)}</span>
                    </div>
                  ),
                  value: key
                }))}
                onChange={(key) => setState({ ...state, icon: key })}
              />
            )}
          </Space.Compact>
          {state.iconType === 'image' && (
            <UploadComponent
              icon={state.icon}
              url={state.icon || state.href}
              onSuccess={(url) => setState({ ...state, icon: url })}
            />
          )}
        </div>
      </Form.Item>
      <Form.Item label=" ">
        <div className="flex">
          <SubmitButton form={form}>保存</SubmitButton>
        </div>
      </Form.Item>
    </Form>
  )
}
function WidgetModal(props: {
  visible: boolean
  onCancel: () => void
  onUpdate: (item: ItemType) => void
  afterOpenChange: (arg: boolean) => void
  data: ItemType
}) {
  const { message } = App.useApp()
  const [containerId, setContainerId, getContainerId] = useGetState<string>(
    props.data?.pid ? props.data?.pid.toString() : '999'
  )
  const [defaultActiveKey, setDefaultActiveKey] = useState(
    props.data?.icon && props.data?.editable ? 'icon' : 'component'
  )
  const [searchKey, setSearchKey] = useState<string>('')
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appBase,
    listenStorageChange: true
  })
  const TabBarExtraContent = () => (
    <div className="flex items-center gap-2 mr-10">
      <span className="text-white">添加到</span>
      <Select
        style={{ width: 120 }}
        options={apps.map((item) => ({
          label: item.name,
          value: item.id.toString()
        }))}
        defaultValue={containerId}
        onChange={(value) => {
          console.log('containerId', value)
          setContainerId(value)
        }}
      />
    </div>
  )
  const onAdd = (
    e,
    {
      component,
      props: data,
      name,
      href,
      icon,
      iconType,
      backgroundColor
    }: ItemType
  ) => {
    e && e.preventDefault()
    e && e.stopPropagation()
    let newApps = [...apps]
    newApps.map((item) => {
      if (item.id == getContainerId()) {
        item.children?.push({
          id:
            containerId +
            '_' +
            Date.now().toString() +
            '_' +
            item.children.length,
          name,
          href,
          target: href ? '_blank' : undefined,
          icon,
          iconType,
          backgroundColor,
          closable: true,
          editable: !component,
          props: data || { size: 'mini' },
          chosen: false,
          selected: false,
          component
        })
      }
    })
    setApps([...newApps])
    message.success('添加成功')
  }
  const [widgetTabs] = useState<TabsProps['items']>([
    {
      key: 'all',
      label: '全部',
      forceRender: true,
      children: <ComponentContent ctype="all" widgets={widgets} onAdd={onAdd} />
    },
    {
      key: 'recommend',
      label: '推荐',
      forceRender: true,
      children: (
        <ComponentContent
          ctype="recommend"
          widgets={widgets.filter((item) => item.ctype == 'recommend')}
          onAdd={onAdd}
        />
      )
    },
    {
      key: 'common',
      label: '常用',
      forceRender: true,
      children: (
        <ComponentContent
          ctype="common"
          widgets={widgets.filter((item) => item.ctype == 'common')}
          onAdd={onAdd}
        />
      )
    },
    {
      key: 'hot',
      label: '热门',
      forceRender: true,
      children: (
        <ComponentContent
          ctype="hot"
          widgets={widgets.filter((item) => item.ctype == 'hot')}
          onAdd={onAdd}
        />
      )
    }
  ])
  const [websites, setWebsites] = useState<
    { label: string; key: string; children?: Website[] }[]
  >(websitesBase || [])
  const [websiteType, setWebsiteType] = useState<string>(websites[0]?.key || '')
  const {
    data,
    loading: websiteLoading,
    run
  } = useRequest(() => getWebsites({ key: websiteType, name: searchKey }), {
    // debounceWait: 300,
    staleTime: 1000 * 60 * 5,
    cacheKey: 'website_' + websiteType + (searchKey || '')
    // manual: true
  })
  useEffect(() => {
    if (defaultActiveKey !== 'website') {
      return
    }
    let newData = [...websites]
    data &&
      newData.map((item) => {
        if (item.key == data.key) {
          item.children = data.children
        }
      })
    setWebsites(newData)
  }, [data])
  useEffect(() => {
    run()
  }, [websiteType, searchKey])
  // setWebsites(data || [])
  return (
    <App>
      <ThemeProvider
        token={{
          colorTextDisabled: 'rgba(255, 255, 255, 0.5)',
          colorBgContainerDisabled: 'rgba(255, 255, 255, 0.5)',
          colorBgBase: 'rgba(255, 255, 255, 0.9)',
          colorTextDescription: '#fff',
          Modal: {
            contentBg: 'rgba(0, 0, 0, 0.8)'
          },
          Upload: {
            actionsColor: 'rgba(255, 255, 255, 0.5)'
          },
          Form: { labelColor: '#fff' },
          Tabs: { itemColor: '#fff' }
        }}>
        <Modal
          title={null}
          wrapClassName="!bg-black/30 backdrop-blur-md"
          classNames={{
            header: '!bg-transparent !text-white',
            content: '!overflow-hidden !p-0 !rounded-xl !bg-black/30',
            body: '!p-3 !pl-0'
          }}
          width={{
            xl: 1300,
            lg: 1000,
            md: 800
          }}
          footer={null}
          open={props.visible}
          closeIcon={<CloseOutlined className="!text-white" />}
          afterOpenChange={props.afterOpenChange}
          onCancel={() => props.onCancel()}>
          <div className="h-[70vh]">
            <Tabs
              defaultActiveKey={defaultActiveKey}
              tabPosition="left"
              style={{ height: '100%' }}
              animated
              tabBarExtraContent={{
                left: <span className="!text-white text-2xl">组件库</span>
              }}
              items={[
                {
                  label: '组件工具',
                  key: 'component',
                  icon: <ToolOutlined />,
                  forceRender: true,
                  children: (
                    <Tabs
                      defaultActiveKey="all"
                      animated
                      items={widgetTabs}
                      tabBarExtraContent={<TabBarExtraContent />}
                    />
                  )
                },
                {
                  label: '网站链接',
                  key: 'website',
                  forceRender: true,
                  icon: <AppstoreOutlined />,
                  children: (
                    <Tabs
                      defaultActiveKey="all"
                      animated
                      moreIcon={<MoreOutlined className="!text-white" />}
                      tabBarExtraContent={{
                        left: (
                          <Input
                            style={{
                              width: 120,
                              marginInlineEnd: 16
                            }}
                            placeholder="搜索"
                            value={searchKey}
                            suffix={<SearchOutlined />}
                            onChange={(e) => setSearchKey(e.target.value)}
                          />
                        ),
                        right: <TabBarExtraContent />
                      }}
                      prefix="website"
                      items={
                        websites.map((item) => ({
                          ...item,
                          forceRender: true,
                          children: (
                            <Spin
                              spinning={websiteLoading}
                              wrapperClassName="h-[62vh] overflow-hidden overflow-y-auto">
                              {searchKey &&
                              !websiteLoading &&
                              item.children?.length === 0 ? (
                                <div className="flex h-[62vh] items-center justify-center">
                                  <Empty
                                    className="text-center !text-white"
                                    description="暂无数据～"></Empty>
                                </div>
                              ) : (
                                <WebsiteContent
                                  key={item.key}
                                  onAdd={(e, data) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onAdd(e, { ...data })
                                  }}
                                  children={item.children || []}
                                />
                              )}
                            </Spin>
                          )
                        })) || []
                      }
                      onChange={(key) => {
                        setWebsiteType(key)
                      }}
                    />
                  )
                },
                {
                  label: '图标设置',
                  key: 'icon',
                  forceRender: true,
                  icon: <SettingOutlined />,
                  children: (
                    <Tabs
                      defaultActiveKey="all"
                      animated
                      tabBarExtraContent={
                        !props.data.editable && <TabBarExtraContent />
                      }
                      items={[
                        {
                          label: '图标',
                          key: 'icon',
                          children: (
                            <div className="h-[62vh] overflow-hidden overflow-y-auto">
                              <IconContent
                                data={props.data}
                                onAdd={(item) => onAdd(null, item)}
                                onUpdate={(item) => {
                                  props.onCancel()
                                  props.onUpdate(item)
                                }}
                              />
                            </div>
                          )
                        }
                      ]}
                    />
                  )
                }
              ]}
              onChange={(key) => {
                setDefaultActiveKey(key)
                key == 'website' && run()
              }}
            />
          </div>
        </Modal>
      </ThemeProvider>
    </App>
  )
}

export default WidgetModal
