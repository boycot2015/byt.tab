export interface ItemType {
    id: number | string
    pid?: number | string
    name?: string
    href?: string
    target?: string
    row?: number
    col?: number
    icon?: string
    iconType?: string | 'text' | 'font' | 'image'
    backgroundColor?: string
    component?: React.ReactNode
    props?: Record<string, any>
    closable?: boolean
    editable?: boolean
    chosen?: boolean
    selected?: boolean
    children?: ItemType[]
}
export interface Config {
    seo?: string
    apps?: ItemType[]
    theme: {
        background?: string
        primary: string
    },
    title?: string
    description?: string
    search?: {
        engine?: string
        url?: string
    }
    footer?: {
        beian?: string
        hitokoto?: string
        copyright?: string
        power?: {
            text?: string
            href?: string
        }
    }
    favicon?: string
}