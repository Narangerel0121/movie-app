import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { instance } from "@/app/utils/axios-instance";
import { MovieType } from "@/app/page";
import { Button } from "../ui/button";
import { Play, Star } from "lucide-react";

export function CarouselDemo() {
    const [nowPlayingMovieList, setNowPlayingMovieList] = React.useState<MovieType[]>([]);

    const getNowPlayingMovies = async () => {
        const nowPlayingMovies = await instance.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');

        setNowPlayingMovieList(nowPlayingMovies.data.results)
        // console.log(nowPlayingMovies)
    };

    React.useEffect(() => {
        getNowPlayingMovies();
    }, []);

    return (
        <div>
            {/* <div>
        {
          nowPlayingMovieList.slice(0, 1).map((nowPlayingMovie) => {
            return <div className="w-[375px] mx-auto">
              <div key={nowPlayingMovie.id} className="">
                <img className="w-full" src={`https://image.tmdb.org/t/p/original${nowPlayingMovie.backdrop_path}`} />
                <div className="p-5">
                  <div className="flex justify-between">
                    <div>
                      <p className="fontInter text-sm font-normal">Now Playing:</p>
                      <h1 className="fontInter font-semibold text-2xl">{nowPlayingMovie.title}</h1>
                    </div>
                    <div className="flex gap-0.5 items-center">
                      <Star size={28} color="#FDE047" fill="#FDE047" />
                      <p>{nowPlayingMovie.vote_average.toFixed(1)}/10</p>
                    </div>
                  </div>
                  <p className="fontInter font-normal py-4">{nowPlayingMovie.overview}</p>
                  <Button key={nowPlayingMovie.id} className="bg-black text-white p-2 w-[145px] text-sm"><Play size={16} strokeWidth={1} />Watch Trailer</Button>
                </div>
              </div>
            </div>
          })
        }
      </div> */}
            <Carousel className="w-[375px] mx-auto">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="">
                                {
                                    nowPlayingMovieList.slice(0, 3).map((nowPlayingMovie) => {
                                        return <Card className="border-hidden"><CardContent className="flex aspect-square items-center justify-center p-6 p-0">
                                            <div key={nowPlayingMovie.id} className="">
                                                <img className="w-full" src={`https://image.tmdb.org/t/p/original${nowPlayingMovie.backdrop_path}`} />
                                                <div className="p-5">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <p className="fontInter text-sm font-normal">Now Playing:</p>
                                                            <h1 className="fontInter font-semibold text-2xl">{nowPlayingMovie.title}</h1>
                                                        </div>
                                                        <div className="flex gap-0.5 items-center">
                                                            <Star size={28} color="#FDE047" fill="#FDE047" />
                                                            <p>{nowPlayingMovie.vote_average.toFixed(1)}/10</p>
                                                        </div>
                                                    </div>
                                                    <p className="fontInter font-normal py-4">{nowPlayingMovie.overview}</p>
                                                    <Button key={nowPlayingMovie.id} className="bg-black text-white p-2 w-[145px] text-sm"><Play size={16} strokeWidth={1} />Watch Trailer</Button>
                                                </div>
                                            </div>
                                        </CardContent></Card>
                                    })
                                }
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

