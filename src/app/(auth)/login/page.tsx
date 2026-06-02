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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .min(5, { message: "Email must be at least 5 characters." }),
});

const LoginPage = () => {
  const [view, setView] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleDemoLogin = (role: "Patient" | "Doctor" | "Admin") => {
    const credentials = {
      Patient: { email: "nazmul@gmail.com", password: "12345678" },
      Doctor: { email: "doctor@gmail.com", password: "12345678" },
      Admin: { email: "superadmin@example.com", password: "SuperAdmin@123" },
    };
    const { email, password } = credentials[role];
    form.setValue("email", email);
    form.setValue("password", password);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(response);
      if (response?.error) {
        toast.error(response?.error || "Invalid email or password.");
      } else {
        router.push(`/`);
      }
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
      <div>
        <span className="flex items-center justify-center flex-wrap gap-4">
          Demo credentials:
          <Button size={"sm"} onClick={() => handleDemoLogin("Patient")}>
            Patient
          </Button>
          <Button size={"sm"} onClick={() => handleDemoLogin("Doctor")}>
            Doctor
          </Button>
          <Button size={"sm"} onClick={() => handleDemoLogin("Admin")}>
            Admin
          </Button>
        </span>
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
