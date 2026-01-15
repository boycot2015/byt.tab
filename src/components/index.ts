import * as icons from '@ant-design/icons/lib/icons/index'
import React from 'react'

import DateWidget from './widgets/date'
import NewsWidget from './widgets/news'
import SettingWidget from './widgets/setting'
import StockWidget from './widgets/stock'
import StockNewsWidget from './widgets/stock/news'
import StockRankWidget from './widgets/stock/rank/stockRank'
import StockSelfWidget from './widgets/stock/self'
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
  StockWidget,
  StockNewsWidget,
  StockRankWidget,
  StockSelfWidget
}
export const renderComponent = (
  componentName,
  props: Record<string, any> = {}
) => {
  const Component = components[componentName]
  return Component ? React.createElement(Component, { ...props }) : null
}
