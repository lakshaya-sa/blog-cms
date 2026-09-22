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
      className="rounded bg-red-600 px-4 py-2 text-white"
    >
      Delete
    </button>
  );
}