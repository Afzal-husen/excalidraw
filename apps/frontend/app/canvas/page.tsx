import PageHeader from "@/components/page-header";
import { AppSidebar } from "@repo/ui/components/app-sidebar";


import {
  SidebarInset,
  SidebarProvider,
} from "@repo/ui/components/shadcn/sidebar";

export default function CanvasPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader
          title="All Canvas"
          breadcrumb={[{ label: "Canvas", href: "/canvas" }]}
        />

        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
