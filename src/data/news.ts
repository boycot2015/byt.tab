
import { apiUrl, baseUrl, codelifeUrl } from '~api/baseUrl'
const getNews = async (params?: { id: string }) => {
    const res = await fetch(`${codelifeUrl}/api/top/list?id=${params?.id || 'KqndgxeLl9'}`).then((res) => res.json())
    return res.data
}
const getNewsCate = async () => {
    const res = await fetch(`${codelifeUrl}/api/top/category?lang=cn`).then((res) => res.json())
    return res.data
}
export { getNews, getNewsCate }
