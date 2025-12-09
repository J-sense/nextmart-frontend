"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/ui/FormInput";
import { createBrand, createCategory } from "@/src/services/shop";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { brandSchema } from "./brandModalValidation";
import ImageUpload from "@/components/ui/core/imageUpload/ImageUpload";

type CategoryFormData = z.infer<typeof brandSchema>;

export function BrandModal() {
  const [imageFile, setImageFile] = useState<File[] | []>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("logo", imageFile[0]);

      const res = await createBrand(formData);

      if (res.success) {
        toast.success("Brand created successfully", {
          description: `"${data.name}" has been added to categories`,
        });

        form.reset();
        setImageFile([]);
        setIsOpen(false);
      } else {
        toast.error("Failed to create category", {
          description: res.message || "Please try again",
        });
      }
    console.log(data)
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "Unable to create category. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isSubmitting) {
      setIsOpen(open);
    } else {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Brand
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create new Brand
          </DialogTitle>
          <DialogDescription>
            Add a new Brand to organize your products. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <div className="space-y-4">
              <FormInput
                control={form.control}
                type="text"
                label="Brand Name"
                name="name"
                placeholder="e.g., Electronics, Clothing, Home Decor"
              />
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
                    Category Icon
                  </label>
                  <ImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended: Square image, 200×200px, PNG or JPG
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => {
                    form.reset();
                    setImageFile([]);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Brand Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
