import React from 'react'
import {
    AndroidOutlined,
    AppleOutlined,
    WindowsOutlined,
    BaiduOutlined,
    SettingFilled
} from '@ant-design/icons'
import DateWidget from './widgets/date'
import SettingWidget from './widgets/setting'
import TimeWidget from './widgets/time'
import WeatherWidget from './widgets/weather'
const components = {
    BaiduOutlined,
    AndroidOutlined,
    AppleOutlined,
    WindowsOutlined,
    SettingFilled,
    DateWidget,
    SettingWidget,
    TimeWidget,
    WeatherWidget
}
export const renderComponent = (componentName, props?: Record<string, any>) => {
    const Component = components[componentName]
    // console.log(componentName, Component, 'Component');
    return Component ? React.useMemo(() => React.createElement(Component, { ...(props || {}) }), [Component, props]) : null
};