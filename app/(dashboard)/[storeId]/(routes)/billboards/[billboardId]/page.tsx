import { getBillboardByBillboardId } from "@/lib/utils";

const BillbardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await getBillboardByBillboardId(params.billboardId);
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'></div>
    </div>
  );
};

export default BillbardPage;
