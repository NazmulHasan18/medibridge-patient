import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FormSelectItem = {
  text: string;
  value: string | number | boolean;
};

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder: string;
  label: string;
  formDescription?: string;
  className?: string;
  items: FormSelectItem[];
};

const FormSelect = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  items,
  formDescription,
  className,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            value={field.value === undefined || field.value === null ? "" : String(field.value)}
            onValueChange={(value) => {
              const matchedItem = items.find((item) => String(item.value) === value);
              field.onChange(matchedItem?.value ?? value);
            }}
          >
            <FormControl
              className={cn(
                "focus-visible:ring-0",
                className ? className : "",
                "rounded-full border-blue-400 bg-background text-foreground focus-visible:outline-blue-400 hover:bg-accent",
              )}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item, i) => (
                <SelectItem key={`${String(item.value)}-${i}`} value={String(item.value)}>
                  {item.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
