import { AppSidebar } from "@/components/app-sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { AlignJustify } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  
  const {toggleSidebar} = useSidebar()
  return (
    <div className=" w-full"> 
        <div className="md:hidden p-4 pb-0">
        
          <AlignJustify onClick={toggleSidebar} />
   
        </div>
      <main className='w-full md:pl-14'>
      <AppSidebar  />

        {children}
      </main>
    </div>
  )
}

export default Layout
