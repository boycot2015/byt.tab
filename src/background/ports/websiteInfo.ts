import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
    console.log(req, 'websiteInfo')
    res.send({
        data: { ...req },
        message: "Hello from port handler"
    })
}

export default handler