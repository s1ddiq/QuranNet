import Link from "next/link";
import MenuIcon from "../svg/icons/MenuIcon";

const SidebarHeader = ({ toggleSidebar, isCollapsed }: SidebarHeaderProps) => {
  return (
    <div className="dark:text-white text-black flex w-full h-[57px] dark:h-14 px-4 justify-between items-center border-b dark:border-white/10 border-[var(--sephia-500)]  transition-all duration-300 hide-on-scroll">
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
