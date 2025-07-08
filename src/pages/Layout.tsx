import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className=""> 
    <SidebarProvider >
      <AppSidebar  />
      <main className='w-full'>
        {children}
      </main>
    </SidebarProvider>
    </div>
  )
}

export default Layout
