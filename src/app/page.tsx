"use client"

import { ACCESS_TOKEN } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "@/components/code/Footer"
import { Header } from "@/components/code/Header";
import { Popular } from "@/components/code/Popular";
import { Upcoming } from "@/components/code/Upcoming";
import { TopRated } from "@/components/code/TopRated";
import { Button } from "@/components/ui/button";
import { Star, Play } from "lucide-react";
import { CarouselDemo } from "@/components/code/Carousel";


export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Home() {
  // const [nowPlayingMovieList, setNowPlayingMovieList] = useState<MovieType[]>([]);

  // const getNowPlayingMovies = async () => {
  //   const nowPlayingMovies = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${ACCESS_TOKEN}`
  //       }
  //     }
  //   );

  //   setNowPlayingMovieList(nowPlayingMovies.data.results)
  //   // console.log(nowPlayingMovies)
  // };

  // useEffect(() => {
  //   getNowPlayingMovies();
  // }, []);

  return (
    <div className="w-[375px] mx-auto">
      <Header />

      <CarouselDemo />

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
      <Upcoming />
      <TopRated />
      <Popular />
      <Footer></Footer>
    </div>
  );
}

