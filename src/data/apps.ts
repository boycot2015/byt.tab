import type { ItemType } from '~/types'
import { codelifeUrl } from '~api/baseUrl'
import { $GET } from '~utils/index'

import apps from './apps.json'

const addProps = {
  href: null,
  target: null,
  component: null,
  props: {
    style: {
      fontSize: '20px'
    },
    size: 'mini'
  },
  name: '添加小组件',
  icon: 'PlusOutlined'
}
const initApps = (apps: ItemType[]) => {
  return apps.map((el, index) => ({
    ...el,
    id: (index + 1).toString(),
    children:
      el.children?.map((child, cIndex) => ({
        ...child,
        id: index + 1 + '_' + (cIndex + 1).toString()
      })) || []
  }))
}
const getAppBase = async () => {
  return await Promise.all(
    initApps(apps as ItemType[]).map(async (item) => {
      let res = await getWebsites({ key: item.key })
      item.children = item.children.concat(res.children.slice(0, 12))
      return item
    })
  ).then((res) =>
    res.map((app) => {
      const children = app.children?.find(
        (_) => _.id.toString() == app.id + '_add'
      )
        ? app.children || []
        : [
            ...(app.children || []),
            {
              id: app.id + '_add',
              ...addProps
            }
          ]
      return {
        ...app,
        children
      }
    })
  )
}
const getWebsites = (params: { key: string; name?: string }) => {
  return $GET(
    `${codelifeUrl}/website/list?type=${params.key}&name=${params.name || ''}&size=64`
  ).then((res) => {
    return res && res.data
      ? {
          key: params.key,
          children:
            res.data
              ?.filter((el) => el.url && el.url.includes('http'))
              .map((item: any) => ({
                id: item._id,
                name: item.name,
                icon: item.imgSrc || item.src,
                iconType: 'image',
                backgroundColor: item.backgroundColor,
                description: item.description,
                target: '_blank',
                closable: true,
                editable: true,
                href: item.url
              })) || []
        }
      : { key: params.key, children: [] }
  })
}

const getAppIcon = async (href: string) => {
  return await $GET(`${codelifeUrl}/website/info?url=${href}&lang=cn`).then(
    (res) => res.data
  )
}
let appBase = initApps(apps as ItemType[])

export { appBase, addProps, getWebsites, getAppBase, getAppIcon }
