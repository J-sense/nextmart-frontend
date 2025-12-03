"use client";

import { useUser } from "@/src/components/context/UserContext";

export default function Service() {
  const { user } = useUser();
  console.log(user);
  console.log(user);
  return <div>Service</div>;
}
