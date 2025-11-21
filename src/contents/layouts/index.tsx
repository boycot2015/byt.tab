import { ConfigProvider } from 'antd'
import { useResponsive } from 'antd-style'
import zhCN from 'antd/es/locale/zh_CN'
import cssText from 'data-text:~styles/index.css'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children?: ReactNode
  colorPrimary?: string
}
export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  document.head.appendChild(style)
  return style
}
getStyle()
// console.log(cssText, 'cssText');

export const ThemeProvider = ({
  children,
  colorPrimary
}: ThemeProviderProps) => {
  const { xxl, xl } = useResponsive()
  return (
    <ConfigProvider
      locale={zhCN}
      prefixCls="byt"
      componentSize={'middle'}
      theme={{
        cssVar: {
          prefix: 'byt'
        },
        token: {
          colorPrimary: colorPrimary || '#ff9900'
        }
      }}>
      {children}
    </ConfigProvider>
  )
}
