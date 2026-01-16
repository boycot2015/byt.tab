let baseUrl = 'https://api.boycot.top/api'
// let apiUrl = 'https://api-v2.boycot.top/v2';
let apiUrl = 'https://60s.viki.moe/v2'
let akApiUrl = 'https://ak.boycot.top/api/public'
let codelifeUrl = 'https://api.codelife.cc'
let randomImageApi = 'https://bing.img.run/rand.php'
switch (process.env.NODE_ENV) {
  case 'development':
    // apiUrl = 'https://60s.viki.moe/v2';
    // baseUrl = 'https://api.bpycpt.top/api';
    // baseUrl = 'http://192.168.30.145:8090/api';
    akApiUrl = 'http://0.0.0.0:8000/api/public'
    break
  case 'production':
    // apiUrl = 'https://60s.viki.moe/v2';
    break
}
export { baseUrl, apiUrl, codelifeUrl, randomImageApi, akApiUrl }
