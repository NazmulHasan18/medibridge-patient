import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import React from "react";
import clsx from "clsx";

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>; // ← typed to valid keys of T, not just string
  placeholder: string;
  label: string;
  formDescription?: string;
  className?: string;
  type?: string;
};

const FormInput = <T extends FieldValues>({
  form,
  name,
  placeholder,
  label,
  type,
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
          <FormControl>
            <Input
              id={name}
              className={clsx(
                "focus-visible:ring-0",
                className ? className : "",
                "rounded-full border-blue-400 bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-blue-400 hover:bg-accent",
              )}
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
