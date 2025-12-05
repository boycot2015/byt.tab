import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { useEffect } from 'react'
import { Item, Menu, Separator, Submenu } from 'react-contexify'

import { renderComponent } from '~components'
import appBase from '~data/apps.json'
import { ThemeProvider } from '~layouts'
import tabConfig from '~tabConfig'
import type { Config, ItemType } from '~types'

export const MENU_ID = 'blahblah'
function Contexify(props: { data: Record<string, any>; isEdit: boolean }) {
  const data = props.data || ({} as ItemType)
  const [config] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
  const [app, setApp] = useLocalStorageState<ItemType[]>('app', {
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
        console.log(id, props)
        moveComponent && moveComponent(items)
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
    <ThemeProvider>
      <Menu id={MENU_ID}>
        <Item id="add" onClick={handleItemClick}>
          <div className="w-full flex justify-between items-center">
            新增组件 <PlusOutlined />
          </div>
        </Item>
        {data.href ? (
          <Item id="open" onClick={handleItemClick}>
            <div className="w-full flex justify-between items-center">
              在新窗口打开链接 <LinkOutlined />
            </div>
          </Item>
        ) : null}
        <Item
          id="edit"
          hidden={!data.id}
          disabled={!data.editable}
          onClick={handleItemClick}>
          <div className="w-full flex justify-between items-center">
            编辑 <EditOutlined />
          </div>
        </Item>
        <Submenu
          label="移动到"
          hidden={!data.id}
          disabled={!data.closable || data.id == data.pid}>
          {app.map((item) => (
            <Item key={item.id} id={'move-to'} onClick={handleItemClick}>
              <div className="w-full flex justify-between items-center">
                {item.name} {renderComponent(item.icon)}
              </div>
            </Item>
          ))}
        </Submenu>
        <Item
          id="delete"
          hidden={!data.id}
          disabled={!data.closable || data.id == data.pid}
          onClick={handleItemClick}>
          <div className="w-full flex justify-between items-center">
            删除 <DeleteOutlined />
          </div>
        </Item>
        <Separator />
        <Item id="edit-all" onClick={handleItemClick}>
          <div className="w-full flex justify-between items-center">
            {props.isEdit ? '退出编辑页签' : '编辑页签'} <EditOutlined />
          </div>
        </Item>
        <Item
          id="delete-all"
          hidden={!data.id}
          disabled={!data.closable || data.id != data.pid}
          onClick={handleItemClick}>
          <div className="w-full flex justify-between items-center">
            删除页签 <DeleteOutlined />
          </div>
        </Item>
        <Item id="setting" onClick={handleItemClick}>
          <div className="w-full flex justify-between items-center">
            设置 <SettingOutlined />
          </div>
        </Item>
      </Menu>
    </ThemeProvider>
  )
}
export default Contexify
