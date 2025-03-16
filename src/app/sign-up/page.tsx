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

const FormSchema = z.object({
   password: z.string().min(8, { message: "Password must be at least 8 characters." }),
   email: z
      .string()
      .email({ message: "Invalid email format." })
      .min(5, { message: "Email must be at least 5 characters." }),
});

const page = () => {
   const { toast } = useToast();
   const [view, setView] = useState(false);

   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         password: "",
         email: "",
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
      <main className="py-16">
         <div className="mx-auto w-fit text-center">
            <h1 className="text-4xl font-semibold">Join Us</h1>
            <p className="text-2xl font-bold">Get 5% discount as Premium</p>
            <div className="mx-auto w-72 h-1 bg-black mb-10"></div>
         </div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] mx-auto">
               <FormInput
                  name="email"
                  form={form}
                  label="Email"
                  placeholder="Enter your Email"
                  className="p-6"
               ></FormInput>
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
                     className="absolute top-1/2 right-5 py-1 cursor-pointer"
                     onClick={() => setView(!view)}
                  >
                     {view ? <EyeOff /> : <Eye />}
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
