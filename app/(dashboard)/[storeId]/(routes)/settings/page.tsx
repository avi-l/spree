import { getStoreByUserId, getUserId } from "@/lib/utils";
import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";

interface ISettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: React.FC<ISettingsPageProps> = async ({ params }) => {
  const userId = await getUserId();
  if (!userId) redirect("/sign-in");
  const store = await getStoreByUserId(userId);
  if (!store) redirect("/");
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm />
      </div>
    </div>
  );
};

export default SettingsPage;
