import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

import { BlogFormValues } from "@/components/blogs/blog-form";
import { toast } from "react-toastify";
import { BlogResponse, BlogsResponse } from "@/types/blog.types";
import axiosInstance from "@/lib/axios";

// ── Async Functions ───────────────────────────────────────

export const fetchMyBlogs = (
  { page, limit, search }: { page: number; limit: number; search?: string },
  token?: string,
) => {
  const query = new URLSearchParams();

  if (search) query.set("search", search);
  if (page) query.set("page", String(page));
  if (limit) query.set("limit", String(limit));

  return fetcher<BlogsResponse>(`/blogs/my${query.toString() ? `?${query.toString()}` : ""}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchAllBlogs = ({ page, limit, search }: { page: number; limit: number; search?: string }) => {
  const query = new URLSearchParams();

  if (search) query.set("search", search);
  if (page) query.set("page", String(page));
  if (limit) query.set("limit", String(limit));

  return fetcher<BlogsResponse>(`/blogs${query.toString() ? `?${query.toString()}` : ""}`);
};

export const fetchBlog = (publicId: string, token?: string) =>
  fetcher<BlogResponse>(`/blogs/${publicId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createBlog = async (
  payload: {
    title: string;
    content: string;
    thumbnail?: string;
  },
  token?: string,
) => {
  const { data } = await axiosInstance.post("/blogs", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateBlog = async (publicId: string, payload: Partial<BlogFormValues>, token?: string) => {
  const { data } = await axiosInstance.patch(`/blogs/${publicId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteBlog = async (publicId: string, token?: string) => {
  const { data } = await axiosInstance.delete(`/blogs/${publicId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteComment = async (blogPublicId: string, commentPublicId: string, token?: string) => {
  const { data } = await axiosInstance.delete(`/blogs/${blogPublicId}/comments/${commentPublicId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// ── Hooks ─────────────────────────────────────────────────

export const useGetAllBlogs = (params: { page: number; limit: number }) =>
  useQuery({
    queryKey: ["blog", params],
    queryFn: () => fetchAllBlogs(params),
  });
export const useGetMyBlogs = (params: { page: number; limit: number }, token?: string) =>
  useQuery({
    queryKey: ["my-blogs", params],
    queryFn: () => fetchMyBlogs(params, token),
  });

export const useGetBlog = (publicId: string | null, options?: { enabled?: boolean }, token?: string) =>
  useQuery({
    queryKey: ["blog", publicId],
    queryFn: () => fetchBlog(publicId as string, token),
    enabled: options?.enabled ?? !!publicId,
  });

export const useCreateBlog = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { title: string; content: string; thumbnail?: string }) =>
      createBlog(payload, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-blogs"] });
      toast.success("Blog published successfully");
    },
    onError: () => toast.error("Failed to publish blog"),
  });
};

export const useUpdateBlog = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ publicId, data }: { publicId: string; data: Partial<BlogFormValues> }) =>
      updateBlog(publicId, data, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-blogs"] });
      toast.success("Blog updated successfully");
    },
    onError: () => toast.error("Failed to update blog"),
  });
};

export const useDeleteBlog = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ publicId }: { publicId: string }) => deleteBlog(publicId, token),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-blogs"] });
      toast.success("Blog deleted");
    },
    onError: () => toast.error("Failed to delete blog"),
  });
};

export const useDeleteComment = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ blogPublicId, commentPublicId }: { blogPublicId: string; commentPublicId: string }) =>
      deleteComment(blogPublicId, commentPublicId, token),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["blog", vars.blogPublicId] });
      qc.invalidateQueries({ queryKey: ["my-blogs"] });
      toast.success("Comment removed");
    },
    onError: () => toast.error("Failed to delete comment"),
  });
};

export const useAddComment = (token?: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ blogPublicId, content }: { blogPublicId: string; content: string }) =>
      axiosInstance
        .post(
          `/blogs/${blogPublicId}/comments`,
          { content },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((r) => r.data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["blog", vars.blogPublicId] });
      toast.success("Comment posted");
    },
    onError: () => toast.error("Failed to post comment"),
  });
};
