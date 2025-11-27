export interface ItemType {
    id: number
    pid?: number
    name: string
    href?: string
    target?: string
    row?: number
    col?: number
    icon?: React.ReactNode
    component?: React.ReactNode
    props?: Record<string, any>
    closable?: boolean
    editable?: boolean
    children?: ItemType[]
}
export interface Config {
    theme: {
        primary: string
    }
}