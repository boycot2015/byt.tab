import type { Config } from './types'
export default {
    seo: '必应',
    title: 'byt-tab',
    hitokotoApi: 'https://v1.hitokoto.cn',
    description: 'byt-tab is a simple extension that replaces the new tab page with a beautiful and minimalistic design.',
    theme: {
        background: 'https://bing.img.run/rand.php',
        primary: '#1677ff'
    },
    search: {
        engine: 'bing',
        url: 'https://www.bing.com/search?q='
    },
    footer: {
        beian: '18002072号',
        hitokoto: 'hitokoto',
        copyright: '© 2025 Boycot. All rights reserved.',
        power: {
            text: 'Plasmo',
            href: 'https://www.plasmo.com'
        }
    },
    favicon: 'icon.png'
} as Config