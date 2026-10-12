import dayjs from 'dayjs'

import { stockApiUrl } from '~api/baseUrl'

const $GET = async (url: string, options?: any) => {
  try {
    const res = await fetch(url, {
      ...options,
      method: 'GET'
    })
    const json = await res.json()
    // 新接口统一返回 { code, msg, data }，code = 0 表示成功
    return json?.code === 0 ? json.data : null
  } catch (err) {
    console.log(err)
    return null
  }
}
/**
 * 大盘指数列表（上证 / 深证 / 创业板 / 科创50 等 8 大指数）
 * 对应新接口：GET /api/v1/market/index
 */
const getStockSpot = async ({
  code = 'stock_zh_index_spot_em',
  symbol = ''
}: {
  code: string
  symbol?: string
}): Promise<any[]> => {
  // 通过 market 参数区分 A 股 / 港股 / 美股 指数
  if (
    code === 'stock_zh_index_spot_em' ||
    code === 'stock_hk_index_spot_sina' ||
    code === 'index_global_spot_em'
  ) {
    const marketMap: Record<string, string> = {
      'stock_zh_index_spot_em': 'cn',
      'stock_hk_index_spot_sina': 'hk',
      'index_global_spot_em': 'us'
    }
    const market = marketMap[code] || 'cn'
    const data = (await $GET(`${stockApiUrl}/market/index?market=${market}`)) || []
    return data.map((el: any) => ({
      代码: el.code,
      名称: el.name,
      最新价: el.price,
      涨跌幅: el.changePercent,
      涨跌额: el.change,
      振幅: el.amplitude ?? 0,
      最高: el.high,
      最低: el.low,
      今开: el.open,
      昨收: el.preClose,
      昨收价: el.preClose,
      开盘价: el.open,
      最高价: el.high,
      最低价: el.low
    }))
  }
  return []
}
/**
 * 个股实时行情 + 盘口买卖档位
 * 对应新接口：GET /api/v1/stock/quote、GET /api/v1/stock/depth
 * 兼容旧组件对 stock_bid_ask_em / stock_individual_info_em 的 {item, value} 数组结构
 */
const getStockRealTime = async ({
  code = 'stock_individual_info_em',
  symbol = ''
}: {
  code: string
  symbol?: string
}): Promise<any[]> => {
  if (code === 'stock_individual_info_em') {
    const q: any = await $GET(`${stockApiUrl}/stock/quote?code=${symbol}`)
    if (!q) return []
    return [
      { item: '股票代码', value: q.code },
      { item: '股票简称', value: q.name },
      { item: '行业', value: q.industry || '' },
      { item: '最新', value: q.price },
      { item: '最新价', value: q.price },
      { item: '涨跌', value: q.change },
      { item: '涨跌额', value: q.change },
      { item: '涨幅', value: q.changePercent },
      { item: '涨跌幅', value: q.changePercent },
      { item: '最高', value: q.high },
      { item: '最低', value: q.low },
      { item: '今开', value: q.open },
      { item: '昨收', value: q.preClose },
      { item: '成交量', value: q.volume },
      { item: '成交额', value: q.amount },
      { item: '换手', value: q.turnoverRate },
      { item: '市盈率', value: q.pe },
      { item: '量比', value: q.volumeRatio || 0 },
      { item: '总市值', value: q.marketValue },
      { item: '总股本', value: 0 },
      { item: '流通股', value: 0 },
      { item: '流通市值', value: 0 },
      { item: '上市时间', value: 0 }
    ]
  }
  if (code === 'stock_bid_ask_em') {
    const depth: any = await $GET(`${stockApiUrl}/stock/depth?code=${symbol}`)
    if (!depth) return []
    const asks = depth.asks || []
    const bids = depth.bids || []
    const rows: any[] = []
    // 前 20 行：五档买卖盘（卖 1~5，买 1~5），供 buy_sell_data_list 使用
    // 价格行用 卖N / 买N，量行用 卖Nvol / 买Nvol（含 vol 便于旧逻辑识别）
    asks.slice(0, 5).forEach((a: any, i: number) => {
      rows.push({ item: `卖${i + 1}`, value: a.price })
      rows.push({ item: `卖${i + 1}vol`, value: a.volume })
    })
    bids.slice(0, 5).forEach((b: any, i: number) => {
      rows.push({ item: `买${i + 1}`, value: b.price })
      rows.push({ item: `买${i + 1}vol`, value: b.volume })
    })
    const q: any = await $GET(`${stockApiUrl}/stock/quote?code=${symbol}`)
    if (q) {
      rows.push({ item: '最新', value: q.price })
      rows.push({ item: '最高', value: q.high })
      rows.push({ item: '最低', value: q.low })
      rows.push({ item: '今开', value: q.open })
      rows.push({ item: '昨收', value: q.preClose })
      rows.push({ item: '均价', value: (q.high + q.low) / 2 })
      rows.push({ item: '涨跌', value: q.change })
      rows.push({ item: '涨幅', value: q.changePercent })
      rows.push({ item: '总手', value: q.volume })
      rows.push({ item: '金额', value: q.amount })
      rows.push({ item: '换手', value: q.turnoverRate })
      rows.push({ item: '量比', value: q?.volumeRatio || 0 })
      rows.push({ item: '涨停', value: 0 })
      rows.push({ item: '跌停', value: 0 })
    }
    return rows
  }
  return []
}
/**
 * 行情排行榜（涨幅 / 跌幅 / 成交量 / 成交额）
 * 对应新接口：GET /api/v1/market/rank
 * 兼容旧组件对 stock_hot_rank_em 等热榜的 StockRank 结构
 */
