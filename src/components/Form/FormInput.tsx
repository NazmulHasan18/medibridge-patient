import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import React from "react";
import clsx from "clsx";

type FormInputProps = {
   form: UseFormReturn<any>;
   name: string;
   placeholder: string;
   label: string;
   formDescription?: string;
   className?: string;
   type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
   form,
   name,
   placeholder,
   label,
   type,
   formDescription,
   className,
}) => {
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
                        "border-pink-400 rounded-full focus-visible:outline-pink-400 hover:bg-gray-200"
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
