import { ConfigProvider } from 'antd'
import { useResponsive } from 'antd-style'
import zhCN from 'antd/es/locale/zh_CN'
import cssText from 'data-text:~styles/index.css'
import ContexifyCss from 'data-text:react-contexify/ReactContexify.css'
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children?: ReactNode
  colorPrimary?: string
  cssVar?: Record<string, any>
  token?: Record<string, any>
}
export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector('#__plasmo')
export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = ContexifyCss + cssText
  document.head.appendChild(style)
  return style
}
getStyle()
// console.log(cssText, 'cssText');

export const ThemeProvider = ({
  children,
  token = {},
  cssVar = {}
}: ThemeProviderProps) => {
  const { xxl, xl } = useResponsive()
  return (
    <ConfigProvider
      locale={zhCN}
      prefixCls="byt"
      componentSize={'middle'}
      theme={{
        cssVar: {
          prefix: 'byt',
          ...cssVar
        },
        token: {
          fontFamily:
            'CangErYuYang, OPPOSans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
          ...token,
          colorPrimary: token.colorPrimary || '#ff9900',
          paddingLG: 16
        }
      }}>
      {children}
    </ConfigProvider>
  )
}
