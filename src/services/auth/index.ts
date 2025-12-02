/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export const userRegister = async (data: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
