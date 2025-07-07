import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar.tsx"
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <App />
        </main>
      </SidebarProvider>

    </QueryClientProvider>
  </StrictMode>,
)
