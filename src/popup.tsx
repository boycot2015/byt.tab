import { useState } from "react"
import { Button, message } from "antd"
import { ThemeProvider } from "./contents/layouts"

function IndexPopup() {
  const [data, setData] = useState("")
  const handleSubmit = () => {
    message.success("提交成功")
  }
  return (
    <ThemeProvider>
    <div
      style={{
        padding: 16,
        width: 300,
        height: "auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
      }}>
        <h2 style={{ color: "#2563eb", marginBottom: "12px" }}>
        🎉 欢迎使用 byt tab！
      </h2>
      <input
        placeholder="在这里输入一些内容..."
        onChange={(e) => setData(e.target.value)}
        value={data}
        style={{
          maxWidth: "100%",
          minWidth: "100%",
          padding: "8px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          marginBottom: "12px"
        }}
      />
      <div style={{ fontSize: "14px", color: "#9ca3af" }}>
        输入内容：{data || "暂无内容"}
      </div>
      <Button type="primary" className="mt-4" style={{ width: "100%" }} onClick={() => handleSubmit()}>
        提交
      </Button>
      <div  style={{ marginTop: "12px" }}>
        <a href="https://docs.plasmo.com" target="_blank" style={{ color: "#2563eb" }}>
          查看开发文档
        </a>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default IndexPopup
