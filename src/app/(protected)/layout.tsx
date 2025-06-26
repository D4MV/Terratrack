import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBarMenu";
import 'leaflet/dist/leaflet.css';


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}