import type { Config } from './types'
// import { randomImageApi } from './api/baseUrl'
export default {
    seo: '必应',
    title: 'byt-tab',
    randomImage: 'https://bing.img.run/rand.php',
    hitokotoApi: 'https://v1.hitokoto.cn', // https://v1.hitokoto.cn
    description: 'byt-tab is a simple extension that replaces the new tab page with a beautiful and minimalistic design.',
    theme: {
        background: 'https://bing.img.run/rand.php',
        festival: true,
        fontFamily: 'CangErYuYang',
        primary: '#1677ff'
    },
    search: {
        engine: 'bing',
        url: 'https://www.bing.com/search?q=',
        seoList: [
            {
                name: '百度',
                url: 'https://www.baidu.com/s?wd='
            },
            {
                name: 'Google',
                url: 'https://www.google.com/search?q='
            },
            {
                name: '必应',
                url: 'https://www.bing.com/search?q='
            },
            {
                name: '搜狗',
                url: 'https://www.sogou.com/web?query='
            },
            {
                name: '聚合搜索',
                url: 'https://www.so.com/s?q='
            }
        ]
    },
    footer: {
        beian: false,// 18002072号
        hitokoto: 'hitokoto',
        copyright: '© 2025 Boycot. All rights reserved.',
        power: {
            text: 'Plasmo',
            href: 'https://www.plasmo.com'
        }
    },
    favicon: 'icon.png',
} as Config