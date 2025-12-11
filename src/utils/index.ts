export const getWeek = (day: number, prefix: string = '周', showToday: boolean = false) => {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    if (showToday && day == new Date().getDay()) return '今天'
    if (showToday && day == new Date().getDay() - 1) return '昨天'
    if (showToday && day == new Date().getDay() + 1) return '明天'
    return prefix + week[day]
}
// 防抖点击之后过了wait才响应，如果一直点，就一直没有响应，直到你停下来后，wait后执行。防抖是一进来就清，然后wait后再做
export function antishake<T>(fn: T, wait?: number): () => void { //第一个参数是函数 第二个参数是毫秒值
    wait = wait || 200
    let timer: NodeJS.Timeout //声明一个变量来接收延时器 初始值为null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            typeof fn === 'function' && fn(...args) //调用这函数
        }, wait);
    }
}

// 节流， 每wait执行一次，如果你一直点，就过2s执行一次，过wait再执行一次。<br /> 节流是 一进来就先看有没有，有的话就啥都不做，没有的话再做 ，做完清
export function throttle<T>(fn: T, wait?: number): () => void {
    wait = wait || 200
    let timer: NodeJS.Timeout | null //节点闸
    return function (...args) {
        if (timer) return //null false 不是null结果减少true 如果上传没有我就直接跳过 没有人我就上去
        timer = setTimeout(() => {
            typeof fn === 'function' && fn(...args) //调用这函数
            timer = null //做完之后重新关闭节点闸
        }, wait);
    }
}

export const mouseOverEffect = (target: HTMLDivElement, element: HTMLElement, options?: { multiple?: number, max?: number }) => {
    const multiple = options?.multiple || 6;
    const max = options?.max || 15;
    const mouseOverContainer = target

    function transformElement(x, y) {
        let box = element.getBoundingClientRect();
        let calcX = -(y - box.y - (box.height / 2)) / multiple;
        let calcY = (x - box.x - (box.width / 2)) / multiple;
        if (calcX > max) calcX = max;
        if (calcX < -max) calcX = -max;
        if (calcY > max) calcY = max;
        if (calcY < -max) calcY = -max;
        element.style.transform = "rotateX(" + calcX + "deg) "
            + "rotateY(" + calcY + "deg)";
    }
    mouseOverContainer.addEventListener("mousemove", (e) => {
        // console.log(target, element);
        window.requestAnimationFrame(function () {
            transformElement(e.clientX, e.clientY);
        });
    });
}