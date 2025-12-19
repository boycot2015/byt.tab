import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
    res.send({
        code: 200,
        data: req.body,
        message: '操作成功',
        success: true,
    })
}

export default handler