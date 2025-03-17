import { instance } from "@/app/utils/axios-instance"
import { Film, Moon, Search } from "lucide-react"
import { useEffect, useState } from "react"

type SearchType = {
  id: number;
  title: string;
}

export const Header = () => {
  const [value, setValue] = useState<string>('')
  const [filteredMovieList, setFilteredMovieList] = useState<SearchType>()

  const filterByMovieName = (event) => {
    console.log(event.target.value)
   setValue(event.target.value)
    }

  const getFilteredMovie = async () => {
    const filteredMovie = await instance.get(`search/movie?query=${value}&language=en-US&page=1`)
    console.log(filteredMovie, 'FilteredMovie')
    setFilteredMovieList(filteredMovie.data.results);
  };
  useEffect(() => {
    getFilteredMovie()
  }, [value])


  return (
    <div>
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


    <input onChange={(event) => filterByMovieName(event)} placeholder="Search..." className="border rounded-full py-1 px-2 placeholder: font-semibold text-sm" />
{/* 
    <div>{filteredMovieList?.title}</div> */}



    </div>
  )
}