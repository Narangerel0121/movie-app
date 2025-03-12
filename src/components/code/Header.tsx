import { Film, Moon, Search } from "lucide-react"

export const Header = () => {
    return(
        <div className="w-full flex justify-between p-5">
        <div className="flex gap-2 items-center">
        <Film size={20} color="#4338CA" strokeWidth={1} />
        <p className="text-indigo-700 italic text-base font-bold">Movie Z</p>
        </div>
        <div className="flex gap-3">
          <div className="w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center">
            <Search size={20} strokeWidth={1} />
          </div>
          <div className="w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center">
            <Moon size={20} strokeWidth={1} />
          </div>
        </div>
      </div>
    )
}