const getStockBoardRank = async ({
  code = 'stock_hot_rank_em',
  indicator = '' as any,
  sector_type = '' as any,
  symbol = '' as any
}: {
  code: string
  symbol?: '即时' | '3日排行' | '5日排行' | '10日排行' | '20日排行' | '科技类'
  indicator?: '今日' | '5日' | '10日'
  sector_type?: '行业资金流' | '概念资金流' | '地域资金流'
}): Promise<any[]> => {
  // 板块资金流（行业 / 概念 / 地域）：调用新接口 /market/board/rank
  if (code === 'stock_sector_fund_flow_rank') {
    const type = sector_type || '行业资金流'
    const data =
      (await $GET(
        `${stockApiUrl}/market/board/rank?sector_type=${encodeURIComponent(
          type
        )}&indicator=${encodeURIComponent(indicator || '今日')}`
      )) || []
    // 后端已直接返回 BoardRank 结构，原样透传
    return data
  }
  const typeMap: Record<string, string> = {
    stock_hot_rank_em: 'rise',
    stock_hot_up_em: 'rise',
    stock_hk_hot_rank_em: 'fall',
    stock_us_famous_spot_em: 'amount'
  }
  const type = typeMap[code] || 'rise'
  const data = (await $GET(`${stockApiUrl}/market/rank?type=${type}&count=50`)) || []
  return data.map((el: any, i: number) => ({
    序号: String(i + 1),
    股票名称: el.name,
    股票简称: el.name,
    名称: el.name,
    代码: el.code,
    股票代码: el.code,
    最新价: el.price,
    涨跌幅: el.changePercent,
    涨跌额: 0,
    成交量: el.volume,
    成交额: 0,
    振幅: 0,
    换手率: 0,
    市盈率: 0,
    量比: 0,
    总市值: 0,
    流通市值: 0,
    最高: el.price,
    最低: el.price,
    今开: el.price,
    昨收: el.price,
    均价: el.price,
    总手: el.volume,
    换手: 0,
    涨停: 0,
    跌停: 0
  }))
}
/**
 * 当日分时数据（含买卖盘性质）
 * 对应新接口：GET /api/v1/stock/time-kline
 * 兼容旧组件对 stock_intraday_em 的 {ticktime, price, volume, kind} 结构
 */
const getStockIntraday = async ({
  code = 'stock_intraday_em',
  symbol = 'sh000300',
  date = ''
}: {
  code: string
  symbol: string
  date?: string
}): Promise<any[]> => {
  const data = (await $GET(`${stockApiUrl}/stock/time-kline?code=${symbol}`)) || []
  return data.map((el: any) => {
    const vol = Number(el.volume) || 0
    // 新接口成交量为带符号：放量为正、缩量为负
    const kind = vol > 0 ? 'U' : vol < 0 ? 'D' : 'E'
    const kindText = vol > 0 ? '买盘' : vol < 0 ? '卖盘' : '中性盘'
    return {
      ticktime: el.time,
      时间: el.time,
      price: el.price,
      成交价: el.price,
      avgPrice: el.avgPrice,
      volume: Math.abs(vol),
      手数: Math.abs(vol),
      kind,
      买卖盘性质: kindText
    }
  })
}
/**
 * 分钟 / 日 K 线数据（含均线）
 * 对应新接口：GET /api/v1/stock/kline
 * 兼容旧组件对 stock_zh_a_hist_min_em / stock_zh_a_hist 的结构
 */
const getStockHoursMinis = async ({
  code = 'stock_zh_a_hist_min_em',
  symbol = 'sh000300',
  start_date = '',
  end_date = '',
  period = '1',
  adjust = 'hfq'
}: {
  code: string
  symbol: string
  start_date?: string
  end_date?: string
  period?: string
  adjust?: string
}): Promise<any[]> => {
  const periodMap: Record<string, string> = {
    '1': '1min',
    '5': '5min',
    '15': '15min',
    '30': '30min',
    '60': '60min',
    d: 'day',
    day: 'day'
  }
  const p = periodMap[period] || '1min'
  const data =
    (await $GET(`${stockApiUrl}/stock/kline?code=${symbol}&period=${p}&count=300`)) ||
    []
  return data.map((el: any) => ({
    时间: el.time,
    开盘: el.open,
    收盘: el.close,
    最高: el.high,
    最低: el.low,
    均价: el.ma5 ?? (el.high + el.low) / 2,
    成交量: el.volume
  }))
}
/**
 * 历史日 K 数据
 * 对应新接口：GET /api/v1/stock/kline?period=day
 */
