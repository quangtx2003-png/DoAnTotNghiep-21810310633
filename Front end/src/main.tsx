import { createRoot } from 'react-dom/client'
import '@/index.css'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import ScrollToTop from '@/components/scroll-to-top'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster />
    <ScrollToTop />
  </BrowserRouter>
)
