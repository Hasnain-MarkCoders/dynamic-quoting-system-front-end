import { AppSidebar } from "@/components/app-sidebar"
import MobileMenu from "@/components/MobileMenu";
import { SidebarProvider } from "@/components/ui/sidebar"
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  
  return (
    <div className="w-full"> 
       
        
      <main className='w-full'>
        <SidebarProvider>

      <AppSidebar  />
          <div className="w-full">
            <MobileMenu/>

        {children}
          </div>
        </SidebarProvider>
      </main>
    </div>
  )
}

export default Layout
