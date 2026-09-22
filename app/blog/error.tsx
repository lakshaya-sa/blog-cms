"use client";

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl p-8 text-center">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600">
        We couldn't load the blog right now.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded bg-black px-6 py-3 text-white"
      >
        Try Again
      </button>
    </main>
  );
}
