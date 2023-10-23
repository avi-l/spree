import {
  getAllBillboardsByStoreId,
  getBillboardByBillboardId,
  getCategoriesByCategoryId,
} from "@/lib/utils";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const [categories, billboards] = await Promise.all([
    getCategoriesByCategoryId(params.categoryId),
    getAllBillboardsByStoreId(params.storeId),
  ]);
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm billboards={billboards} initialData={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
