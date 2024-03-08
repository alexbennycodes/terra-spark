import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Navbar = () => {
  return (
    <div className="fixed inset-x-0 top-0 w-full border-b border-[#FFFFFF]/[0.16] py-4 px-4 backdrop-blur-lg z-50">
      <div
        className="flex justify-between text-white max-w-7xl gap-4 mx-auto rounded-lg inset-x-0 flex-wrap
      "
      >
        <div className="flex gap-2 items-center">
          <a
            className="flex items-center space-x-2 flex-shrink-0 relative z-50"
            href="/"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            <span className="text-lg text-[#CCCCCC] font-medium">
              TerraSpark
            </span>
          </a>
        </div>
        <Input
          placeholder="Search countries..."
          className="md:w-[25vw]"
          endIcon={<Search size={18} className="text-muted-foreground" />}
        />
      </div>
    </div>
  );
};

export default Navbar;
