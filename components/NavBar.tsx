import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "./StoreSwitcher";
import {
  DynamicDarkModeSwitch,
  getAllStoresByUserId,
  getUserId,
} from "@/lib/utils";
import { redirect } from "next/navigation";
const NavBar = async () => {
  const userId = await getUserId();
  if (!userId) redirect("/sign-in");
  const stores = (await getAllStoresByUserId(userId)) || [];
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className='ml-auto flex items-center space-x-4'>
          <DynamicDarkModeSwitch />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
