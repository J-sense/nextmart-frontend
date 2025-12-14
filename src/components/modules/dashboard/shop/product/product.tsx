"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/core/imageUpload/data-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IProduct } from "@/src/types/product";
import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Hash,
  Package,
  Plus,
  Scale,
  Trash2,
  Eye,
  Edit,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Product = ({ productData }: { productData: IProduct[] }) => {
  console.log(productData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  console.log(selectedIds)
  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds((prev) =>
                prev.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Product",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-4 py-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-800 shadow-lg">
              {product.imageUrls[0] ? (
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-900">
                  <Package className="h-8 w-8 text-gray-600" />
                </div>
              )}
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-100 line-clamp-2">
                {product.name}
              </p>
              <p className="text-xs text-gray-400">ID: {product._id}</p>
            </div>
          </div>
        );
      },
    },

    {
      header: "Category",
      cell: ({ row }) => (
        <Badge className="text-xs bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700">
          {row.original.category.name}
        </Badge>
      ),
    },

    {
      header: "Brand",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-gray-300">
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
            <Hash className="h-4 w-4 text-gray-500" />
            <span
              className={`font-semibold ${
                stock === 0
                  ? "text-red-400"
                  : stock <= 10
                  ? "text-orange-400"
                  : "text-green-400"
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
        <div className="flex items-center gap-2 text-gray-400">
          <Scale className="h-4 w-4" />
          <span className="font-medium">{row.original.weight} g</span>
        </div>
      ),
    },

    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <Badge
            className={`text-xs ${
              isActive
                ? "bg-green-900/30 text-green-400 border-green-800"
                : "bg-red-900/30 text-red-400 border-red-800"
            }`}
            variant="outline"
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/user/shop/edit-product/${product._id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg border border-gray-800"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit {product.name}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 border-gray-800 text-gray-200">
                  <p>Edit product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/products/${product.slug}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded-lg border border-gray-800"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View {product.name}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 border-gray-800 text-gray-200">
                  <p>View product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg border border-red-900/30"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {product.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 border-gray-800 text-gray-200">
                  <p>Delete product</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Products</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your product inventory
          </p>
        </div>

        <Link href="/user/shop/add-product">
          <Button className="">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Products",
            value: productData.length,
            icon: Package,
            color: "from-gray-800 to-gray-900",
          },
          {
            title: "In Stock",
            value: productData.filter((p) => p.stock > 0).length,
            icon: Package,
            color: "from-green-900/30 to-green-800/30",
          },
          {
            title: "Out of Stock",
            value: productData.filter((p) => p.stock === 0).length,
            icon: Package,
            color: "from-red-900/30 to-red-800/30",
          },
          {
            title: "Active",
            value: productData.filter((p) => p.isActive).length,
            icon: Package,
            color: "from-blue-900/30 to-blue-800/30",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-xl"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-100 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6 text-gray-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Area */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-100">
              Product Inventory
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-gray-800 text-gray-200 border-gray-700">
                {productData.length} Products
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={productData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
