import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";

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
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
      <article className="rounded-2xl border border-slate-200/90 bg-white px-5 py-7 shadow-sm shadow-slate-200/60 sm:px-10 sm:py-10">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{post.category}</span>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">{post.title}</h1>
        <time dateTime={post.createdAt.toISOString()} className="mt-5 block text-sm text-slate-500">Published {post.createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
        <div className="mt-9 border-t border-slate-100 pt-8">
          <p className="whitespace-pre-wrap text-base leading-8 text-slate-700 sm:text-lg">{post.content}</p>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-6">
          <Link href="/blog" className="text-sm font-semibold text-slate-600 transition hover:text-blue-700">← Back to Blog</Link>
        </div>
      </article>
    </main>
  );
}