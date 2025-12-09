import ManageCategory from "@/src/components/modules/dashboard/shop/category/manageCategory";
import { getCategories } from "@/src/services/shop";
import React from "react";

const Category = async() => {
  const { data: categoryData } = await getCategories();

  return (
    <div className="px-5 mt-3">
      <ManageCategory categoryData={categoryData}/>
    </div>
  );
};
export default Category;
