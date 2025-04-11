import CanvasCard from "@/components/canvas-card";
import PageHeader from "@/components/page-header";
import MainSidebar from "@repo/ui/components/main-sidebar";
import CreateCanvas from "@/components/create-canvas";

export default function CanvasPage() {
  return (
    <MainSidebar>
      <PageHeader
        title="All Canvas"
        breadcrumb={[{ label: "Canvas", href: "/canvas" }]}
      />

      <CreateCanvas />

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CanvasCard key={index} />
        ))}
      </div>
    </MainSidebar>
  );
}
