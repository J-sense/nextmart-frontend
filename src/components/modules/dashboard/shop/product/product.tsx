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
import { Badge, Hash, Package, Plus, Scale, Trash2, Eye, Edit } from "lucide-react";
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
    <div className="space-y-8 p-8 bg-gradient-to-br from-gray-950 via-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Products</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage your product inventory
          </p>
        </div>

        <Link href="/user/shop/add-product">
          <Button className="font-medium bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-100 border border-gray-800 hover:shadow-lg hover:shadow-gray-900/50 transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Products", value: productData.length, icon: Package, color: "from-gray-800 to-gray-900" },
          { title: "In Stock", value: productData.filter(p => p.stock > 0).length, icon: Package, color: "from-green-900/30 to-green-800/30" },
          { title: "Out of Stock", value: productData.filter(p => p.stock === 0).length, icon: Package, color: "from-red-900/30 to-red-800/30" },
          { title: "Active", value: productData.filter(p => p.isActive).length, icon: Package, color: "from-blue-900/30 to-blue-800/30" },
        ].map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-100 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
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
            <DataTable 
              columns={columns} 
              data={productData}
           
            />
          </div>

          {/* Empty State */}
          {productData.length === 0 && (
            <div className="py-16 text-center border-t border-gray-800">
              <div className="text-gray-600 mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Package className="w-10 h-10" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                No products found
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Start building your product catalog by adding your first item
              </p>
              <Link href="/user/shop/add-product">
                <Button className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-100 border border-gray-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Product
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {productData.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button 
            variant="outline" 
            className="border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-900"
          >
            <Package className="w-4 h-4 mr-2" />
            Export Products
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-900"
          >
            <Scale className="w-4 h-4 mr-2" />
            Bulk Update
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-900"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Bulk Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Product;