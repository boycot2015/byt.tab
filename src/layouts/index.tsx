import { useLocalStorageState } from 'ahooks'
import { ConfigProvider } from 'antd'
import { useResponsive } from 'antd-style'
import zhCN from 'antd/es/locale/zh_CN'
import cssText from 'data-text:~styles/index.css'
import ContexifyCss from 'data-text:react-contexify/ReactContexify.css'
import type { PlasmoGetInlineAnchor } from 'plasmo'
import type { ReactNode } from 'react'

import tabConfig from '~tabConfig'
import type { Config } from '~types'

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
  const [config] = useLocalStorageState<Config>('config', {
    defaultValue: tabConfig,
    listenStorageChange: true
  })
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
          colorPrimary: token.colorPrimary || config.theme.primary || '#ff9900',
          colorBorderSecondary: 'rgba(114, 114, 114, 0.5)',
          colorBorder: 'rgba(114, 114, 114, 0.5)',
          paddingLG: 16,
          ...token
        }
      }}>
      {children}
    </ConfigProvider>
  )
}

export const sizeMap = {
  mini: 'icon-size-1x1',
  small: 'icon-size-1x2',
  middle: 'icon-size-2x2',
  large: 'icon-size-2x4'
}
