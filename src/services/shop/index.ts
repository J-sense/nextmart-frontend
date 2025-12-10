"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const shopCreate = async (data: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/shop`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// CREATE CATEGORY
export const createCategory = async (data: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );

    // ✅ correct revalidation for categories list
    revalidatePath("categories");

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// GET CATEGORY (cache + tag)
export const getCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// DELETE CATEGORY
export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag(["categories"]);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const getBrands = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brand`, {
      next: { tags: ["brands"] },
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const createBrand = async (data: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brand`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag(["brands"]);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
export const deleteBrand = async (brandId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag(["brands"]);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
