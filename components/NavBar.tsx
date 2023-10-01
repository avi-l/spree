import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { getAllStoresByUserId, getUserId } from "@/lib/utils";
import { redirect } from "next/navigation";
import DarkModeSwitch from "@/components/DarkModeSwitch";
const NavBar = async () => {
  const userId = await getUserId();
  if (!userId) redirect("/sign-in");
  const stores = (await getAllStoresByUserId(userId)) || [];
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4 '>
        <StoreSwitcher items={stores} />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <DarkModeSwitch />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
