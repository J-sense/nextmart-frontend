// import Categories from "@/src/components/modules/home/categories";
import Hero from "@/src/components/modules/home/heroSection";

export default async function Home() {
  return (
    <div className="w-full bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      {/* <Categories /> */}
    </div>
  );
}
