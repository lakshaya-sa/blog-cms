import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePostButton from "./DeletePostButton";

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
};

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const { category, search } = await searchParams;

  const posts = await prisma.post.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                content: {
                  contains: search,
                },
              },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>

      <form className="mb-8" method="GET">
        <input
          type="text"
          name="search"
          placeholder="Search posts..."
          defaultValue={search ?? ""}
          className="w-full rounded border p-3"
        />

        <button
          type="submit"
          className="mt-3 rounded bg-black px-5 py-2 text-white"
        >
          Search
        </button>
      </form>

      <div className="mb-8 flex gap-4">
        <Link href="/blog">All</Link>
        <Link href="/blog?category=Next.js">Next.js</Link>
        <Link href="/blog?category=React">React</Link>
      </div>

      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border p-6"
            >
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Category: {post.category}
              </p>

              <p className="mt-4">{post.content}</p>
              <div className="mt-4 flex gap-3">
                <Link
                    href={`/blog/edit/${post.slug}`}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Edit
                </Link>

                <DeletePostButton id={post.id} />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}