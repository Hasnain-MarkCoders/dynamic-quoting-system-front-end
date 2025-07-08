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
import { CalendarArrowDown, DollarSign } from "lucide-react"
import logo from "@/assets/images/logo.png"
import Mobilelogo from "@/assets/images/easyLifeMobileLogo.png"
import Logout from "./ui/Logout"
import { Link } from "react-router-dom"


export function AppSidebar() {
 const {open} = useSidebar()

  const items = [
  {
    title: "Orders",
    url: "/",
    icon: CalendarArrowDown,
  },
  {
    title: "Paymetns",
    url: "/prices",
    icon: DollarSign,
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
                    <Link to={item.url}>
                      <item.icon  
                      
                      />
                      <span>
                        {
                          item.title
                        }
                      </span>
                    </Link>
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