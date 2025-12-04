/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const userRegister = async (data: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
export const userLogin = async (data: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken, {});
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const logOut = async () => {
  (await cookies()).delete("accessToken");
};
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
 
  let decodeUser = null;
  if (accessToken) {
    decodeUser = await jwtDecode(accessToken);
    return decodeUser;
  } else {
    return null;
  }
};
