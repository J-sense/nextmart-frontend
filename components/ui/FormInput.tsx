"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface FormInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>; 
  label: string;
}


export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  className,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              type={type}
              value={field.value || ""}
              className={cn(
                "px-4 py-7",
                "focus:ring-2 focus:ring-purple-300",
                "focus-visible:ring-2 focus-visible:ring-purple-300",
                className
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
