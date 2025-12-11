import AddProductsForm from "@/src/components/modules/dashboard/shop/product/AddProductForm";
import { getBrands } from "@/src/services/shop";

const Products = async () => {
  const { data } = await getBrands();
  console.log(data);
  return (
    <div>
      <AddProductsForm />
    </div>
  );
};
export default Products;
