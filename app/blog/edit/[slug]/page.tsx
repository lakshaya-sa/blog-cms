import { prisma } from "@/lib/prisma";
import EditPostForm from "./EditPostForm";
import { notFound } from "next/navigation";

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
    notFound();
  }

  return <EditPostForm post={post} />;
}