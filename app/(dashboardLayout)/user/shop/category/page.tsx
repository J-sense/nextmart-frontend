import ManageCategory from "@/src/components/modules/dashboard/shop/category/manageCategory";
import { getCategories } from "@/src/services/shop";
import React, { Suspense } from "react";

const Category = async () => {
  const { data: categoryData } = await getCategories();

  return (
    <div className="px-5 mt-3">
      <Suspense fallback={<div>Loading...</div>}>
      <ManageCategory categoryData={categoryData} />
      </Suspense>
    </div>
  );
};
export default Category;
