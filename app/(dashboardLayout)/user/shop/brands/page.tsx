import ManageBrand from "@/src/components/modules/dashboard/shop/brand/manageBrands";
import { getBrands } from "@/src/services/shop";
import React from "react";

const Brands =async () => {
  const { data } = await getBrands();
  console.log(data)
  console.log(data);
  return (
    <div>
      <ManageBrand />
    </div>
  );
};
export default Brands;
