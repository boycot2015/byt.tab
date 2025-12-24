
import { codelifeUrl } from '~api/baseUrl'
import { $GET } from '~utils/index'
const getNews = async (params?: { id: string }) => {
    const res = await $GET(`${codelifeUrl}/api/top/list?id=${params?.id || 'KqndgxeLl9'}`)
    return res.data
}
const getNewsCate = async () => {
    const res = await $GET(`${codelifeUrl}/api/top/category?lang=cn`)
    return res.data
}
export { getNews, getNewsCate }
