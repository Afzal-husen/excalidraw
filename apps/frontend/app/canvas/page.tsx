import CanvasCard from "@/components/canvas-card";
import PageHeader from "@/components/page-header";
import MainSidebar from "@repo/ui/components/main-sidebar";
import CreateCanvas from "@/components/create-canvas";
import { getRooms } from "@/lib/services/room";
import { Room } from "@repo/db";
export default async function CanvasPage() {
  const { error, message, rooms } = await getRooms();

  if (error || !rooms) {
    return <div>{message}</div>;
  }
  return (
    <MainSidebar>
      <PageHeader
        title="All Canvas"
        breadcrumb={[{ label: "Canvas", href: "/canvas" }]}
      />

      <CreateCanvas />

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room: Room) => (
          <CanvasCard key={room.id} room={room} />
        ))}
      </div>
    </MainSidebar>
  );
}
