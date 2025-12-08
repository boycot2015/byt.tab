import { useEffect, useRef } from 'react'

const Clock = ({ time }: { time: Date }) => {
  /* 主绘制函数：每帧擦掉旧画面 -> 重新画新画面，形成动画 */
  const canvas = useRef<HTMLCanvasElement>(null)
  let width = 140
  let height = 140
  var r = width / 2
  //为了宽度高度放大是时，其他边框等比美观，所以设置一个比例
  var rem = width / 200

  function drawBackground(ctx) {
    ctx.save()
    ctx.translate(r, r)
    ctx.beginPath() //每次开始前必须开始一条路径
    //按比例输出边框宽度，width/200=x/10=rem; 即 x=10 *rem
    ctx.lineWidth = 5 * rem
    ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false)

    ctx.stroke()

    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
    hourNumbers.map(function (number, i) {
      var rad = ((2 * Math.PI) / 12) * i
      var x = Math.cos(rad) * (r - 30 * rem)
      var y = Math.sin(rad) * (r - 30 * rem)
      ctx.textAlign = 'center'
      ctx.fillStyle = '#fff'
      ctx.textBaseline = 'middle'
      ctx.font = 18 * rem + 'px Arial'
      ctx.fillText(number.toString(), x, y)
    })

    for (var i = 0; i < 60; i++) {
      var rad = ((2 * Math.PI) / 60) * i
      var x = Math.cos(rad) * (r - 18 * rem)
      var y = Math.sin(rad) * (r - 18 * rem)
      ctx.beginPath()
      if (i % 5 === 0) {
        ctx.fillStyle = '#fff'
      } else {
        ctx.fillStyle = '#333'
      }
      ctx.arc(x, y, 2 * rem, 2 * Math.PI, 0)
      ctx.fill()
    }
  }

  function drawHour(ctx, hour, minute) {
    ctx.save()
    ctx.beginPath()
    var rad = ((2 * Math.PI) / 12) * hour
    var mrad = ((2 * Math.PI) / 12 / 60) * minute
    ctx.rotate(rad + mrad)
    ctx.lineWidth = 6 * rem
    ctx.strokeStyle = '#fff'
    ctx.moveTo(0, 10 * rem)
    ctx.lineTo(0, -r / 2)
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.restore()
  }

  function drawMinute(ctx, minute) {
    ctx.save()
    ctx.beginPath()
    var rad = ((2 * Math.PI) / 60) * minute
    ctx.rotate(rad)
    ctx.lineWidth = 3 * rem
    ctx.strokeStyle = '#fff'
    ctx.moveTo(0, 10 * rem)
    ctx.lineTo(0, -r / 2 - 10)
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.restore()
  }

  function drawSecond(ctx, second) {
    ctx.save()
    ctx.beginPath()
    var rad = ((2 * Math.PI) / 60) * second
    ctx.rotate(rad)
    ctx.lineWidth = 5 * rem
    ctx.moveTo(-2 * rem, 20 * rem)
    ctx.lineTo(2 * rem, 20 * rem)
    // ctx.lineTo(1, -r + 18 * rem)
    ctx.lineTo(1, -r + 18 * rem)
    ctx.fillStyle = '#e4393c'
    ctx.fill()
    ctx.restore()
  }

  function drawDot(ctx) {
    ctx.beginPath()
    ctx.fillStyle = '#e4393c'
    ctx.arc(0, 0, 8 * rem, 2 * Math.PI, 0)
    ctx.fill()
  }

  function draw(ctx) {
    ctx.clearRect(0, 0, width, height)
    var now = new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    drawBackground(ctx)
    drawHour(ctx, hour, minute)
    drawMinute(ctx, minute)
    drawSecond(ctx, second)
    drawDot(ctx)
    ctx.restore()
    requestAnimationFrame(() => draw(ctx))
  }
  /* 启动！第一次手动调用，后面就靠 requestAnimationFrame 自动循环 */
  useEffect(() => {
    let ctx = canvas.current.getContext('2d')
    canvas.current && draw(ctx)
  }, [canvas.current])
  return <canvas ref={(el) => (canvas.current = el)} width={140} height={140} />
}
export default Clock
