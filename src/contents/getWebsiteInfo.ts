import type { PlasmoCSConfig } from "plasmo";
import { sendToBackground, relayMessage } from "@plasmohq/messaging"
import { getPort } from "@plasmohq/messaging/port"
import { getAppIcon } from "~data/apps"
// 配置匹配规则
export const config: PlasmoCSConfig = {
    matches: ["<all_urls>"], // 适用于所有网页
    all_frames: true
};
const websiteInfoPort = getPort("websiteInfo")
const init = async () => {
    const iconRef = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    let data = {
        name: document.title.split('-')[0].trim(),
        description: document.title,
        href: window.location.origin,
        icon: iconRef.href || '',
    }
    await sendToBackground({
        name: "websiteInfo",
        body: data
    })
    websiteInfoPort.postMessage(data)
    relayMessage({
        name: "websiteInfo"
    })
}
init()

