import { prisma } from "@/lib/prisma";
import EditPostForm from "./EditPostForm";

type EditPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditPostPage({
  params,
}: EditPostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return <h1>Blog post not found</h1>;
  }

  return <EditPostForm post={post} />;
}