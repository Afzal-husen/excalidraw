"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/shadcn/dialog";
import { Button } from "@repo/ui/components/shadcn/button";
import { Icons } from "@repo/ui/components/icons";
import { Input } from "@repo/ui/components/shadcn/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/shadcn/form";
import { Form } from "@repo/ui/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { createCanvas } from "@/lib/services/room";
import { toast } from "@repo/ui";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

const CreateCanvas = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        type: "error",
        message: "Please login to create a canvas",
      });
      return;
    }

    startTransition(async () => {
      const { error, message, room } = await createCanvas(values.name, token);
      if (error) {
        toast({
          type: "error",
          message,
        });
      } else {
        form.reset();
        router.push(`/canvas/${room.id}`);
        toast({
          type: "success",
          message,
        });
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit ml-auto">
          <Icons.Plus className="w-4 h-4" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Canvas</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Icons.Spinner className="w-4 h-4" />
                    Create
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCanvas;
