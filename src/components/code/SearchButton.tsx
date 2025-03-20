import { MovieType } from "@/app/page"
import { instance } from "@/app/utils/axios-instance"
import { ChevronDown, MoveRight, Search, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import GenreSelector from "./GenreSelector"

const SearchButton = () => {
    const [value, setValue] = useState<string>('')
    const [filteredMovieList, setFilteredMovieList] = useState<MovieType[]>([]);
    const [isChevronDown, setIsChevronDown] = useState(false);

    const filterByMovieName = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }

    const getFilteredMovie = async () => {
        const filteredMovie = await instance.get(`search/movie?query=${value}&language=en-US&page=1`)
        // console.log(filteredMovie, 'FilteredMovie')
        setFilteredMovieList(filteredMovie.data.results);
    };
    useEffect(() => {
        getFilteredMovie()
    }, [value])

    function handleChange() {
        setIsChevronDown(true) // functio dotor js l bichne
    }

    return (
        <div>
            <div className="flex items-center gap-3 justify-center">
                <div className="w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center">
                    <ChevronDown strokeWidth={1} size={16} onClick={handleChange} />
                </div>
                <div className="flex items-center justify-center">
                    <Search size={16} color="#71717A" strokeWidth={1} />
                    <input onChange={(event) => filterByMovieName(event)} placeholder="Search..." className="py-1 px-2 placeholder: text-sm font-normal text-[#71717A] focus:outline-hidden" type="search" />
                </div>
            </div>
            <div className={`${isChevronDown == false ? "hidden" : "block"}`}>
                <GenreSelector />
            </div>

            <div className={`w-[335px] border border-gray-100 rounded-lg mx-auto ${value && value ? "block" : "hidden"}`}>
                {
                    filteredMovieList.slice(0, 5).map((filteredMovie) => {
                        return <div key={filteredMovie.id} className=" rounded-lg m-3"><Link className="flex gap-2" href={`/moviedetails/${filteredMovie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${filteredMovie?.poster_path}`} className="rounded-lg w-[67px] h-[100px]" />
                            <div className="w-[212px]">
                                <div className="">
                                    <h1 className="text-xl text-normal font-semibold">{filteredMovie.title}</h1>
                                    <div className="flex items-center gap-0.5 pb-1">
                                        <Star size={13} color="#FDE047" fill="#FDE047" />
                                        <p className="text-xs"><b>{filteredMovie.vote_average.toFixed(1)}</b><span className="text-gray-500">/10</span></p>
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
                <a href="/seeallresults">
                    <p className={`mx-4 my-3  ${value && value ? "block" : "hidden"}`}>{`See all results for "${value}"`}</p>
                </a>
            </div>
        </div>
    )
}
export default SearchButton