export interface ItemType {
    id: number | string
    pid?: number | string
    name?: string
    href?: string
    target?: string
    row?: number
    col?: number
    icon?: string
    key?: string
    iconType?: string | 'text' | 'font' | 'image'
    backgroundColor?: string
    description?: string
    component?: React.ReactNode
    props?: Record<string, any>
    closable?: boolean
    editable?: boolean
    chosen?: boolean
    selected?: boolean
    children?: ItemType[]
}
export type Hitokoto = {
    id: number
    uuid: string
    hitokoto: string
    type: string
    from: string
    from_who: string
    creator: string
    creator_uid: number
    reviewer: number
    commit_from: string
    created_at: string
    length: number
}
export interface Config {
    seo?: string
    apps?: ItemType[]
    randomImage?: string
    theme: {
        background?: string
        cover?: string
        fontFamily?: string
        autoplay?: number
        festival?: {
            open: boolean
            url?: string
            title?: string
            copyright?: string
            copyrightlink?: string
        }
        primary: string
    },
    hitokotoApi?: string
    title?: string
    description?: string
    search?: {
        engine?: string
        url?: string
        seoList?: {
            name: string
            url: string
        }[]
    }
    footer?: {
        beian?: string | boolean
        hitokoto?: string
        copyright?: string
        power?: {
            text?: string
            href?: string
        }
    }
    favicon?: string
}