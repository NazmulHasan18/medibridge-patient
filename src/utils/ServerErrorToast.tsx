// components/shared/ServerErrorToast.tsx
"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export const ServerErrorToast = ({ message }: { message: string }) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null; // renders nothing, just fires the toast
};
