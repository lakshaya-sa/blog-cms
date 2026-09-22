import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: BlogDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return {
      title: "Blog Post Not Found | Blog CMS",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Blog CMS`,
    description: `${post.category} blog: ${post.content.slice(0, 140)}`,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
     notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold">{post.title}</h1>

      <p className="mt-2 text-sm text-gray-500">
        Category: {post.category}
      </p>

      <div className="mt-8">
        <p>{post.content}</p>
      </div>
    </main>
  );
}