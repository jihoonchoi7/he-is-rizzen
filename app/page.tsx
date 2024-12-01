import { RelationshipChat } from "@/components/ui/RelationshipChat"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"
import { SidebarNavigation } from "@/components/ui/sidebar-content"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarNavigation />
        </Sidebar>
        <main className="flex-1 overflow-hidden">
          <div className="h-full">
            <RelationshipChat />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
