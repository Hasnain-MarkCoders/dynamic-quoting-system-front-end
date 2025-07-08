import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SidebarProvider } from './components/ui/sidebar.tsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <SidebarProvider>
    <QueryClientProvider client={queryClient}>
          <App />
    </QueryClientProvider>
    </SidebarProvider>
  </StrictMode>,
)
