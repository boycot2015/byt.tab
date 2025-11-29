import React from 'react'

import {
    PlusOutlined,
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
    PlusOutlined,
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
    return Component ? React.createElement(Component, { ...(props || {}) }) : null
};