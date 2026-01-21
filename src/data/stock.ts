import dayjs from 'dayjs'

import { akApiUrl } from '~api/baseUrl'

const $GET = async (url: string, options?: any) => {
  try {
    const res = await fetch(url, {
      ...options,
      method: 'GET'
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
/**
 * 个股信息查询-东财 | 雪球
 * @param code 'stock_individual_info_em' | 'stock_individual_basic_info_xq', 东财 | 雪球
 * @param symbol string 东财 | 雪球
 */
const getStockData = ({
  code = 'stock_individual_info_em',
  symbol = '603777'
}: {
  code: 'stock_individual_info_em' | 'stock_individual_basic_info_xq'
  symbol: string
}) => {
  return $GET(`${akApiUrl}/${code}?symbol=${symbol}`)
}
/**
 * 股票市场总貌
 * @param code 'stock_sse_summary' 上海证券交易所 | 'stock_szse_summary' 深圳证券交易所
 * @param date string 交易日期
 */
const getStockStatistic = ({
  code = 'stock_sse_summary',
  date = dayjs().format('YYYYMMDD')
}: {
  code: 'stock_sse_summary' | 'stock_szse_summary'
  date?: string
}) => {
  let url = `${akApiUrl}/${code}`
  //   if (code === 'stock_szse_summary') {
  //     url = `${akApiUrl}/${code}?date=${date}`
  //   }
  return $GET(url)
}
/**
 * 上海证券交易所-每日概况
 * @param code 'stock_sse_deal_daily'
 * @param date string 交易日期
 *
 */
const getStockDaily = ({
  code = 'stock_sse_deal_daily',
  date = ''
}: {
  code: string
  date?: string
}) => {
  return $GET(`${akApiUrl}/${code}?date=${date}`)
}
/**
 * 实时行情数据
 *   stock_code: 'stock_zh_a_spot_em' 实时行情数据-东财 沪深京 A 股
 *          | 'stock_zh_a_spot' 实时行情数据-新浪 沪深京 A 股数据
 *          | 'stock_individual_spot_xq' 实时行情数据-雪球 雪球-行情中心-个股
 *          | 'stock_sh_a_spot_em' 实时行情数据-东财 沪 A 股
 *          | 'stock_sz_a_spot_em' 实时行情数据-东财 深 A 股
 *          | 'stock_bj_a_spot_em' 实时行情数据-东财 京 A 股
 *          | 'stock_new_a_spot_em' 实时行情数据-东财 新股
 *          | 'stock_cy_a_spot_em' 实时行情数据-东财 创业板
 *          | 'stock_kc_a_spot_em' 实时行情数据-东财 科创板
 */
enum stock_code {
  stock_zh_a_spot_em = 'stock_zh_a_spot_em',
  stock_sh_a_spot_em = 'stock_sh_a_spot_em',
  stock_individual_spot_xq = 'stock_individual_spot_xq',
  stock_sz_a_spot_em = 'stock_sz_a_spot_em',
  stock_bj_a_spot_em = 'stock_bj_a_spot_em',
  stock_new_a_spot_em = 'stock_new_a_spot_em',
  stock_cy_a_spot_em = 'stock_cy_a_spot_em',
  stock_bid_ask_em = 'stock_bid_ask_em',
  stock_kc_a_spot_em = 'stock_kc_a_spot_em'
}
/**
 *
 * @param code stock_code 渠道类型
 * @param symbol string 股票代码
 */
const getStockRealTime = ({
  code = stock_code.stock_zh_a_spot_em,
  symbol = ''
}: {
  code: string
  symbol?: string
}) => {
  let url = `${akApiUrl}/${code}`
  if (symbol) url = `${url}?symbol=${symbol}`
  return $GET(url)
}

/**
 * 历史行情数据
 * @param code 'stock_zh_a_daily' 新浪  | 'stock_zh_a_hist' 东财 | 'stock_zh_a_hist_tx' 腾讯
 * @param symbol string, 股票代码
 * @param start_date string  开始日期
 * @param end_date string 结束日期
 * @param period string  时间周期
 * @param adjust string 复权类型
 *
 */
const getStockHistory = ({
  code = 'stock_zh_a_hist',
  symbol = 'sh600006',
  start_date = dayjs('2026-01-01 09:30:00').format('YYYYMMDD'), // 开始日期
  end_date = dayjs('2026-12-31 09:30:00').format('YYYYMMDD'), // 结束日期
  period = '1d',
  adjust = 'hfq'
}: {
  code: string
  symbol: string
  start_date?: string // 开始日期
  end_date?: string // 结束日期
  period?: string // 时间周期
  adjust?: string // 复权类型
}) => {
  return $GET(
    `${akApiUrl}/${code}?symbol=${symbol}&period=${period}&adjust=${adjust}&start_date=${start_date || ''}&end_date=${end_date || ''}`
  )
}

/**
 * 日内分时数据-东财
 * @param code 'stock_intraday_sina' 新浪  | 'stock_intraday_em' 东财
 * @param symbol string, 股票代码
 *
 */
const getStockIntraday = ({
  code = 'stock_intraday_sina',
  symbol = 'sh000300',
  date = ''
}: {
  code: string
  symbol: string
  date?: string
}) => {
  let url = `${akApiUrl}/${code}`
  if (symbol) url = `${url}?symbol=${symbol}`
  if (date) url = `${url}&date=${date}`
  return $GET(url)
}
/**
 * 分时数据
 * @param code 'stock_zh_a_minute' 新浪  | 'stock_zh_a_hist_min_em' 东财
 * @param symbol string, 股票代码
 * @param start_date string  开始日期
 * @param end_date string 结束日期
 * @param period string  时间周期
 * @param adjust string 复权类型
 *
 */
const getStockHoursMinis = ({
  code = 'stock_zh_a_minute',
  symbol = 'sh000300',
  start_date = dayjs('2026-01-01 09:30:00').format('YYYYMMDD'), // 开始日期
  end_date = dayjs().format('YYYYMMDD'), // 结束日期
  period = '1d',
  adjust = 'hfq'
}: {
  code: string
  symbol: string
  start_date?: string // 开始日期
  end_date?: string // 结束日期
  period?: string // 时间周期
  adjust?: string // 复权类型
}) => {
  return $GET(
    `${akApiUrl}/${code}?symbol=${symbol}&period=${period}&adjust=${adjust}&start_date=${start_date || ''}&end_date=${end_date || ''}`
  )
}
const getStockNews = (date = '') => {
  return $GET(
    `${akApiUrl}/stock_gsrl_gsdt_em?date=${date || dayjs().format('YYYYMMDD')}`
  )
}

/**
 * 股票指数
 * @param code 
 * a股东财 | a股新浪 | 港股东财 | 港股新浪 | 美股新浪 | 全球指数-实时行情数据
 * 'stock_zh_index_spot_em' | 'stock_zh_index_spot_sina' | 'stock_hk_index_spot_em' | 'stock_hk_index_spot_sina' | 'index_us_stock_sina'
 * @param symbol symbol="上证系列指数"；choice of {"沪深重要指数", "上证系列指数", "深证系列指数", "指数成份", "中证系列指数"}

 */
const getStockSpot = ({
  code = 'stock_zh_index_spot_em',
  symbol = ''
}: {
  code:
    | 'stock_zh_index_spot_em'
    | 'stock_zh_index_spot_sina'
    | 'stock_hk_index_spot_em'
    | 'stock_hk_index_spot_sina'
    | 'index_us_stock_sina'
    | 'index_global_spot_em'
  symbol?: string
}) => {
  let url = `${akApiUrl}/${code}`
  if (symbol) url = `${url}?symbol=${symbol}`
  return $GET(url)
}
/**
 * 板块排行
 */
const getStockBoardRank = ({
  code = 'stock_sector_fund_flow_rank',
  indicator = '' as any,
  sector_type = '' as any,
  symbol = '' as any
}: {
  code:
    | 'stock_fund_flow_individual'
    | 'stock_sector_fund_flow_rank'
    | 'stock_hot_rank_em' // 人气榜-A股
    | 'stock_hot_up_em' // 飙升榜-A股
    | 'stock_hk_hot_rank_em' // 人气榜-港股
    | 'stock_us_famous_spot_em' // 知名美股的实时行情数据
  symbol?: '即时' | '3日排行' | '5日排行' | '10日排行' | '20日排行' | '科技类'
  indicator?: '今日' | '5日' | '10日'
  sector_type?: '行业资金流' | '概念资金流' | '地域资金流'
}) => {
  let url = `${akApiUrl}/${code}?`
  if (symbol) url += `symbol=${symbol}`
  if (indicator) url += `&indicator=${indicator}`
  if (sector_type) url += `&sector_type=${sector_type}`
  return $GET(url)
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
