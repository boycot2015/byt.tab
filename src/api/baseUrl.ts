let baseUrl = 'https://api.boycot.top/api';
let apiUrl = 'https://api-v2.boycot.top/v2';
let codelifeUrl = 'https://api.codelife.cc';
switch (process.env.NODE_ENV) {
    case 'development':
        apiUrl = 'https://api-v2.boycot.top/v2';
        // baseUrl = 'https://api.bpycpt.top/api';
        break;
    case 'production':
        apiUrl = 'https://api-v2.boycot.top/v2';
        break;
}
export { baseUrl, apiUrl, codelifeUrl };