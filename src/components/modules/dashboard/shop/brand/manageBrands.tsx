/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteBrand } from "@/src/services/shop";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/core/imageUpload/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "../category/deleteCategorymodal";
import { BrandModal } from "./brandModal";

export type Brand = {
  _id: string;
  createdAt: string;
  updatedAt: string;
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
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />
          <span className="font-medium text-gray-200">{row.original.name}</span>
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
            px-3 py-1.5 rounded-full w-24 text-xs font-medium text-center border
            ${
              isActive
                ? "bg-green-900/30 text-green-400 border-green-800"
                : "bg-red-900/30 text-red-400 border-red-800"
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
              setOpen(false);
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
              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-gray-800"
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
    <div className="dark:from-gray-950 dark:via-gray-900 dark:to-black min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-100">Manage Brand</h2>
          <p className="text-sm text-gray-400 mt-1">
            {categoryData.length} brands found
          </p>
        </div>
        <BrandModal />
      </div>

      <div className="border  rounded-lg overflow-hidden">
        <DataTable columns={columns} data={categoryData} />
      </div>
    </div>
  );
};
export default ManageBrand;
