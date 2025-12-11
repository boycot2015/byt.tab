import React from 'react'

import * as icons from '@ant-design/icons/lib/icons/index'
import DateWidget from './widgets/date'
import SettingWidget from './widgets/setting'
import TimeWidget from './widgets/time'
import WeatherWidget from './widgets/weather'
import WallpaperWidget from './widgets/wallpaper'
import NewsWidget from './widgets/news'
const components = {
    ...icons,
    DateWidget,
    SettingWidget,
    TimeWidget,
    WeatherWidget,
    WallpaperWidget,
    NewsWidget
}
export const renderComponent = (componentName, props: Record<string, any> = {}) => {
    const Component = components[componentName]
    return Component ? React.createElement(Component, { ...props }) : null
};