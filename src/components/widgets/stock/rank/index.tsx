import BoardRank from './boardRank'
import StockRank from './stockRank'

// 导出板块排行组件
export const BoardRankWidget = BoardRank

// 导出个股排行组件
export const StockRankWidget = StockRank
type Props = {
  stockType?: string // 'se' | 'hk' | 'us'
  withComponents?: boolean
  size?: 'middle' | 'large' | 'biggest'
  stockRType?: string
}
// 默认导出板块排行组件（保持向后兼容）
export default (props: Props) => {
  const rankTypes = [
    {
      key: 'stock_hot_rank_em',
      type: 'se',
      label: '人气榜'
    },
    {
      key: 'stock_hot_up_em',
      type: 'se',
      label: '飙升榜'
    },
    {
      key: 'stock_hk_hot_rank_em',
      type: 'hk',
      label: '人气榜'
    },
    {
      key: 'stock_us_famous_spot_em',
      type: 'us',
      label: '热门榜'
    }
  ]
  return (
    <div>
      {props.stockType && props.stockType == 'se' && (
        <>
          <BoardRank {...props} withComponents />
        </>
      )}
      <h3 className="text-white text-lg font-bold my-2">
        {props.stockType === 'hk' ? '港股' : ''}股票排行
      </h3>
      <StockRank
        {...props}
        withComponents
        rankTypes={rankTypes.filter((item) => item.type === props.stockType)}
      />
    </div>
  )
}
