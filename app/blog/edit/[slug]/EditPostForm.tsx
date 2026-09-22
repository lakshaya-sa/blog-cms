"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { updatePost } from "@/app/actions/post-actions";
import Breadcrumbs from "@/app/components/Breadcrumbs";

type EditPostFormProps = {
  post: {
    id: number;
    title: string;
    slug: string;
    category: string;
    content: string;
  };
};

const initialState = {
  success: false,
  errors: {} as Record<string, string[] | undefined>,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? "Saving changes..." : "Save changes"}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-2 text-sm font-medium text-red-600">{message}</p> : null;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const [state, formAction] = useActionState(updatePost, initialState);
  const [values, setValues] = useState({ title: post.title, slug: post.slug, category: post.category, content: post.content });
  const error = (field: string) => state.errors?.[field]?.[0];
  const updateValue = (field: keyof typeof values, value: string) => setValues((current) => ({ ...current, [field]: value }));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:px-8 sm:py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "Edit", href: `/blog/${post.slug}` }, { label: post.title }]} />
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Content update</p>
        <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">Edit post</h1>
        <p className="mt-3 text-slate-600">Refine the details and keep this article current.</p>
      </div>

      <form action={formAction} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-8">
        <input type="hidden" name="id" value={post.id} />
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-800">Title</label>
            <input id="title" type="text" name="title" value={values.title} onChange={(event) => updateValue("title", event.target.value)} required minLength={3} aria-invalid={Boolean(error("title"))} aria-describedby={error("title") ? "title-error" : undefined} className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-400" />
            <FieldError id="title-error" message={error("title")} />
          </div>
          <div>
            <label htmlFor="slug" className="mb-2 block text-sm font-semibold text-slate-800">Slug</label>
            <input id="slug" type="text" name="slug" value={values.slug} onChange={(event) => updateValue("slug", event.target.value)} required minLength={3} pattern="[a-z0-9-]+" aria-invalid={Boolean(error("slug"))} aria-describedby="slug-help slug-error" className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-400" />
            <p id="slug-help" className="mt-2 text-xs text-slate-500">Use lowercase letters, numbers, and hyphens.</p>
            <FieldError id="slug-error" message={error("slug")} />
          </div>
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-semibold text-slate-800">Category</label>
            <input id="category" type="text" name="category" value={values.category} onChange={(event) => updateValue("category", event.target.value)} required minLength={2} aria-invalid={Boolean(error("category"))} aria-describedby={error("category") ? "category-error" : undefined} className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-400" />
            <FieldError id="category-error" message={error("category")} />
          </div>
          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-semibold text-slate-800">Content</label>
            <textarea id="content" name="content" value={values.content} onChange={(event) => updateValue("content", event.target.value)} required minLength={10} rows={10} aria-invalid={Boolean(error("content"))} aria-describedby={error("content") ? "content-error" : undefined} className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-400" />
            <FieldError id="content-error" message={error("content")} />
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href={`/blog/${post.slug}`} className="text-center text-sm font-semibold text-slate-500 transition hover:text-slate-950 sm:text-left">Cancel</Link>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {state.success && <p role="status" className="text-sm font-semibold text-emerald-600">Post updated successfully.</p>}
            <SubmitButton />
          </div>
        </div>
      </form>
    </main>
  );
}
