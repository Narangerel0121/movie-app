import { MoveRight, Star } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import { MovieType } from "@/app/page";
import axios from "axios";
import { ACCESS_TOKEN } from "@/constants";

export const TopRated = () => {
    const [topRatedMovieList, setTopRatedMovieList] = useState<MovieType[]>([]);
    const getTopRatedMovies = async () => {
        const topRatedMovie = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`
            }
          }
        );
        setTopRatedMovieList(topRatedMovie.data.results)
        // console.log(topRatedMovie)
    
      };
      useEffect(() => {
        getTopRatedMovies();
      }, []);
    return (
        <div>
            <div className="flex justify-between items-center py-8 px-5">
                <h1 className="fontInter text-2xl semibold">Top Rated</h1>
                <Button className="py-2 px-4 rounded-md">See more<MoveRight size={16} strokeWidth={1} /></Button>
            </div>
            <div className="grid grid-cols-2 px-5 gap-5 ">
                {
                    topRatedMovieList.slice(0, 10).map((topRatedMovie) => {
                        return <div key={topRatedMovie.id} className="border border-transparent bg-gray-100 rounded-lg">
                            <img src={`https://image.tmdb.org/t/p/original${topRatedMovie.poster_path}`} className="rounded-t-lg" />
                            <div className="p-2">
                                <div className="flex items-center gap-0.5 pb-1">
                                    <Star size={16} color="#FDE047" fill="#FDE047" />
                                    <p>{topRatedMovie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                </div>
                                <h1 className="text-sm text-normal">{topRatedMovie.title}</h1>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
} 