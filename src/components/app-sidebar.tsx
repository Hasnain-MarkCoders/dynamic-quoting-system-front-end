import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Home, Settings } from "lucide-react"
import logo from "@/assets/images/logo.png"
import Mobilelogo from "@/assets/images/easyLifeMobileLogo.png"
import Logout from "./ui/Logout"


export function AppSidebar() {
 const {open} = useSidebar()

  const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Paymetns",
    url: "#",
    icon: Settings,
  },
]
  return (
    <Sidebar 
    variant="floating"
    collapsible="icon"
    >
      <SidebarHeader>
        <>
        {
          open?
          <img
            className="max-w-[150px] transition-none"
          src={logo}
          />
          :
          <img
            className="max-w-[40px] transition-none"

          src={Mobilelogo}
          />
        }
        </>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />

          <SidebarGroupContent>
            <SidebarMenu
            >
              {items.map((item) => (
                <SidebarMenuItem
                key={item.title}>
                  <SidebarMenuButton 
                  className="w-[100%]  mx-auto"
                  asChild>
                    <a href={item.url}>
                      <item.icon  
                      
                      />
                      {/* <span>{item.title}</span> */}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Logout/>
      </SidebarFooter>
    </Sidebar>
  )
}