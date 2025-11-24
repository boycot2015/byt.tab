import { apiUrl, baseUrl } from '~api/baseUrl';
const getIP = async (req?: Request): Promise<{ ip: string, location: string, province?: string, city?: string, district?: string }> => {
    let proxyUrl = `${baseUrl}/cors?url=`
    let body = await fetch(proxyUrl + 'https://www.ip.cn/').then(response => response.json()).then(data => data.data || data)
    let ticket = body.match(/\_ticket = ([^&]+)/)?.[1]?.split(';')[0].replace(/"/g, '')
    let url = 'https://my.ip.cn/json/?ticket=' + ticket
    // let url2 = 'https://api.ipify.org?format=json'
    // console.log(ticket, 'ticket');
    try {
        return fetch(url).then(response => response.json()).then(data => data.data || data)
            .then(data => {
                return {
                    ip: data.query || data.ip,
                    province: data?.province || data?.regionName,
                    city: data?.city,
                    district: data?.district,
                    location: [data?.province || data?.regionName, data?.city, data?.district].filter(el => el).join(' '),
                };
            })
    } catch (error) {
        return {
            ip: '127.0.0.1',
            location: '北京',
        }
    }
}
const getWeather = async (city?: string) => {
    let { ip, location, city: CT, district } = await getIP()
    if (district && district.includes('南山') && CT.includes('深圳')) {
        district = '深圳'
    }
    const response = await fetch(`${apiUrl}/weather?query=${city || district || CT || '北京'}`);
    const data = await response.json();
    return data.data;
};
const getWeatherForecast = async (city?: string) => {
    let { ip, location, city: CT, district } = await getIP()
    if (district && district.includes('南山') && CT.includes('深圳')) {
        district = '深圳'
    }
    const response = await fetch(`${apiUrl}/weather/forecast?query=${city || district || CT || '北京'}`);
    const data = await response.json();
    return data.data;
};
export { getWeather, getWeatherForecast };