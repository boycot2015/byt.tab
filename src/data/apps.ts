
import { codelifeUrl } from '~api/baseUrl'
import apps from './apps.json'
const appBase = apps
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
const getAppBase = async () => {
    return await Promise.all(appBase.map(async (item) => {
        let res = await getWebsites({ key: item.key })
        item.children = item.children.concat(res.children.slice(0, 12))
        return item
    })).then((res) => res.map((app) => {
        const children = app.children?.find((_) => _.id.toString() == app.id + '_add')
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
    }))
}
const getWebsites = (params: { key: string }) => {
    return fetch(`${codelifeUrl}/website/list?type=${params.key}&size=64`)
        .then((res) => res.json())
        .then((res) => {
            return {
                key: params.key,
                children:
                    res.data
                        ?.filter((el) => el.url && el.url.includes('http'))
                        .map((item: any) => ({
                            id: item._id,
                            name: item.name,
                            icon: item.imgSrc || item.src,
                            backgroundColor: item.backgroundColor,
                            description: item.description,
                            target: '_blank',
                            closable: true,
                            editable: true,
                            href: item.url
                        })) || []
            }
        })
}

const getAppIcon = async (href: string) => {
    return await fetch(`${codelifeUrl}/website/info?url=${href}&lang=cn`)
        .then((res) => res.json())
        .then((res) => res.data)
}
export { appBase, addProps, getWebsites, getAppBase, getAppIcon }
