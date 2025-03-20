import { Film, Moon, Search } from "lucide-react"
import SearchButton from "./SearchButton"
import GenreSelector from "./GenreSelector"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export const Header = () => {
  const [isDown, setIsDown] = useState(false);
  function handleChange() {
    setIsDown(true) // function dotor js l bichne
  }
  return (
    <div>
      <div className="w-full flex justify-between items-center p-5">
        <a href={'http://localhost:3000/'} className={`${isDown == false ? "block" : "hidden"}`}>
          <div className="flex gap-2 items-center">
            <Film size={20} color="#4338CA" strokeWidth={1} />
            <p className="text-indigo-700 italic text-base font-bold">Movie Z</p>
          </div>
        </a>

        <div className="flex gap-3">
          <div className={`w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center 
            ${isDown == false ? "block" : "hidden"}`} onClick={handleChange}>
            <Search size={20} strokeWidth={1} />
          </div>

          <div className={`flex justify-center items-center
            ${isDown == true ? "block" : "hidden"}`} onClick={handleChange}>
            <SearchButton />
          </div>

          <div className={`w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center ${isDown == false ? "block" : "hidden"}`}>
            <Moon size={20} strokeWidth={1} />
          </div>
        </div>
      </div>
    </div>
  )
}