import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FormInputProps = {
   form: UseFormReturn<any>;
   name: string;
   placeholder: string;
   label: string;
   formDescription?: string;
   className?: string;
   items: { text: string; value: string }[];
};

const FormSelect: React.FC<FormInputProps> = ({
   form,
   name,
   placeholder,
   label,
   items,
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
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl
                     className={cn(
                        "focus-visible:ring-0",
                        className ? className : "",
                        "border-pink-400 rounded-full focus-visible:outline-pink-400 hover:bg-gray-200"
                     )}
                  >
                     <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     {items.map((item, i) => (
                        <SelectItem key={i} value={item.value}>
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
