import { useState } from "react"
import { Button } from "antd"
import { ThemeProvider } from "./contents/layouts"

function IndexNewtab() {
  const [data, setData] = useState("")

  return (
    <ThemeProvider>
      <div className="h-[100vh] p-5 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to byt tab by <a href="https://www.plasmo.com" target="_blank">Plasmo</a> Extension!
        </h1>
        <input
      onChange={(e) => setData(e.target.value)} value={data}
      style={{
          maxWidth: "100%",
          minWidth: "100%",
          padding: "8px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          marginBottom: "12px"
        }} />
        <Button type="primary">Submit</Button>
    </div>
    </ThemeProvider>
  )
}

export default IndexNewtab