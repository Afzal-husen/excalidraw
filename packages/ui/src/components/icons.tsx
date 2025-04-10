import { Loader2, LucideProps, Plus } from "lucide-react";
import { cn } from "../lib/utils";

interface IconProps extends LucideProps {
  className?: string;
}

const Icons = {
  Spinner: ({ className, ...props }: IconProps) => (
    <Loader2 className={cn("h-4 w-4 animate-spin", className)} {...props} />
  ),
  Plus: ({ className, ...props }: IconProps) => (
    <Plus className={cn("h-4 w-4", className)} {...props} />
  ),
};

export { Icons };
