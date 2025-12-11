"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/core/imageUpload/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IProduct } from "@/src/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Hash, Package, Plus, Scale, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Product = ({ productData }: { productData: IProduct[] }) => {
  console.log(productData);
  const columns: ColumnDef<IProduct>[] = [
    {
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-4 py-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border shadow-sm">
              {product.imageUrls[0] ? (
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-900 line-clamp-2">
                {product.name}
              </p>
              <p className="text-xs text-gray-500">ID: {product._id}</p>
            </div>
          </div>
        );
      },
    },

    {
      header: "Category",
      cell: ({ row }) => (
        <Badge className="text-xs">{row.original.category.name}</Badge>
      ),
    },

    {
      header: "Brand",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-gray-700">
          {row.original.brand.name}
        </span>
      ),
    },

    {
      header: "Stock",
      accessorKey: "stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-400" />
            <span
              className={`font-semibold ${
                stock === 0
                  ? "text-red-600"
                  : stock <= 10
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {stock}
            </span>
          </div>
        );
      },
    },

    {
      header: "Weight",
      accessorKey: "weight",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-gray-600">
          <Scale className="h-4 w-4" />
          <span className="font-medium">{row.original.weight} g</span>
        </div>
      ),
    },

    // Simple Delete Icon Column
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete {product.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete product</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];
  return (
    <div className="space-y-8 p-8">
      {/* Header - Simple & Clean */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>

        <Link href="/user/shop/add-product">
          <Button className="font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {productData.length}
            </span>{" "}
            products
          </p>
        </div>

        <div className="overflow-x-auto">
          <DataTable columns={columns} data={productData} />
        </div>

        {/* Empty State */}
        {productData.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 font-medium">No products found</p>
            <p className="text-sm text-gray-500 mt-1">
              Start by adding your first product
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Product;
