"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import FormInput from "../Form/FormInput";
import FormFileInput from "../Form/FormFileInput";
import { Button } from "../ui/button";
import { uploadImageToCloudinary } from "@/helpers/fileUploader";
import { useUpdateUserProfile } from "@/hooks/profiles/useProfile";
import { User } from "@/types/auth.types";
import { Doctor } from "@/types/doctor.types";
import { Textarea } from "../ui/textarea";
import { useUpdateDoctorProfile } from "@/hooks/profiles/useDoctor";

const ProfileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Phone must be 10 to 15 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), "Only image files are allowed")
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, "Image must be 2MB or smaller"),
});

const DoctorFormSchema = z.object({
  specialization: z.string().min(2, "Specialization is required"),
  qualification: z.string().min(2, "Qualification is required"),
  experience: z.coerce.number().min(0, "Experience must be 0 or more"),
  consultationFee: z.coerce.number().min(0, "Consultation fee must be 0 or more"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
type DoctorFormValues = z.infer<typeof DoctorFormSchema>;

interface UpdateUserProfileProps {
  user: User;
  doctor?: Doctor;
}

const UpdateUserProfile = ({ user, doctor }: UpdateUserProfileProps) => {
  const [isProfilePending, setIsProfilePending] = useState(false);
  const [isDoctorPending, setIsDoctorPending] = useState(false);
  console.log({ user, doctor });
  const isDoctor = user?.role === "DOCTOR";

  const { data: session } = useSession();
  const token = session?.user?.token || session?.token;

  const updateUserProfile = useUpdateUserProfile(token);
  const updateDoctorProfile = useUpdateDoctorProfile(token);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      image: undefined,
    },
  });

  const doctorForm = useForm<DoctorFormValues>({
    resolver: zodResolver(DoctorFormSchema),
    defaultValues: {
      specialization: "",
      qualification: "",
      experience: 0,
      consultationFee: 0,
      bio: "",
    },
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user, profileForm]);

  useEffect(() => {
    if (isDoctor && doctor) {
      doctorForm.reset({
        specialization: doctor.specialization ?? "",
        qualification: doctor.qualification ?? "",
        experience: doctor.experience ?? 0,
        consultationFee: doctor.consultationFee ?? 0,
        bio: doctor.bio ?? "",
      });
    }
  }, [isDoctor, doctor, doctorForm]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      setIsProfilePending(true);
      let profileImage = user?.profileImage || "";
      if (data.image) {
        profileImage = await uploadImageToCloudinary(data.image);
      }

      await updateUserProfile.mutateAsync({
        userId: session?.user.id as number,
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profileImage,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsProfilePending(false);
    }
  };

  const onDoctorSubmit = async (data: DoctorFormValues) => {
    try {
      setIsDoctorPending(true);

      await updateDoctorProfile.mutateAsync({
        userId: session?.user.id as number,
        data: {
          specialization: data.specialization,
          qualification: data.qualification,
          experience: data.experience,
          consultationFee: data.consultationFee,
          bio: data.bio,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDoctorPending(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Personal Profile Form */}
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="container mx-auto">
          <div>
            <p className="text-xl font-bold">Personal Details:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                name="email"
                form={profileForm}
                label="Email"
                type="email"
                placeholder="Enter your Email"
                className="p-6"
              />

              <FormInput
                name="name"
                form={profileForm}
                label="Name"
                placeholder="Enter your Full Name"
                className="p-6"
              />

              <FormInput
                name="phone"
                form={profileForm}
                label="Number"
                placeholder="Enter your phone number"
                className="p-6"
              />

              <FormInput
                name="address"
                form={profileForm}
                label="Address"
                placeholder="Enter your village or street no."
                className="p-6"
              />

              <FormFileInput
                name="image"
                form={profileForm}
                label="Profile Image"
                accept="image/*"
                formDescription="Upload a JPG, PNG, or WebP image up to 2MB."
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button type="submit" disabled={isProfilePending}>
              {isProfilePending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Doctor Specific Form */}
      {isDoctor && (
        <Form {...doctorForm}>
          <form onSubmit={doctorForm.handleSubmit(onDoctorSubmit)} className="container mx-auto">
            <div>
              <p className="text-xl font-bold">Professional Details:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  name="specialization"
                  form={doctorForm}
                  label="Specialization"
                  placeholder="e.g. Cardiologist"
                  className="p-6"
                />

                <FormInput
                  name="qualification"
                  form={doctorForm}
                  label="Qualification"
                  placeholder="e.g. MBBS, MD"
                  className="p-6"
                />

                <FormInput
                  name="experience"
                  form={doctorForm}
                  label="Experience (Years)"
                  type="number"
                  placeholder="Enter years of experience"
                  className="p-6"
                />

                <FormInput
                  name="consultationFee"
                  form={doctorForm}
                  label="Consultation Fee"
                  type="number"
                  placeholder="Enter consultation fee"
                  className="p-6"
                />

                <FormField
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your Bio"
                          className="focus-visible:ring-0 rounded-md border-blue-400 bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-blue-400 hover:bg-accent min-h-[220px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button type="submit" disabled={isDoctorPending}>
                {isDoctorPending ? "Updating..." : "Update Professional Info"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateUserProfile;
