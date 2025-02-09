"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import FormInput from "@/components/Form/FormInput";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import FormSelect from "../Form/FormSelect";

const FormSchema = z.object({
   name: z.string().min(2, { message: "Name must be at least 2 characters." }),
   email: z
      .string()
      .email({ message: "Invalid email format." })
      .min(5, { message: "Email must be at least 5 characters." }),

   phone: z.string().regex(/^[+,0-9]\d{13}$/, { message: "Invalid phone number format." }),
   appointmentDate: z
      .date({ message: "appointmentDate must be a date" })
      .min(new Date(), { message: "Too old appointmentDate" }),
   category: z.string().min(1, { message: "Category is required." }),

   doctor: z.string().min(1, { message: "Doctor is required." }),

   description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters." })
      .max(500, { message: "Description cannot exceed 500 characters." }),
});

const AppointmentForm = () => {
   const { toast } = useToast();

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: "",
         email: "",
         phone: "",
         appointmentDate: undefined,
         category: "",
         doctor: "",
         description: "",
      },
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data);
      toast({
         title: "You submitted the following values:",
         description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
               <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
         ),
      });
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid grid-cols-2 gap-4">
            <FormInput
               name="name"
               form={form}
               label="Full Name"
               placeholder="Enter your full name"
               className="p-6"
            ></FormInput>
            <FormInput
               name="email"
               form={form}
               label="Email"
               placeholder="Enter your Email"
               className="p-6"
            ></FormInput>
            <FormInput
               name="phone"
               form={form}
               label="Phone Number"
               placeholder="Enter your Phone Number"
               className="p-6"
            ></FormInput>

            <FormField
               control={form.control}
               name="appointmentDate"
               render={({ field }) => (
                  <FormItem className="flex flex-col">
                     <FormLabel>Appointment Date</FormLabel>
                     <Popover>
                        <PopoverTrigger asChild>
                           <FormControl>
                              <Button
                                 variant={"outline"}
                                 className={cn(
                                    "w-full rounded-full border-pink-400 bg-transparent pl-3 p-6 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                 )}
                              >
                                 {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                           </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) => date < new Date()}
                              initialFocus
                           />
                        </PopoverContent>
                     </Popover>

                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormSelect
               form={form}
               items={[{ text: "abc", value: "abc" }]}
               label="Select Category"
               name="category"
               placeholder="Select Your category"
               className="p-6"
            ></FormSelect>
            <FormSelect
               form={form}
               items={[{ text: "abc", value: "abc" }]}
               label="Select Doctor"
               name="doctor"
               placeholder="Select Your doctor"
               className="p-6"
            ></FormSelect>
            <Button type="submit" className="col-span-2 w-fit">
               Submit
            </Button>
         </form>
      </Form>
   );
};

export default AppointmentForm;
