import { SidebarInset } from "./shadcn/sidebar";

import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "./shadcn/sidebar";

const MainSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default MainSidebar;
