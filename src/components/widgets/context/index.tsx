import { Item, Menu, Separator, Submenu } from 'react-contexify'

import type { ItemType } from '~types'

export const MENU_ID = 'blahblah'
function Contexify(props: { data: Record<string, any> }) {
  const data = props.data || ({} as ItemType)
  const handleItemClick = (data: Record<string, any>) => {
    const { id, props } = data
    const { addComponent, deleteComponent, ...items } = props
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
        break
      case 'delete':
        console.log(id, props)
        deleteComponent && deleteComponent(items)
        break
      case 'edit-all':
        console.log(id, props)
        break
      // etc...
    }
  }
  return (
    <Menu id={MENU_ID}>
      <Item id="add" onClick={handleItemClick}>
        新增组件
      </Item>
      {data.href ? (
        <Item id="open" onClick={handleItemClick}>
          在新窗口打开链接
        </Item>
      ) : null}
      <Item id="edit" disabled={!data.editable} onClick={handleItemClick}>
        编辑
      </Item>
      <Item id="delete" disabled={!data.closable} onClick={handleItemClick}>
        删除
      </Item>
      <Separator />
      <Item id="edit-all" onClick={handleItemClick}>
        编辑主页
      </Item>
    </Menu>
  )
}
export default Contexify
