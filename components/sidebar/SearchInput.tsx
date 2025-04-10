import CrossIcon from "../svg/CrossIcon";
import SearchIcon from "../svg/SearchIcon";
import { Input } from "../ui/input";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
}: SearchInputProps) => {
  return (
    <div className="rounded-full border border-[#262629ff] w-full h-12 flex items-center justify-center relative p-2">
      
      <SearchIcon />
      <Input
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Search the Quran"
        className="border-0 ml-4 focus-visible:ring-0 h-full pl-6 !bg-transparent !shadow-none"
      />
      <CrossIcon onClick={() => setSearchQuery("")}/>
    </div>
  );
};

export default SearchInput;
