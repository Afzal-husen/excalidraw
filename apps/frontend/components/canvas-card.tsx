import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import { Room } from "@repo/db";

const CanvasCard = ({ room }: { room: Room }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {/* <p className="text-sm text-muted-foreground">
              Created by <span className="font-bold">{room.createdBy.name}</span>
            </p> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CanvasCard;
