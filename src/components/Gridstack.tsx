import cssText from 'data-text:gridstack/dist/gridstack.css'
import { GridStack } from 'gridstack'
import React, { useEffect, useRef } from 'react'

const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  document.head.appendChild(style)
  return style
}
getStyle()
const GridstackComponent = () => {
  const gridRef = useRef<any>(null)
  useEffect(() => {
    const grid = GridStack.init()
    grid.addWidget({ w: 2, content: `<div>item 1</div>` })
    gridRef.current = grid
  }, [])
  return <div className="grid-stack"> </div>
}
export default GridstackComponent
