"use client"

import * as React from "react"
import { Menu, X, Plus, Library } from "lucide-react"
import { Button } from "./button"
import { 
  SidebarContent, 
  SidebarGroup, 
  SidebarHeader,
  useSidebar
} from "./sidebar"

export function SidebarNavigation() {
  const { toggleSidebar, state } = useSidebar()

  return (
    <SidebarContent>
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {state === "expanded" ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {state === "expanded" && (
        <>
          <SidebarHeader className="px-4 mt-16">
            <h2 className="text-lg font-semibold mb-4">Relationship Chat</h2>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </SidebarHeader>
          
          <SidebarGroup className="px-4 mt-4">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Library className="h-4 w-4" />
              Library
            </Button>
          </SidebarGroup>
        </>
      )}
    </SidebarContent>
  )
} 