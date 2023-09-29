import NavBar from "@/components/NavBar";
import prismadb from "@/lib/prismadb";
import { getStoreByUserAndStoreIds, getUserId } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { storeId } = params;
  const userId = await getUserId();
  if (!userId) redirect("sign-in");
  const store = await getStoreByUserAndStoreIds(storeId, userId);
  if (!store) {
    redirect(`/`);
  } else
    return (
      <>
        <NavBar />
        {children}
      </>
    );
}
