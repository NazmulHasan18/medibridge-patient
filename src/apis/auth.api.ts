import axiosInstance from "@/lib/axios";
import { LoginUserPayload, RegisterUserPayload, RegisterUserResponse } from "@/types/auth.types";

export const registerUser = async (payload: RegisterUserPayload) => {
  try {
    const formData = new FormData();

    formData.append("address", payload.address);
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone);
    formData.append("password", payload.password);

    if (payload.image) {
      formData.append("photo", payload.image);
    }

    const { data } = await axiosInstance.post<RegisterUserResponse>("/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const loginUser = async (payload: LoginUserPayload) => {
  try {
    const { data } = await axiosInstance.post<RegisterUserResponse>("/auth/login", payload);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
