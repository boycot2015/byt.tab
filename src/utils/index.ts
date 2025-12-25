import { apiUrl, baseUrl, codelifeUrl } from '~api/baseUrl'
import {
    HolidayUtil,
    Solar
} from 'lunar-typescript'
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

export const $GET = async (url: string, options?: RequestInit) => {
    try {
        let path = url.startsWith(baseUrl) ? url : `${baseUrl}/cors?url=${url}`
        const res = await fetch(path, {
            ...options,
            method: 'GET'
        })
        const data = await res.json()
        return url.startsWith(baseUrl) ? data : data.data
    } catch (err) {
        console.log(err)
    }
}
export class Day {
    public month: number = 0
    public day: number = 0
    public lunarDay: string = ''
    public lunarMonth: string = ''
    public yearGanZhi: string = ''
    public yearShengXiao: string = ''
    public monthGanZhi: string = ''
    public dayGanZhi: string = ''
    public ymd: string = ''
    public desc: string = ''
    public isToday: boolean = false
    public isSelected: boolean = false
    public isRest: boolean = false
    public isHoliday: boolean = false
    public festivals: string[] = []
    public dateIcon: string = ''
    public jieQi: string = ''
    public dateIcons: Record<string, string> = {}
    public customFestivals: string[] = []
    public yi: string[] = []
    public ji: string[] = []
}
export function buildDay(d: Solar = Solar.fromDate(new Date())) {
    const now = Solar.fromDate(new Date())
    const ymd = d.toYmd()
    const lunar = d.getLunar()
    const day = new Day()
    day.month = d.getMonth()
    day.day = d.getDay()
    day.lunarMonth = lunar.getMonthInChinese()
    day.lunarDay = lunar.getDayInChinese()
    day.yearGanZhi = lunar.getYearInGanZhi()
    day.yearShengXiao = lunar.getYearShengXiao()
    day.monthGanZhi = lunar.getMonthInGanZhi()
    day.dayGanZhi = lunar.getDayInGanZhi()
    day.ymd = ymd
    day.isToday = ymd == now.toYmd()
    const solarFestivals = d.getFestivals()
    solarFestivals.forEach((f) => {
        day.festivals.push(f)
    })
    lunar.getFestivals().forEach((f) => {
        day.festivals.push(f)
    })
    lunar.getOtherFestivals().forEach((f) => {
        day.festivals.push(f)
    })
    d.getOtherFestivals().forEach((f) => {
        day.festivals.push(f)
    })
    day.customFestivals = [...d.getFestivals(), ...lunar.getFestivals()]
    let rest = false
    if (d.getWeek() === 6 || d.getWeek() === 0) {
        rest = true
    }
    const holiday = HolidayUtil.getHoliday(ymd)
    if (holiday) {
        rest = !holiday.isWork()
    }
    day.isHoliday = !!holiday
    day.isRest = rest
    day.yi = lunar.getDayYi()
    day.ji = lunar.getDayJi()
    let desc = lunar.getDayInChinese()
    const jq = lunar.getJieQi()
    if (jq) {
        desc = jq
    } else if (lunar.getDay() === 1) {
        desc = lunar.getMonthInChinese() + '月'
    } else if (solarFestivals.length > 0) {
        const f = solarFestivals[0]
        if (f.length < 4) {
            desc = f
        }
    }
    day.desc = desc
    day.dateIcons = {
        圣诞节: '🎄',
        平安夜: '🍎',
        元旦节: '🎈',
        元宵节: '🏮',
        春节: '🧧',
        清明节: '🌸',
        端午节: '🐲',
        植树节: '🌳',
        中秋节: '🥮',
        国庆节: '🇨🇳',
        国际老年人日: '🧓',
        七夕节: '💖',
        儿童节: '🧒',
        妇女节: '🌹',
        情人节: '💑',
        复活节: '🔥',
        感恩节: '🙏',
        青年节: '👨',
        愚人节: '🤪',
        劳动节: '👷',
        春分: '☘️',
        立春: '🌱',
        雨水: '🌧️',
        惊蛰: '🐛',
        谷雨: '🌾',
        小满: '👨‍🌾',
        清明: '🌸',
        大满: '🌾',
        芒种: '☀',
        立夏: '🌻',
        夏至: '🌞',
        小暑: '🍉',
        处暑: '🌾',
        大暑: '🔥',
        霜降: '💦',
        寒露: '🍃',
        白露: '💧',
        秋分: '🌗',
        立秋: '🍁',
        小雪: '❄',
        大雪: '⛄️',
        冬至: '🥟',
        小寒: '🎿',
        立冬: '🐧',
        大寒: '🥶',
    }
    day.jieQi = jq
    day.dateIcon = day.festivals.concat(day.jieQi).map((f) => day.dateIcons[f]).join('') || ''
    return day
}