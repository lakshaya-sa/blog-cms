import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl p-8 text-center">
      <h1 className="text-4xl font-bold">
        Blog Post Not Found
      </h1>

      <p className="mt-4 text-gray-600">
        Sorry, the blog post you are looking for does not exist.
      </p>

      <Link
        href="/blog"
        className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
      >
        Back to Blog
      </Link>
    </main>
  );
}