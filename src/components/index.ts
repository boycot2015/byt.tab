import * as icons from '@ant-design/icons/lib/icons/index'
import React from 'react'

import DateWidget from './widgets/date'
import FinanceWidget from './widgets/finance'
import NewsWidget from './widgets/news'
import SettingWidget from './widgets/setting'
import TimeWidget from './widgets/time'
import WallpaperWidget from './widgets/wallpaper'
import WeatherWidget from './widgets/weather'

const components = {
  ...icons,
  DateWidget,
  SettingWidget,
  TimeWidget,
  WeatherWidget,
  WallpaperWidget,
  NewsWidget,
  FinanceWidget
}
export const renderComponent = (
  componentName,
  props: Record<string, any> = {}
) => {
  const Component = components[componentName]
  return Component ? React.createElement(Component, { ...props }) : null
}
