export interface ItemType {
    id: number | string
    pid?: number | string
    name?: string
    href?: string
    target?: string
    row?: number
    col?: number
    icon?: React.ReactNode
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
    theme: {
        background?: string
        primary: string
    }
}