import {
  getAllCategoriesByStoreId,
  getAllColorsByStoreId,
  getAllSizesByStoreId,
  getProductByProductId,
} from "@/lib/utils";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const [product, categories, sizes, colors] = await Promise.all([
    getProductByProductId(params.productId),
    getAllCategoriesByStoreId(params.storeId),
    getAllSizesByStoreId(params.storeId),
    getAllColorsByStoreId(params.storeId),
  ]);
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
