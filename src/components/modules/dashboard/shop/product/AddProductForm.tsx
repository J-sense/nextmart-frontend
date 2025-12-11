/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Plus, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { toast } from "sonner";

import Logo from "@/components/ui/logo";

import FormInput from "@/components/ui/FormInput";
import { createProduct, getBrands, getCategories } from "@/src/services/shop";
import { IBrand } from "@/src/types/brand";
import { ICategory } from "@/src/types/category";
import Image from "next/image";

export default function AddProductsForm() {
  

  // Image states
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Data states
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      weight: "",
      category: "",
      brand: "",
      availableColors: [{ value: "" }],
      keyFeatures: [{ value: "" }],
      specification: [{ key: "", value: "" }],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  // Field arrays
  const { fields: colorFields, append: appendColor } = useFieldArray({
    control,
    name: "availableColors",
  });
  const { fields: featureFields, append: appendFeature } = useFieldArray({
    control,
    name: "keyFeatures",
  });
  const { fields: specFields, append: appendSpec } = useFieldArray({
    control,
    name: "specification",
  });

  // Fetch categories & brands
  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, brandRes] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);
        setCategories(catRes?.data || []);
        setBrands(brandRes?.data || []);
      } catch (error) {
        toast.error("Failed to load categories or brands");
        console.log(error)
      }
    }
    loadData();
  }, []);

  // Handle multiple image upload
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (newFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    if (imageFiles.length + newFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    const previews = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...previews]);

   
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    const cleanedColors = data.availableColors
      .map((c: any) => c.value)
      .filter(Boolean);
    const cleanedFeatures = data.keyFeatures
      .map((f: any) => f.value)
      .filter(Boolean);

    const specification: Record<string, string> = {};
    data.specification.forEach((item: any) => {
      if (item.key?.trim()) {
        specification[item.key.trim()] = item.value || "";
      }
    });

    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      weight: Number(data.weight),
      availableColors: cleanedColors,
      keyFeatures: cleanedFeatures,
      specification,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    imageFiles.forEach((file) => formData.append("images", file));
    console.log(payload);
    
    try {
      const res = await createProduct(formData);
      console.log(res)
      if (res.success) {
        toast.success(res?.message || "Product added successfully!");
      } else {
        toast.error(res?.message );
      }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="max-w-full mx-auto p-6">
      <div className="border-2 border-gray-200 rounded-2xl bg-white shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r  p-6 text-white">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="text-2xl font-bold">Add New Product</h1>
          </div>
        </div>

        <div className="p-8">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Basic Info */}
              <section>
                <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    control={form.control}
                    name="name"
                    type="text"
                    label="Name"
                  />

                  <FormInput
                    control={form.control}
                    name="price"
                    type="number"
                    label="Price (USD)"
                    placeholder=""
                  />

                  <FormField
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand._id} value={brand._id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormInput
                    control={form.control}
                    name="stock"
                    type="number"
                    label="Stock Quantity"
                  />

                  <FormInput
                    control={form.control}
                    name="weight"
                    type="number"
                    label="Weight (kg)"
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a detailed description..."
                            className="min-h-32 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-primary mb-6 border-b pb-3">
                  Product Images (Max 10)
                </h2>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesChange}
                    id="images"
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <span className="text-lg font-medium text-primary">
                      Click to upload images
                    </span>
                    <p className="text-sm text-muted-foreground mt-2">
                      PNG, JPG, WebP up to 10MB each • Max 10 images
                    </p>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="mt-8">
                    <p className="text-lg font-semibold mb-4">
                      {imagePreviews.length} image
                      {imagePreviews.length > 1 ? "s" : ""} selected
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                      {imagePreviews.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-lg overflow-hidden border-2 border-gray-200"
                        >
                          <Image
                            width={60}
                            height={60}
                            src={src}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Available Colors */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-primary">
                    Available Colors
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendColor({ value: "" })}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Color
                  </Button>
                </div>
                <div className="space-y-4">
                  {colorFields.map((field, idx) => (
                    <FormField
                      key={field.id}
                      control={control}
                      name={`availableColors.${idx}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color {idx + 1}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Black, Space Gray"
                              {...field}
                              className="py-8"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </section>

              {/* Key Features */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-primary">
                    Key Features
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendFeature({ value: "" })}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-4">
                  {featureFields.map((field, idx) => (
                    <FormField
                      key={field.id}
                      control={control}
                      name={`keyFeatures.${idx}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Feature {idx + 1}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Waterproof, Wireless Charging"
                              {...field}
                              className="py-8"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </section>

              {/* Specifications */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-primary">
                    Specifications
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSpec({ key: "", value: "" })}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Spec
                  </Button>
                </div>
                <div className="space-y-6">
                  {specFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <FormField
                        control={control}
                        name={`specification.${idx}.key`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Battery Life"
                                {...field}
                                className="py-8"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`specification.${idx}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Value</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 20 hours"
                                {...field}
                                className="py-8"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Submit */}
              <div className="pt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg font-semibold py-8"
                  disabled={isSubmitting || imageFiles.length === 0}
                >
                  {isSubmitting ? <>Adding Product...</> : <>Add Product</>}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
