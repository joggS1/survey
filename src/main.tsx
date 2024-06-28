import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './reset.css'
import { ConfigProvider } from 'antd'
import ru_Ru from 'antd/locale/ru_RU'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={ru_Ru}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
