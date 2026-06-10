"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { CreateBlogDialog } from "@/components/blogs/create-blog-dialog";
import { EditBlogDialog } from "@/components/blogs/edit-blog-dialog";
import { DeleteBlogDialog } from "@/components/blogs/delete-blog-dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";
import { Blog } from "@/types/blog.types";
import { useGetMyBlogs } from "@/hooks/blog/useBlog";
import { blogColumns } from "@/components/blogs/blog-column";
import { ManageCommentsSheet } from "@/components/blogs/manage-comment-sheet";
import { useSession } from "next-auth/react";

export default function DoctorBlogsPage() {
  const [page, setPage] = useState(1);

  // Dialog state
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [commentsBlogId, setCommentsBlogId] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = session?.token || session?.user.token;
  const { data, status, isLoading } = useGetMyBlogs({ page, limit: 10 }, token);

  const blogs = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Blogs</h1>
          <p className="text-sm text-muted-foreground">Publish and manage your health articles</p>
        </div>
        <CreateBlogDialog />
      </div>

      {/* Table */}
      <DataTable
        columns={blogColumns}
        data={blogs}
        isLoading={status === "pending" || isLoading}
        emptyMessage="You haven't published any blogs yet."
        actions={(blog: Blog) => (
          <>
            <Button
              variant="outline"
              size="icon"
              aria-label="Manage Comments"
              onClick={() => setCommentsBlogId(blog.publicId)}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Edit Blog" onClick={() => setEditBlog(blog)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Delete Blog"
              className="hover:border-destructive hover:text-destructive"
              onClick={() => setDeleteBlogId(blog.publicId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
        pagination={
          meta
            ? {
                page: meta.page,
                pageSize: meta.limit,
                totalItems: meta.total,
                totalPages: meta.totalPages,
                onPageChange: setPage,
              }
            : undefined
        }
      />

      {/* Edit Dialog */}
      {editBlog && (
        <EditBlogDialog
          blog={editBlog}
          open={!!editBlog}
          onOpenChange={(open) => !open && setEditBlog(null)}
        />
      )}

      {/* Delete Dialog */}
      <DeleteBlogDialog
        publicId={deleteBlogId ?? ""}
        open={!!deleteBlogId}
        onOpenChange={(open) => !open && setDeleteBlogId(null)}
      />

      {/* Comments Sheet */}
      <ManageCommentsSheet
        blogPublicId={commentsBlogId}
        open={!!commentsBlogId}
        onOpenChange={(open) => !open && setCommentsBlogId(null)}
      />
    </div>
  );
}
