/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/core/imageUpload/ImageUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/ui/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { shopCreate } from "@/src/services/shop";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateShop() {
  const [imageFile, setImageFile] = React.useState<File[] | []>([]);
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const serviceOfferedData = data?.servicesOffered
      ?.split(",")
      .map((service: any) => service.trim())
      .filter((service: any) => service !== "");

    const modifiedData = {
      ...data,
      servicesOffered: serviceOfferedData,

      establishedYear: Number(data?.establishedYear),
    };
    console.log(modifiedData);
    try {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(modifiedData));
      formdata.append("logo", imageFile[0]);
      console.log(formdata);
      const res = await shopCreate(formdata);
      if (res.success) {
        toast.success("Shop created successfully");
      } else {
        toast.error(res.message);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              label="Shop Name"
              name="shopName"
              type="text"
            />
            <FormInput
              control={form.control}
              label="License Number"
              name="businessLicenseNumber"
              type="text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              label="Address"
              name="address"
              type="text"
            />
            <FormInput
              control={form.control}
              label="Contact Number"
              name="contactNumber"
              type="text"
            />
          </div>

          <div className="grid grid-cols-1">
            <FormInput
              control={form.control}
              label="Website"
              name="website"
              type="text"
            />
          </div>

          <div>
            <FormInput
              control={form.control}
              label="Established Year"
              name="establishedYear"
              type="number"
            />
          </div>

          <div className="p-4 border rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-3">Social Media Links *</h3>
            <div className="space-y-3">
              <FormInput
                control={form.control}
                label="Facebook"
                name="socialMediaLinks.facebook"
                type="text"
              />
              <FormInput
                control={form.control}
                label="Instagram"
                name="socialMediaLinks.instagram"
                type="text"
              />
              <FormInput
                control={form.control}
                label="Twitter"
                name="socialMediaLinks.twitter"
                type="text"
              />
            </div>
          </div>
          <div>
            <FormInput
              control={form.control}
              label="Tax Identification Number"
              name="taxIdentificationNumber"
              type="text"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Service Offered
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-40 resize-none focus:border-primary focus:ring-primary"
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 border rounded-2xl p-4 shadow-sm bg-gray-50">
              <ImageUpload imageFile={imageFile} setImageFile={setImageFile} />
            </div>
          </div>
          <Button className=" py-3 text-md font-semibold" type="submit">
            Create Shop
          </Button>
        </form>
      </Form>
    </div>
  );
}
