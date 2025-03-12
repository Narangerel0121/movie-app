import { MoveRight, Star } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import { MovieType } from "@/app/page";
import axios from "axios";
import { ACCESS_TOKEN } from "@/constants";

export const Upcoming = () => {
    const [upcomingMovieList, setUpcomingMovieList] = useState<MovieType[]>([]);
    const getUpcomingMovies = async () => {
        const upcomingMovie = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`
            }
          }
        );
        setUpcomingMovieList(upcomingMovie.data.results)
        // console.log(upcomingMovie)
    
      };
      useEffect(() => {
        getUpcomingMovies();
      }, []);
    return (
        <div>
            <div className="flex justify-between items-center py-8 px-5">
                <h1 className="fontInter text-2xl semibold">Upcoming</h1>
                <Button className="py-2 px-4 rounded-md">See more<MoveRight size={16} strokeWidth={1} /></Button>
            </div>
            <div className="grid grid-cols-2 px-5 gap-5 ">
                {
                    upcomingMovieList.slice(0, 10).map((upcomingMovie) => {
                        return <div key={upcomingMovie.id} className="border border-transparent bg-gray-100 rounded-lg">
                            <img src={`https://image.tmdb.org/t/p/original${upcomingMovie.poster_path}`} className="rounded-t-lg" />
                            <div className="p-2">
                                <div className="flex items-center gap-0.5 pb-1">
                                    <Star size={16} color="#FDE047" fill="#FDE047" />
                                    <p>{upcomingMovie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                </div>
                                <h1 className="text-sm text-normal">{upcomingMovie.title}</h1>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
} 