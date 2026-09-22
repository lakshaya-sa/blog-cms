"use client";

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 items-center px-5 py-16 text-center sm:px-8">
      <div className="w-full rounded-2xl border border-red-100 bg-white p-8 shadow-sm sm:p-12">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">!</div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">Something went wrong</h1>
        <p className="mt-4 text-slate-600">We could not load the blog right now. Please try again.</p>
        <button onClick={() => reset()} className="mt-7 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Try again</button>
      </div>
    </main>
  );
}
