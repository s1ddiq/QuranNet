import Link from "next/link";
import MenuIcon from "../svg/MenuIcon";
import ThemeToggleButton from "../ThemeToggleButton";
import { cn } from "@/lib/utils";

const SidebarHeader = ({ toggleSidebar, isCollapsed }: SidebarHeaderProps) => {
  return (
    <div className="flex w-full lg:min-h-[64px] md:min-h-8 px-4 justify-between items-center lg:mt-0 mt-4 lg:border-b dark:border-[#262629ff] border-gray-400 transition-all duration-300 hide-on-scroll">
      <Link
        href={`/`}
        className={`text-xl font-bold cursor-pointer ${
          isCollapsed && "hidden"
        }`}
        title="QuranNet - Home"
      >
        QuranNet
      </Link>
      <MenuIcon onClick={toggleSidebar} />
    </div>
  );
};

export default SidebarHeader;
