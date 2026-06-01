"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

import { signIn } from "next-auth/react";

const FormSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .min(5, { message: "Email must be at least 5 characters." }),
});

const LoginPage = () => {
  const [view, setView] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await signIn("credentials", {
        username: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: true,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="py-16 mx-6">
      <div className="mx-auto w-fit">
        <h1 className="text-4xl font-semibold text-center">Login</h1>
        <div className="w-36 h-1 bg-black mb-10"></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-[500px] mx-auto">
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
            <div className="absolute top-1/2 right-5 py-1 cursor-pointer" onClick={() => setView(!view)}>
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

export default LoginPage;
