import { akApiUrl } from '~api/baseUrl'
import dayjs from 'dayjs'
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
const getFinanceData = ({
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
const getFinanceStatistic = ({
  code = 'stock_sse_summary',
  date = new Date().toLocaleDateString()
}: {
  code: 'stock_sse_summary' | 'stock_szse_summary'
  date?: string
}) => {
  let url = `${akApiUrl}/${code}`
  if (code === 'stock_szse_summary') {
    url = `${akApiUrl}/${code}?date=${date}`
  }
  return $GET(url)
}
/**
 * 上海证券交易所-每日概况
 * @param code 'stock_sse_deal_daily'
 * @param date string 交易日期
 *
 */
const getFinanceDaily = ({
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
  stock_sz_a_spot_em = 'stock_sz_a_spot_em',
  stock_bj_a_spot_em = 'stock_bj_a_spot_em',
  stock_new_a_spot_em = 'stock_new_a_spot_em',
  stock_cy_a_spot_em = 'stock_cy_a_spot_em',
  stock_kc_a_spot_em = 'stock_kc_a_spot_em'
}
/**
 *
 * @param code stock_code 渠道类型
 * @param symbol string 股票代码
 */
const getFinanceRealTime = ({
  code = stock_code.stock_zh_a_spot_em
}: {
  code: stock_code
}) => {
  return $GET(`${akApiUrl}/${code}`)
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
const getFinanceHistory = ({
  code = 'stock_zh_a_hist',
  symbol = 'sh600006',
  start_date = '2024-01-01 09:30:00', // 开始日期
  end_date = '2026-12-31 09:30:00', // 结束日期
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
const getFinanceIntraday = ({
  code = 'stock_intraday_sina',
  symbol = 'sh000300'
}: {
  code: string
  symbol: string
}) => {
  return $GET(`${akApiUrl}/${code}?symbol=${symbol}`)
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
const getFinanceHoursMinis = ({
  code = 'stock_zh_a_minute',
  symbol = 'sh000300',
  start_date = '2026-01-01 09:30:00', // 开始日期
  end_date = new Date().toLocaleDateString(), // 结束日期
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
const getFinanceNews = (date = '') => {
  return $GET(
    `${akApiUrl}/stock_gsrl_gsdt_em?date=${date || dayjs().format('YYYYMMDD')}`
  )
}
export {
  getFinanceData,
  getFinanceStatistic,
  getFinanceDaily,
  getFinanceRealTime,
  getFinanceHoursMinis,
  getFinanceIntraday,
  getFinanceHistory,
  getFinanceNews
}
