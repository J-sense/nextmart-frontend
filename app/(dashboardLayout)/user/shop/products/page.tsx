import ManageBrand from "@/src/components/modules/dashboard/shop/brand/manageBrands";
import { getBrands } from "@/src/services/shop";


const Products = async () => {
  const { data } = await getBrands();
  console.log(data);
  return (
    <div>
  
    </div>
  );
};
export default Products;
