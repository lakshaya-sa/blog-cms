import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Breadcrumbs from "../components/Breadcrumbs";
import DeletePostButton from "./DeletePostButton";

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category, search } = await searchParams;

  const posts = await prisma.post.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search } },
              { content: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = [
    ["All", "/blog"],
    ["Next.js", "/blog?category=Next.js"],
    ["React", "/blog?category=React"],
  ];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Content library</p>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">Posts</h1>
          <p className="mt-3 max-w-xl text-slate-600">Find, refine, and manage your published ideas from one focused workspace.</p>
        </div>
        <Link href="/blog/create" className="inline-flex w-fit items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-blue-700">New post</Link>
      </div>

      <div className="mb-10 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm shadow-slate-200/60 sm:p-5">
        <form className="flex flex-col gap-3 sm:flex-row" method="GET">
          <label htmlFor="post-search" className="sr-only">Search posts</label>
          <div className="relative flex-1">
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
            <input id="post-search" type="text" name="search" placeholder="Search by title or content..." defaultValue={search ?? ""} className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100" />
          </div>
          <button type="submit" className="min-h-12 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-blue-700">Search posts</button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Category</span>
          {categories.map(([label, href]) => {
            const isActive = category === label || (!category && label === "All");

            return (
              <Link key={href} href={href} aria-current={isActive ? "page" : undefined} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>
                {label}
              </Link>
            );
          })}
          {(category || search) && <Link href="/blog" className="ml-auto text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-950 hover:underline">Clear filters</Link>}
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">⌕</div>
          <p className="mt-5 text-lg font-semibold text-slate-900">No posts found</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Try another search or create your first post to start building the library.</p>
          <Link href="/blog/create" className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Create a post</Link>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-200/50 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/70">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{post.category}</span>
                <time dateTime={post.createdAt.toISOString()} className="text-xs font-medium text-slate-400">{post.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-[1.65rem]">
                <Link className="transition-colors group-hover:text-blue-700" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">{post.content}</p>
              <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
                <Link href={`/blog/${post.slug}`} className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">Read post</Link>
                <Link href={`/blog/edit/${post.slug}`} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">Edit</Link>
                <DeletePostButton id={post.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
