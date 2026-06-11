import { BlogDetailClient } from "@/components/blogs/blog-detail-client";

interface BlogDetailPageProps {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { publicId } = await params;

  return <BlogDetailClient publicId={publicId} />;
}
