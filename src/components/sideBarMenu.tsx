import { CloudSunRain, Home, MapPinHouse, Tractor , Settings, LayoutDashboard } from "lucide-react"
import LogOutButton from "./logout"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Mi Terreno",
    url: "/miTerreno",
    icon: MapPinHouse,
  },
  {
    title: "Clima",
    url: "#",
    icon: CloudSunRain,
  },
  {
    title: "Aplicaciones",
    url: "#",
    icon: Tractor ,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-900 text-lg">Terratrack</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="text-gray-900 text-lg" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>

                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <LogOutButton></LogOutButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}