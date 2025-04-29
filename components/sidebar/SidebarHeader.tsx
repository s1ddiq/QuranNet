import Link from "next/link";
import MenuIcon from "../svg/MenuIcon";

const SidebarHeader = ({ toggleSidebar, isCollapsed }: SidebarHeaderProps) => {
  return (
    <div className="dark:text-white text-black flex w-full md:min-h-14 px-4 justify-between items-center lg:border-b dark:border-[#262629ff] border-[var(--sephia-500)] transition-all duration-300 hide-on-scroll">
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
