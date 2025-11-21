import Button from 'antd/es/button'

import { useStorage } from '@plasmohq/storage/hook'

import { ThemeProvider } from '~/contents/layouts'

function IndexOptions() {
  const [openCount, setOpenCount] = useStorage<number>('open-count')
  return (
    <ThemeProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 16
        }}>
        <p>Times opened: {openCount}</p>
        <div className="flex gap-2">
          <Button type="primary" onClick={() => setOpenCount(openCount + 1)}>
            增加
          </Button>
          <Button type="primary" color="danger" onClick={() => setOpenCount(0)}>
            重置
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default IndexOptions
