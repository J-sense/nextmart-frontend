import ManageBrand from "@/src/components/modules/dashboard/shop/brand/manageBrands";
import { getBrands } from "@/src/services/shop";
import React from "react";

const Brands =async () => {
  const { data } = await getBrands();
  console.log(data)

  return (
    <div>
      <ManageBrand categoryData={data}/>
    </div>
  );
};
export default Brands;
