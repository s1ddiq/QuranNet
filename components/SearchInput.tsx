import { Input } from "./ui/input";
import Image from "next/image";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
}: SearchInputProps) => {
  return (
    <div className="rounded-full border border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2">
      <Image
        src="/svg/search.svg"
        alt="Search Icon"
        width={16}
        height={16}
        className="absolute left-4  cursor-pointer"
      />
      <Input
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Search the Quran"
        className="border-0 ml-4 focus-visible:ring-0 h-full pl-6"
      />
      <Image
        src="/svg/close.svg"
        alt="Close Icon"
        width={16}
        height={16}
        className={`right-4 cursor-pointer ${searchQuery.length > 0 ? "absolute" : "hidden"}`}
        onClick={() => setSearchQuery("")}
      />
    </div>
  );
};

export default SearchInput;
