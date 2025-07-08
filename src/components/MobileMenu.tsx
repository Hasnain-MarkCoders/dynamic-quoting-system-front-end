import { AlignJustify } from "lucide-react"
import { useSidebar } from "./ui/sidebar"

const MobileMenu = () => {
    const {toggleSidebar} = useSidebar()
  return (
    <div className="pl-4 pt-4 md:hidden">
        <AlignJustify  onClick={toggleSidebar}/>
      
    </div>
  )
}

export default MobileMenu
