"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { SidebarMenuButton } from "./ui/sidebar";

export default function LogoutButton() {
  const { signOut } = useAuthActions();

  return (
    <SidebarMenuButton
      className="cursor-pointer hover:text-destructive duration-150 transition-colors"
      type="button"
      onClick={signOut}
    >
      Logout
    </SidebarMenuButton>
  );
}
