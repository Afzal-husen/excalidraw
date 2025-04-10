import CanvasCard from "@/components/canvas-card";
import PageHeader from "@/components/page-header";
import { Button } from "@repo/ui/components/shadcn/button";
import { Icons } from "@repo/ui/components/icons";
import MainSidebar from "@repo/ui/components/main-sidebar";

export default function CanvasPage() {
  return (
    <MainSidebar>
      <PageHeader
        title="All Canvas"
        breadcrumb={[{ label: "Canvas", href: "/canvas" }]}
      />

      <Button className="w-fit ml-auto">
        <Icons.Plus className="w-4 h-4" />
        Create
      </Button>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CanvasCard key={index} />
        ))}
      </div>
    </MainSidebar>
  );
}
