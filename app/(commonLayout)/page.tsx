import Hero from "@/src/components/modules/home/heroSection";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="w-full bg-zinc-50 font-sans dark:bg-black">
      <Hero />
    </div>
  );
}
