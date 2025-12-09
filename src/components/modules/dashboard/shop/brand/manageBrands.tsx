/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteBrand, deleteCategory, getCategories } from "@/src/services/shop";

import { DataTable } from "@/components/ui/core/imageUpload/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { BrandModal } from "./brandModal";
import { DeleteConfirmDialog } from "../category/deleteCategorymodal";

export type Brand = {
  _id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string;
  isActive: boolean;
  logo: string;
  name: string;
};

export const ManageBrand = ({ categoryData }: { categoryData: Brand[] }) => {
  console.log(categoryData);
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const columns: ColumnDef<Brand>[] = [
    {
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.logo || "/fallback-icon.png"}
            width={40}
            height={40}
            alt={row.original.name}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },

    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.isActive;

        return (
          <div
            className={`
            px-3 py-1.5 rounded-full  w-24 text-xs font-medium text-center
            ${
              isActive
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }
          `}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        );
      },
    },

    // Actions Column
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;

        const handleDelete = async () => {
          setIsDeleting(true);
          try {
            const res = await deleteBrand(category._id);

            if (res.success) {
              toast.success(`"${category.name}" deleted successfully`);
              setOpen(false); // Close dialog on success
              // Table will auto-refresh because deleteCategory uses revalidateTag("categories")
            } else {
              toast.error(res.error || "Failed to delete");
            }
          } catch (error: any) {
            toast.error(error.message || "Something went wrong");
          } finally {
            setIsDeleting(false);
          }
        };

        return (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete {category.name}</span>
            </Button>

            <DeleteConfirmDialog
              open={open}
              onOpenChange={setOpen}
              title={`Delete "${category.name}"?`}
              description="This category and all its data will be permanently removed."
              onConfirm={handleDelete}
              loading={isDeleting}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between p-6">
        <h2 className="text-xl font-semibold">Manage Brand</h2>
        <BrandModal />
      </div>
      <div className="px-6 py-4">
        <DataTable columns={columns} data={categoryData} />
      </div>
    </>
  );
};
export default ManageBrand;
