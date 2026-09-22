"use client";

import { useActionState } from "react";
import { updatePost } from "@/app/actions/post-actions";

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

export default function EditPostForm({ post }: EditPostFormProps) {
  const [state, formAction] = useActionState(
    updatePost,
    initialState
  );

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Edit Post</h1>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={post.id} />

        <div>
          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="w-full rounded border p-3"
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
            defaultValue={post.slug}
            className="w-full rounded border p-3"
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
            defaultValue={post.category}
            className="w-full rounded border p-3"
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
            defaultValue={post.content}
            className="w-full rounded border p-3"
          />

          {state.errors?.content && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.content[0]}
            </p>
          )}
        </div>

        {state.success && (
          <p className="text-green-600">
            Post updated successfully!
          </p>
        )}

        <button
          type="submit"
          className="rounded bg-black px-6 py-3 text-white"
        >
          Update Post
        </button>
      </form>
    </main>
  );
}