import { getStoreByStoreId } from "@/lib/utils";
import React from "react";

interface IDashboardPageProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<IDashboardPageProps> = async ({ params }) => {
  const store = await getStoreByStoreId(params.storeId);
  return <div>Active Store: {store?.name}</div>;
};

export default DashboardPage;
