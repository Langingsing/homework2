import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import App from './App.tsx'

// 导入并初始化mockjs
import Mock from 'mockjs'
Mock.setup({ timeout: '200-600' })

// 调试信息
console.log('Application starting...')
console.log('Mockjs imported:', !!Mock)

// 确保DOM元素存在
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
} else {
  console.log('Root element found:', rootElement)
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
