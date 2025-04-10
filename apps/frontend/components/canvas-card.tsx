import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";

const CanvasCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Canvas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Created by <span className="font-bold">John Doe</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CanvasCard;
