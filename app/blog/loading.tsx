export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 lg:py-14" aria-busy="true" aria-label="Loading blog posts">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 h-12 w-48 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-4 h-5 w-80 max-w-full animate-pulse rounded bg-slate-200" />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />)}
      </div>
    </main>
  );
}