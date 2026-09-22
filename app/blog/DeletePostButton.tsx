"use client";

import { deletePost } from "@/app/actions/post-actions";

type DeletePostButtonProps = {
  id: number;
};

export default function DeletePostButton({
  id,
}: DeletePostButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    await deletePost(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-red-600"
    >
      Delete post
    </button>
  );
}