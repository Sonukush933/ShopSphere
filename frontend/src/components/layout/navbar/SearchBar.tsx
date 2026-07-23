import { Search } from "lucide-react";

type SearchBarProps = {
  mobile?: boolean;
};

function SearchBar({ mobile = false }: SearchBarProps) {
  return (
   <div
  className={`flex min-w-0 items-center overflow-hidden rounded-full border border-primary bg-white ${
        mobile
          ? "h-[44px] w-full pl-3"
          : "h-[46px] flex-1 pl-4"
      }`}
    >
      <Search
        size={mobile ? 18 : 20}
        className="text-primary"
      />

      <input
        type="text"
        placeholder="Search for products..."
        className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
      />

      <button
        className={`mr-1 rounded-full bg-primary font-medium text-white transition-all hover:bg-primary-hover ${
          mobile
            ? "h-[36px] px-5 text-sm"
            : "h-[38px] px-8 text-sm"
        }`}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;