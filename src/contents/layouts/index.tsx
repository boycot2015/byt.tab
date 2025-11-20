import ConfigProvider from "antd/es/config-provider"
import type { ReactNode } from "react"
// import antdResetCssText from "data-text:antd/dist/reset.css"
// import styleText from 'data-text:~contents/styles/index.css'
import '~contents/styles/index.css'
import type { PlasmoGetStyle } from "plasmo"
// console.log(styleText, 'styleText');
// export const getStyle: PlasmoGetStyle = () => {
//     const style = document.createElement("style")
//     style.textContent = antdResetCssText + styleText
//     return style
// }
export const ThemeProvider = ({ children = null as ReactNode }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#ff9900"
      }
    }}>
    {children}
  </ConfigProvider>
)