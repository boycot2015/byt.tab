import type {
    PlasmoCSConfig,
    PlasmoGetInlineAnchor,
    PlasmoGetOverlayAnchorList,
} from 'plasmo'
import { Storage } from '@plasmohq/storage'
import antdResetCssText from 'data-text:antd/dist/reset.css'
import cssText from 'data-text:~/contents/styles/index.scss'
import { Button, Modal } from 'antd'
import { useState } from 'react'
 
export const config: PlasmoCSConfig = {
    matches: ['https://live.douyin.com/*'],
}
 
// 初始化仓库存储
const storage = new Storage({
    area: 'local',
})
 
// load style file
export const getStyle = () => {
    const style = document.createElement('style')
    style.textContent = antdResetCssText + cssText
    return style
}
 
// insert into page dom,紧挨着后面
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
    document.querySelector(`div.cjeyI4Ky > div > div.khbqOfnm`)
 
// 覆盖到元素上
// export const getOverlayAnchorList: PlasmoGetOverlayAnchorList = async () =>
//     document.querySelectorAll('div.RQFWObp0 > div > div:nth-child(1) > div')
 
const CustomButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
 
    const showModal = () => {
        setIsModalOpen(true)
    }
 
    const handleOk = () => {
        setIsModalOpen(false)
    }
 
    const handleCancel = () => {
        setIsModalOpen(false)
    }
 
    return (
        <div>
            <Button className="controlBtn" onClick={showModal}>
                抢购
            </Button>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
 
export default CustomButton