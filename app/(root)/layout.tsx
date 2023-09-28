import { getStoreByUserId, getUserId } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getUserId();
  if (!userId) redirect("sign-in");
  const store = await getStoreByUserId(userId);
  if (store) {
    redirect(`${store.id}`);
  }
  return <>{children}</>;
}
