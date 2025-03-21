"use client"
import { MoveRight, Star } from "lucide-react"
import { useEffect, useState } from "react";
import { MovieType } from "@/app/page";
import { instance } from "@/app/utils/axios-instance";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/code/Header";
import { Footer } from "@/components/code/Footer";
 const FullUpcoming = () => {
    const [upcomingMovieList, setUpcomingMovieList] = useState<MovieType[]>([]);
    const getUpcomingMovies = async () => {
        const upcomingMovie = await instance.get("/movie/upcoming?language=en-US&page=1")
        setUpcomingMovieList(upcomingMovie.data.results)
    }
      useEffect(() => {
        getUpcomingMovies();
      }, []);

    return (
        <div className="w-[375px] mx-auto">
            <Header />
            <div className="flex justify-between items-center py-8 px-5">
                <h1 className="fontInter text-2xl semibold">Upcoming</h1>
            </div>
            <div className="grid grid-cols-2 px-5 gap-5 ">
                {
                    upcomingMovieList.slice(0, 10).map((upcomingMovie) => {
                        return <div key={upcomingMovie.id} className="border border-transparent bg-gray-100 rounded-lg"><Link href={`${upcomingMovie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${upcomingMovie.poster_path}`} className="rounded-t-lg" />
                            <div className="p-2">
                                <div className="flex items-center gap-0.5 pb-1">
                                    <Star size={16} color="#FDE047" fill="#FDE047" />
                                    <p>{upcomingMovie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                </div>
                                <h1 className="text-sm text-normal">{upcomingMovie.title}</h1>
                            </div>
                            </Link>
                        </div>
                    })
                }
            </div>
            <Footer />
        </div>
    )
} 

export default FullUpcoming