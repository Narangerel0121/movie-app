'use client'
import { MoveRight, Star } from "lucide-react"
import { useEffect, useState } from "react";
import { MovieType } from "@/app/page";
import { instance } from "@/app/utils/axios-instance";
import { Button } from "@/components/ui/button";
import Link from "next/link";

 export const NowPlaying = () => {
    const [nowPlayingMovieList, setNowPlayingMovieList] = useState<MovieType[]>([]);
    const getNowPlayingMovies = async () => {

        const nowPlayingMovie = await instance.get("/movie/now_playing?language=en-US&page=1")
        console.log(nowPlayingMovie)
        setNowPlayingMovieList(nowPlayingMovie.data.results)
    };
    useEffect(() => {
        getNowPlayingMovies();
    }, []);
    return (
        <div>
            <div className="flex justify-between items-center py-8 px-5">
                <h1 className="fontInter text-2xl semibold text-[#09090b]">Now Playing</h1>
                <Button className="py-2 px-4 rounded-md">See more<MoveRight size={16} strokeWidth={1} /></Button>
            </div>
            <div className="grid grid-cols-2 px-5 gap-5 ">
               {
                    nowPlayingMovieList.slice(0, 10).map((nowPlayingMovie) => {
                        return <div key={nowPlayingMovie.id} className="border border-transparent bg-gray-100 rounded-lg"><Link href={`${nowPlayingMovie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${nowPlayingMovie.poster_path}`} className="rounded-t-lg" />
                            <div className="p-2">
                                <div className="flex items-center gap-0.5 pb-1">
                                    <Star size={16} color="#FDE047" fill="#FDE047" />
                                    <p>{nowPlayingMovie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                </div>
                                <h1 className="text-sm text-normal">{nowPlayingMovie.title}</h1>
                            </div>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
} 

