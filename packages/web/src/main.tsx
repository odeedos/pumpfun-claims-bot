import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateCoin from './pages/CreateCoin'
import Docs from './pages/Docs'
import Packages from './pages/Packages'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create" element={<CreateCoin />} />
          <Route path="docs" element={<Docs />} />
          <Route path="packages" element={<Packages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
