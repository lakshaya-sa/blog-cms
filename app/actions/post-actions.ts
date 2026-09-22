"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  category: z.string().min(2, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export async function createPost(
  previousState: {
    success: boolean;
    errors: Record<string, string[] | undefined>;
  },
  formData: FormData
) {
  const result = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.post.create({
    data: result.data,
  });

  revalidatePath("/blog");

  return {
    success: true,
    errors: {},
  };
}

export async function updatePost(
  previousState: {
    success: boolean;
    errors: Record<string, string[] | undefined>;
  },
  formData: FormData
) {
  const id = Number(formData.get("id"));

  const result = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.post.update({
    where: {
      id,
    },
    data: result.data,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${result.data.slug}`);

  return {
    success: true,
    errors: {},
  };
}

export async function deletePost(id: number) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/blog");
}