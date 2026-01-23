// 引入 ECharts 核心模块

// 引入常用图表类型
import { BarChart, CandlestickChart, LineChart, PieChart } from 'echarts/charts'
// 引入组件
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'
// 引入特性和渲染器
import { AxisBreak, LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册需要的组件
echarts.use([
  VisualMapComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
  LineChart,
  PieChart,
  BarChart,
  CandlestickChart,
  LabelLayout,
  UniversalTransition,
  AxisBreak,
  CanvasRenderer,
  LegendComponent
])

// 导出 ECharts 实例
export default function (el: HTMLElement, option: any) {
  if (!el) return null
  const chart = echarts.init(el)
  chart.setOption(option)
  return chart
}
