import { getAllCategorys } from "@/src/services/shop";
import React from "react";
import { CategorySection } from "./categoriesSectionProps";

const Categories = async () => {
  const categories = await getAllCategorys();
  console.log(categories.data);
  return (
    <div>
      <CategorySection categories={categories?.data} />;
    </div>
  );
};
export default Categories;
