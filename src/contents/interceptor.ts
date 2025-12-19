import type { PlasmoCSConfig } from "plasmo";

// 配置匹配规则
export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"], // 适用于所有网页
    all_frames: true
};

// 安全的请求拦截器，避免全局污染
class SafeRequestInterceptor {
    private originalFetch: typeof fetch;
    private originalXHR: typeof XMLHttpRequest;
    private interceptRules: RegExp[];

    constructor() {
        this.originalFetch = window.fetch.bind(window);
        this.originalXHR = window.XMLHttpRequest;
        // 定义需要拦截的URL规则，避免拦截敏感请求
        this.interceptRules = [
            /^https?:\/\/api\./i,
            /^https?:\/\/.*\/api\//i
        ];
    }

    private shouldIntercept(url: string): boolean {
        return this.interceptRules.some(rule => rule.test(url));
    }

    public interceptFetch(): void {
        const self = this;
        window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
            try {
                const url = input instanceof Request ? input.url : input.toString();

                if (self.shouldIntercept(url)) {
                    console.log(`Intercepted Fetch Request: ${url}`, init);
                }

                return await self.originalFetch(input, init);
            } catch (error) {
                console.error('Fetch interceptor error:', error);
                // 确保错误不会影响原始请求流程
                throw error;
            }
        };
    }

    public interceptXHR(): void {
        const self = this;

        class SafeInterceptedXHR extends self.originalXHR {
            open(method: string, url: string | URL, async?: boolean, user?: string | null, password?: string | null): void {
                try {
                    const urlString = typeof url === 'string' ? url : url.toString();

                    if (self.shouldIntercept(urlString)) {
                        console.log(`Intercepted XHR Request: ${method} ${urlString}`);
                    }

                    super.open(method, url, async ?? true, user, password);
                } catch (error) {
                    console.error('XHR interceptor error:', error);
                    throw error;
                }
            }
        }

        // 安全地替换，保留原有原型链
        Object.setPrototypeOf(SafeInterceptedXHR, self.originalXHR);
        Object.setPrototypeOf(SafeInterceptedXHR.prototype, self.originalXHR.prototype);
        window.XMLHttpRequest = SafeInterceptedXHR;
    }

    public init(): void {
        try {
            this.interceptFetch();
            this.interceptXHR();
        } catch (error) {
            console.error('Failed to initialize request interceptor:', error);
        }
    }
}

// 在页面加载完成后初始化拦截器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        new SafeRequestInterceptor().init();
    });
} else {
    new SafeRequestInterceptor().init();
}