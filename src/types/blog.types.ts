import { PaginationMeta } from "./doctor.types";

export interface BlogComment {
  publicId: string;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    profilePhoto?: string;
  };
}

export interface Blog {
  id: number;
  publicId: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  doctorId: number;
  doctorName: string;
  createdAt: string;
  updatedAt: string;
  comments?: BlogComment[];
  _count?: {
    comments: number;
  };
}

export type BlogsResponse = {
  success: boolean;
  message: string;
  data: Blog[];
  meta?: PaginationMeta;
};
