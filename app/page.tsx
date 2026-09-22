import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center px-5 py-12 sm:px-8 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Content workspace</p>
          <h1 className="max-w-xl text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl sm:leading-[1.05]">
            Publish ideas with clarity.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            A focused home for your articles, from the first draft to the final edit.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/blog" className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800">
              Browse posts
            </Link>
            <Link href="/blog/create" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
              Create a post
            </Link>
          </div>
        </section>

        <aside className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
          <div className="absolute right-0 top-0 size-32 rounded-bl-full bg-slate-100" />
          <div className="relative">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-950">Editorial overview</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Ready</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your workspace</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Shape the next story</p>
                <div className="mt-5 h-2 rounded-full bg-slate-100"><div className="h-2 w-3/4 rounded-full bg-slate-900" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-950 p-4 text-white"><p className="text-xs text-slate-400">Workflow</p><p className="mt-2 font-semibold">Simple</p></div>
                <div className="rounded-2xl bg-slate-100 p-4 text-slate-900"><p className="text-xs text-slate-500">Focus</p><p className="mt-2 font-semibold">Writing</p></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      </main>
  );
}
