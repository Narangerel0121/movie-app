import { MovieType } from "@/app/page";
import { instance } from "@/app/utils/axios-instance"
import { Film, Moon, MoveRight, Search, Star } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react"
import { Button } from "../ui/button";

export const Header = () => {
  const [value, setValue] = useState<string>('')
  const [filteredMovieList, setFilteredMovieList] = useState<MovieType[]>([])

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


      <div className="mb-3">
        <input onChange={(event) => filterByMovieName(event)} placeholder="Search..." className="border rounded-full py-1 px-2 placeholder: font-semibold text-sm focus:outline-hidden" />
      </div>

          <div className="w-[335px] border border-gray-100 rounded-lg mx-auto">
            {
              filteredMovieList.slice(0, 5).map((filteredMovie) => {
                return <div key={filteredMovie.id} className=" rounded-lg m-3"><Link className="flex gap-2" href={`${filteredMovie.id}`}>
                 <img src={`https://image.tmdb.org/t/p/original${filteredMovie?.poster_path}`} className="rounded-lg w-[67px] h-[100px]" />
                  <div className="w-[212px]">
                  <div className="">
                  <h1 className="text-xl text-normal font-semibold">{filteredMovie.title}</h1>
                    <div className="flex items-center gap-0.5 pb-1">
                      <Star size={13} color="#FDE047" fill="#FDE047" />
                      <p text-xs><b>{filteredMovie.vote_average.toFixed(1)}</b><span className="text-gray-500">/10</span></p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p>{filteredMovie.release_date.slice(0, 4)}</p>
                    <Button className="py-2 px-4 rounded-md">See more<MoveRight size={14} strokeWidth={1} /></Button>
                  </div>
                  </div>
                </Link>
                <hr className="text-gray-300 mt-3"></hr>
                </div>
              })
            }
            <p className="mx-4 my-3 hidden">{`See all results for "${value}"`}</p>
          </div>

    </div>
  )
}