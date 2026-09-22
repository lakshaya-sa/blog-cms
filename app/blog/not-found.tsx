import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center px-5 py-16 text-center sm:px-8">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Blog post not found</h1>
        <p className="mt-4 text-slate-600">Sorry, the blog post you are looking for does not exist.</p>
        <Link href="/blog" className="mt-7 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Back to Blog</Link>
      </div>
    </main>
  );
}