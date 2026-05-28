"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import FormFileInput from "@/components/Form/FormFileInput";
import { useRegister } from "@/hooks/auth/useRegister";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const FormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^[0-9]{10,15}$/, "Phone must be 10 to 15 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    image: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.type.startsWith("image/"), "Only image files are allowed")
      .refine((file) => !file || file.size <= MAX_IMAGE_SIZE, "Image must be 2MB or smaller"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpPage = () => {
  const [view, setView] = useState(false);
  const { mutate, isPending } = useRegister();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(
      {
        address: data.address,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        image: data.image,
      },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Account created successfully!");
          form.reset();
          router.push("/login");
        },
        onError: (error) => {
          const message =
            isAxiosError<{ message?: string }>(error) && error.response?.data?.message
              ? error.response.data.message
              : "Failed to create account. Please try again.";

          toast.error(message);
        },
      },
    );
  }

  return (
    <main className="py-16">
      <div className="mx-auto w-fit text-center">
        <h1 className="text-4xl font-semibold">Join Us</h1>
        <p className="text-2xl font-bold">Get 5% discount as Premium</p>
        <div className="mx-auto w-72 h-1 bg-black mb-10"></div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container w-full px-5 md:w-2/3 lg:w-1/3 mx-auto"
        >
          <div>
            <p className="text-xl font-bold">Personal Details:</p>
            <div className="flex flex-col gap-4">
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

              <FormInput
                name="address"
                form={form}
                label="Address"
                placeholder="Enter your village or street no."
                className="p-6"
              ></FormInput>

              <FormFileInput
                name="image"
                form={form}
                label="Profile Image"
                accept="image/*"
                formDescription="Upload a JPG, PNG, or WebP image up to 2MB."
              ></FormFileInput>

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
            <Button type="submit" className="w-fit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

export default SignUpPage;
