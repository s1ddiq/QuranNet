import Image from "next/image";
import { useRouter } from "next/navigation";
import MenuIcon from "../svg/MenuIcon";

const SidebarHeader = ({ toggleSidebar, isCollapsed }: SidebarHeaderProps) => {
  const router = useRouter();
  return (
    <div
      className="flex w-full lg:min-h-[64px] md:min-h-8 px-4 justify-between items-center lg:mt-0 mt-4 lg:border-b dark:border-[#262629ff] border-gray-400 transition-all duration-300 hide-on-scroll"
    >
      <p className={`text-xl font-bold cursor-pointer ${isCollapsed && "hidden"}`} onClick={() => router.push('/')} title="QuranNet - Home">QuranNet</p>
      <MenuIcon onClick={toggleSidebar}/>
    </div>
  );
};

export default SidebarHeader;
