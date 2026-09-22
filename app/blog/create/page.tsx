"use client";

import { useActionState } from "react";
import { createPost } from "@/app/actions/post-actions";

const initialState = {
  success: false,
  errors: {} as Record<string, string[] | undefined>,
};

export default function CreatePostPage() {
  const [state, formAction] = useActionState(
    createPost,
    initialState
  );

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Create Post</h1>

      <form action={formAction} className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            className="w-full rounded border p-3"
            placeholder="Enter post title"
          />

          {state.errors?.title && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            className="w-full rounded border p-3"
            placeholder="enter-post-slug"
          />

          {state.errors?.slug && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.slug[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <input
            type="text"
            name="category"
            className="w-full rounded border p-3"
            placeholder="Next.js"
          />

          {state.errors?.category && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.category[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Content
          </label>

          <textarea
            name="content"
            rows={8}
            className="w-full rounded border p-3"
            placeholder="Write your blog content..."
          />

          {state.errors?.content && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        {state.success && (
          <p className="text-green-600">
            Post created successfully!
          </p>
        )}

        <button
          type="submit"
          className="rounded bg-black px-6 py-3 text-white"
        >
          Create Post
        </button>
      </form>
    </main>
  );
}