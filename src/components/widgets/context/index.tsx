import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  LinkOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Item, Menu, Separator, Submenu } from 'react-contexify'

import { renderComponent } from '~components'
import { widgets } from '~components/widgets'
import { appBase } from '~data/apps'
import { sizeMap, sizeMapCn, ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'

import Wallpaper from '../wallpaper/config'

const { Text, Title, Link } = Typography

export const MENU_ID = 'blahblah'
function Contexify(props: { data: Record<string, any>; isEdit: boolean }) {
  const data = props.data || ({} as ItemType)
  const [config] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  const [wallpaperVisible, setWallpaperVisible] = useState<boolean>(false)
  const [apps, setApps] = useLocalStorageState<ItemType[]>('apps', {
    defaultValue: appBase,
    listenStorageChange: true
  })
  const handleItemClick = (data: Record<string, any>) => {
    const { id, props } = data
    const {
      addComponent,
      deleteComponent,
      editComponent,
      editAllComponent,
      deleteAllComponent,
      moveComponent,
      resizeComponent,
      openSetting,
      ...items
    } = props
    switch (id) {
      case 'open':
        // console.log(id, props)
        props.href && window.open(props.href, props.target || '_blank')
        break
      case 'add':
        addComponent && addComponent(items)
        break
      case 'wallpaper':
        setWallpaperVisible(true)
        break
      case 'edit':
        console.log(id, props)
        editComponent && editComponent(items)
        break
      case 'delete':
        console.log(id, props)
        deleteComponent && deleteComponent(items)
        break
      case 'edit-all':
        console.log(id, props)
        editAllComponent && editAllComponent(items)
        break
      case 'delete-all':
        console.log(id, props)
        deleteAllComponent && deleteAllComponent(items)
        break
      case 'setting':
        console.log(id, props)
        openSetting && openSetting()
        break
      case 'move-to':
        console.log(props, data)
        moveComponent && moveComponent(items, data.targetData)
        break
      case 'change-size':
        console.log(props, data)
        resizeComponent && resizeComponent(items, data.size)
        break
    }
  }
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--contexify-activeItem-bgColor',
      config.theme.primary
    )
  }, [config.theme.primary])
  return (
    <ThemeProvider
      token={{
        colorText: '#fff'
      }}>
      <Menu id={MENU_ID}>
        <Item id="add" onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            新增组件 <PlusOutlined />
          </Text>
        </Item>
        <Item id="wallpaper" onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            更换壁纸 <FileImageOutlined />
          </Text>
        </Item>
        {data.href ? (
          <Item id="open" onClick={handleItemClick}>
            <Text className="w-full flex justify-between items-center">
              在新窗口打开链接 <LinkOutlined />
            </Text>
          </Item>
        ) : null}
        <Item
          id="edit"
          hidden={!data.id}
          disabled={!data.editable}
          onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            编辑图标 <EditOutlined />
          </Text>
        </Item>
        <Submenu
          label="调整布局"
          hidden={!widgets.find((item) => item.component == data.component)}
          disabled={!data.closable || data.id == data.pid}>
          {widgets
            .find((item) => item.component == data.component)
            ?.size.filter((item) => item !== data.props.size)
            ?.map((item) => (
              <Item
                key={item}
                data={item}
                id={'change-size'}
                onClick={(arg) => handleItemClick({ ...arg, size: item })}>
                <Text className="w-full flex justify-between items-center">
                  <span>{sizeMapCn[item]}</span>
                  {sizeMap[item].replace(/icon-size-/g, '')}
                </Text>
              </Item>
            ))}
        </Submenu>
        <Submenu
          label="移动到"
          hidden={!data.id}
          disabled={!data.closable || data.id == data.pid}>
          {apps
            .filter((item) => item.id != data.pid)
            .map((item) => (
              <Item
                key={item.id}
                data={item}
                id={'move-to'}
                onClick={(arg) =>
                  handleItemClick({ ...arg, targetData: item })
                }>
                <Text className="w-full flex justify-between items-center">
                  {item.name} {renderComponent(item.icon)}
                </Text>
              </Item>
            ))}
        </Submenu>
        <Item
          id="delete"
          hidden={!data.id}
          disabled={!data.closable || data.id == data.pid}
          onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            删除 <DeleteOutlined />
          </Text>
        </Item>
        <Separator />
        <Item id="edit-all" onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            {props.isEdit ? '退出编辑页签' : '编辑页签'} <EditOutlined />
          </Text>
        </Item>
        <Item
          id="delete-all"
          hidden={!data.id}
          disabled={!data.closable || data.id != data.pid}
          onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            删除页签 <DeleteOutlined />
          </Text>
        </Item>
        <Item id="setting" onClick={handleItemClick}>
          <Text className="w-full flex justify-between items-center">
            设置 <SettingOutlined />
          </Text>
        </Item>
      </Menu>
      <Wallpaper
        visible={wallpaperVisible}
        onCancel={() => setWallpaperVisible(false)}
      />
    </ThemeProvider>
  )
}
export default Contexify
