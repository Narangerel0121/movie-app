import { MoveRight, Star } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState } from "react";
import { MovieType } from "@/app/page";
import { instance } from "@/app/utils/axios-instance";
import Link from "next/link";

export const Popular = () => {
    const [popularMovieList, setPopularMovieList] = useState<MovieType[]>([]);
    const getPopularMovies = async () => {

        const popularMovie = await instance.get("/movie/popular?language=en-US&page=1")
        setPopularMovieList(popularMovie.data.results)
    };
    useEffect(() => {
        getPopularMovies();
    }, []);
    return (
        <div>
            <div className="flex justify-between items-center py-8 px-5">
                <h1 className="fontInter text-2xl semibold text-[#09090b]">Popular</h1>
                <Button className="py-2 px-4 rounded-md">See more<MoveRight size={16} strokeWidth={1} /></Button>
            </div>
            <div className="grid grid-cols-2 px-5 gap-5 ">
                {
                    popularMovieList.slice(0, 10).map((popularMovie) => {
                        return <div key={popularMovie.id} className="border border-transparent bg-gray-100 rounded-lg"><Link href={`${popularMovie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${popularMovie.poster_path}`} className="rounded-t-lg" />
                            <div className="p-2">
                                <div className="flex items-center gap-0.5 pb-1">
                                    <Star size={16} color="#FDE047" fill="#FDE047" />
                                    <p>{popularMovie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                </div>
                                <h1 className="text-sm text-normal">{popularMovie.title}</h1>
                            </div>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
} 