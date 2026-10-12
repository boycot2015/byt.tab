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
// codelife 的 website/list 分类列表接口已停服（全部分类返回空数组），
// 这里提供一份本地热门站点兜底，使分类不再依赖该第三方接口。
const fallbackSites: Record<string, Array<{ name: string; href: string; backgroundColor: string }>> = {
  hot: [
    { name: '百度', href: 'https://www.baidu.com', backgroundColor: '#2932e1' },
    { name: '必应', href: 'https://www.bing.com', backgroundColor: '#008373' },
    { name: '微博', href: 'https://weibo.com', backgroundColor: '#e6162d' },
    { name: '知乎', href: 'https://www.zhihu.com', backgroundColor: '#0066ff' },
    { name: '哔哩哔哩', href: 'https://www.bilibili.com', backgroundColor: '#fb7299' },
    { name: '抖音', href: 'https://www.douyin.com', backgroundColor: '#000000' },
    { name: '淘宝', href: 'https://www.taobao.com', backgroundColor: '#ff5000' },
    { name: '京东', href: 'https://www.jd.com', backgroundColor: '#e1251b' },
    { name: 'GitHub', href: 'https://github.com', backgroundColor: '#24292e' },
    { name: '豆瓣', href: 'https://www.douban.com', backgroundColor: '#2e963a' }
  ],
  game: [
    { name: '爱奇艺', href: 'https://www.iqiyi.com', backgroundColor: '#00be06' },
    { name: '优酷', href: 'https://www.youku.com', backgroundColor: '#1e9fff' },
    { name: '腾讯视频', href: 'https://v.qq.com', backgroundColor: '#ff7f12' },
    { name: '网易云音乐', href: 'https://music.163.com', backgroundColor: '#c20c0c' },
    { name: 'Steam', href: 'https://store.steampowered.com', backgroundColor: '#1b2838' },
    { name: '斗鱼', href: 'https://www.douyu.com', backgroundColor: '#ff5c00' },
    { name: '哔哩哔哩', href: 'https://www.bilibili.com', backgroundColor: '#fb7299' },
    { name: '快手', href: 'https://www.kuaishou.com', backgroundColor: '#ff4906' }
  ]
}
// education 分类接口仍有数据，无需兜底；如接口将来失效可在此补回对应条目。

const getWebsites = (params: { key: string; name?: string }) => {
  return $GET(
    `${codelifeUrl}/website/list?type=${params.key}&name=${params.name || ''}&size=64`
  ).then((res) => {
    const apiChildren =
      res && res.data
        ? res.data
            .filter((el: any) => el.url && el.url.includes('http'))
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
            }))
        : []
    // 接口停服/无数据时，回退到本地热门站点清单
    if (!apiChildren.length) {
      const list = fallbackSites[params.key] || []
      return {
        key: params.key,
        children: list.map((s, i) => {
          let host = s.href
          try {
            host = new URL(s.href).hostname
          } catch {
            /* 忽略非法 href */
          }
          return {
            id: `${params.key}_fb_${i}`,
            name: s.name,
            icon: `https://api.iowen.cn/favicon/${host}.png`,
            iconType: 'image',
            backgroundColor: s.backgroundColor,
            description: s.href,
            target: '_blank',
            closable: true,
            editable: true,
            href: s.href
          }
        })
      }
    }
    return { key: params.key, children: apiChildren }
  })
}

const getAppIcon = async (href: string) => {
  return await $GET(`${codelifeUrl}/website/info?url=${href}&lang=cn`).then(
    (res) => res.data
  )
}
let appBase = initApps(apps as ItemType[])

export { appBase, addProps, getWebsites, getAppBase, getAppIcon }
