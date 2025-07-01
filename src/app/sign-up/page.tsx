"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import FormSelect from "@/components/Form/FormSelect";

const FormSchema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      phone: z.string().regex(/^[0-9]{10,15}$/, "Phone must be 10 to 15 digits"),
      location: z.object({
         address: z.string().min(5, "Address must be at least 5 characters"),
         city: z.string().min(2, "City must be at least 2 characters"),
         country: z.string().min(2, "Country must be at least 2 characters"),
         pinCode: z.string().regex(/^\d{4,10}$/, "Pin code must be 4 to 10 digits"),
      }),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
   });

const page = () => {
   const { toast } = useToast();
   const [view, setView] = useState(false);

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         name: "",
         email: "",
         phone: "",
         location: {
            address: "",
            city: "",
            country: "",
            pinCode: "",
         },
         password: "",
         confirmPassword: "",
      },
   });

   function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log("Form Data Submitted:");
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
      <main className="py-16">
         <div className="mx-auto w-fit text-center">
            <h1 className="text-4xl font-semibold">Join Us</h1>
            <p className="text-2xl font-bold">Get 5% discount as Premium</p>
            <div className="mx-auto w-72 h-1 bg-black mb-10"></div>
         </div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto">
               <div>
                  <p className="text-xl font-bold">Personal Details:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 mb-4">
                     <FormInput
                        name="email"
                        form={form}
                        label="Email"
                        type="email"
                        placeholder="Enter your Email"
                        className="p-6"
                     ></FormInput>
                     <FormInput
                        name="name"
                        form={form}
                        label="Name"
                        placeholder="Enter your Full Name"
                        className="p-6"
                     ></FormInput>
                     <FormInput
                        name="phone"
                        form={form}
                        label="Number"
                        placeholder="Enter your phone number"
                        className="p-6"
                     ></FormInput>
                  </div>
                  <p className="text-xl font-bold">Address Details:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                     <FormInput
                        name="location.address"
                        form={form}
                        label="Address"
                        placeholder="Enter your village or street no."
                        className="p-6"
                     ></FormInput>
                     <FormInput
                        name="location.city"
                        form={form}
                        label="City"
                        placeholder="Enter your city."
                        className="p-6"
                     ></FormInput>
                     <FormInput
                        name="location.pinCode"
                        form={form}
                        label="Pin Code"
                        type="number"
                        placeholder="Enter your Pin Code."
                        className="p-6"
                     ></FormInput>
                     <FormSelect
                        name="location.country"
                        form={form}
                        items={[
                           { text: "India", value: "india" },
                           { text: "USA", value: "usa" },
                           { text: "Canada", value: "canada" },
                           { text: "Australia", value: "australia" },
                        ]}
                        label="Country"
                        placeholder="Select your country"
                        className="p-6"
                     ></FormSelect>
                  </div>
                  <p className="text-xl font-bold">Security Details:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                     <div className="relative">
                        <FormInput
                           name="password"
                           form={form}
                           label="Password"
                           placeholder="Enter your password"
                           type={view ? "text" : "password"}
                           className="p-6"
                        ></FormInput>
                        <div
                           className="absolute top-[45%] right-5 py-1 cursor-pointer"
                           onClick={() => setView(!view)}
                        >
                           {view ? <EyeOff /> : <Eye />}
                        </div>
                     </div>
                     <div className="relative">
                        <FormInput
                           name="confirmPassword"
                           form={form}
                           label="Confirm Password"
                           placeholder="Enter password again"
                           type={view ? "text" : "password"}
                           className="p-6"
                        ></FormInput>
                        <div
                           className="absolute top-[45%] right-5 py-1 cursor-pointer"
                           onClick={() => setView(!view)}
                        >
                           {view ? <EyeOff /> : <Eye />}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex justify-center mt-8">
                  <Button type="submit" className="w-fit">
                     Submit
                  </Button>
               </div>
            </form>
         </Form>
      </main>
   );
};

export default page;