const getStockHistory = async ({
  code = 'stock_zh_a_hist',
  symbol = 'sh600006',
  start_date = '',
  end_date = '',
  period = '',
  adjust = ''
}: {
  code: string
  symbol: string
  start_date?: string
  end_date?: string
  period?: string
  adjust?: string
}): Promise<any[]> => {
  const data =
    (await $GET(`${stockApiUrl}/stock/kline?code=${symbol}&period=day&count=120`)) ||
    []
  return data.map((el: any) => ({
    日期: el.time,
    开盘: el.open,
    收盘: el.close,
    最低: el.low,
    最高: el.high,
    涨跌额: 0,
    涨跌幅: 0
  }))
}
/**
 * 财经资讯列表
 * 对应新接口：GET /api/v1/news/list
 * 兼容旧组件对 具体事项 / 简称 字段的读取
 */
const getStockNews = async (date = ''): Promise<any[]> => {
  const data = (await $GET(`${stockApiUrl}/news/list?count=50`)) || []
  const list = data?.list || []
  return list.map((el: any, i: number) => ({
    id: String(i),
    具体事项: el.title,
    简称: el.source,
    名称: el.title,
    title: el.title,
    summary: el.summary,
    source: el.source,
    url: el.url,
    href: el.url,
    desc: el.summary
  }))
}

/**
 * 个股信息查询（兼容旧 akshare stock_individual_info_em）
 * 对应新接口：GET /api/v1/stock/quote（已内含量比、市盈率、市值等字段）
 */
const getStockData = async ({
  code = 'stock_individual_info_em',
  symbol = ''
}: {
  code: string
  symbol?: string
}): Promise<any | null> => {
  if (!symbol) return null
  const q: any = await $GET(`${stockApiUrl}/stock/quote?code=${symbol}`)
  if (!q) return null
  return {
    code: q.code,
    name: q.name,
    股票代码: q.code,
    股票简称: q.name,
    行业: q.industry || '',
    最新价: q.price,
    最新: q.price,
    涨跌: q.change,
    涨跌额: q.change,
    涨跌幅: q.changePercent,
    涨幅: q.changePercent,
    最高: q.high,
    最低: q.low,
    今开: q.open,
    昨收: q.preClose,
    成交量: q.volume,
    成交额: q.amount,
    换手: q.turnoverRate,
    换手率: q.turnoverRate,
    市盈率: q.pe,
    量比: q.volumeRatio || 0,
    总市值: q.marketValue
  }
}

/**
 * 市场总貌 / 交易所统计（兼容旧 akshare stock_sse_summary / stock_szse_summary）
 * 说明：新接口未提供交易所级「总貌」统计端点，这里对接 /api/v1/market/index（大盘指数概况）
 * 作为市场总览的兼容数据源；如需上交所/深交所成交总额、上市家数等聚合指标，需后端新增接口。
 */
const getStockStatistic = async ({
  code = 'stock_sse_summary',
  date = ''
}: {
  code: string
  date?: string
}): Promise<any[]> => {
  const market = code === 'stock_szse_summary' ? 'cn' : 'cn'
  const data = (await $GET(`${stockApiUrl}/market/index?market=${market}`)) || []
  return data.map((el: any) => ({
    名称: el.name,
    代码: el.code,
    最新价: el.price,
    涨跌幅: el.changePercent,
    涨跌额: el.change,
    振幅: el.amplitude ?? 0,
    最高: el.high,
    最低: el.low,
    今开: el.open,
    昨收: el.preClose
  }))
}

/**
 * 上交所每日概况（兼容旧 akshare stock_sse_deal_daily）
 * 说明：新接口未提供交易所级「每日概况」端点，这里对接 /api/v1/stock/kline?period=day
 * 作为每日行情（日 K 线）的兼容数据源；如需交易所每日成交/市值等聚合指标，需后端新增接口。
 */
const getStockDaily = async ({
  code = 'stock_sse_deal_daily',
  symbol = 'sh000001',
  date = ''
}: {
  code?: string
  symbol?: string
  date?: string
}): Promise<any[]> => {
  const data =
    (await $GET(
      `${stockApiUrl}/stock/kline?code=${symbol.replace(/^(sh|sz)/, '')}&period=day&count=120`
    )) || []
  return data.map((el: any) => ({
    日期: el.time,
    开盘: el.open,
    收盘: el.close,
    最高: el.high,
    最低: el.low,
    成交量: el.volume,
    均价: el.ma5 ?? (el.high + el.low) / 2
  }))
}

export {
  getStockData,
  getStockStatistic,
  getStockDaily,
  getStockRealTime,
  getStockHoursMinis,
  getStockIntraday,
  getStockHistory,
  getStockNews,
  getStockSpot,
  getStockBoardRank
}
