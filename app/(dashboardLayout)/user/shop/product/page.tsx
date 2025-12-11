import Product from "@/src/components/modules/dashboard/shop/product/product";
import { getProducts } from "@/src/services/shop";

const ProductPage = async () => {
  const {data} = await getProducts();
  console.log(data)
  return (
    <div>
      <Product productData={data}/>
    </div>
  );
};
export default ProductPage;
