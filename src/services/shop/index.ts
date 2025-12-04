"use server";

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
