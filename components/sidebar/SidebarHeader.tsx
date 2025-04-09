import Image from "next/image";
import { useRouter } from "next/navigation";

const SidebarHeader = ({ toggleSidebar, isCollapsed }: SidebarHeaderProps) => {
  const router = useRouter();
  return (
    <div
      className="flex w-full lg:min-h-[64px] md:min-h-8 px-4 justify-between items-center lg:mt-0 mt-4 lg:border-b border-[#262629ff] transition-all duration-300 hide-on-scroll"
    >
      <p className={`text-xl font-bold cursor-pointer ${isCollapsed && "hidden"}`} onClick={() => router.push('/')} title="QuranNet - Home">QuranNet</p>
      <Image
        src="/svg/menu.svg"
        width={32}
        height={32}
        alt="Logo"
        className="hover:-translate-y-2 cursor-pointer transition-all duration-300"
        title="QuranNet - Toggle"
        onClick={toggleSidebar}
      />
    </div>
  );
};

export default SidebarHeader;
