"use client"

import { ACCESS_TOKEN } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Moon, MoveRight, Play, Search, Star } from 'lucide-react'

type MovieType = {
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
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState<MovieType[]>([]);
  const [popularMovieList, setPopularMovieList] = useState<MovieType[]>([]);


  const getNowPlayingMovies = async () => {
    const nowPlayingMovies = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    setNowPlayingMovieList(nowPlayingMovies.data.results)
    console.log(nowPlayingMovies)
  };
  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  const getPopularMovies = async () => {
    const popularMovie = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );
    setPopularMovieList(popularMovie.data.results)
    // console.log(popularMovie)

  };
  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div>
      {
        nowPlayingMovieList.slice(0, 1).map((nowPlayingMovie) => {
          return <div className="w-[375px] mx-auto">
            <div className="w-full flex justify-between p-5">
              <img src="/assets/logo.svg" />
              <div className="flex gap-3">
                <div className="w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center">
                  <Search size={20} strokeWidth={1} />
                </div>
                <div className="w-9 h-9 border border-gray-200 rounded-lg flex justify-center items-center">
                  <Moon size={20} strokeWidth={1} />
                </div>
              </div>
            </div>
            <div key={nowPlayingMovie.id} className="">
              <img className="w-full" src={`https://image.tmdb.org/t/p/original${nowPlayingMovie.poster_path}`} />
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="fontInter text-sm font-normal">Now Playing:</p>
                    <h1 className="fontInter font-semibold text-2xl">{nowPlayingMovie.title}</h1>
                  </div>
                  <div className="flex gap-0.5 items-center">
                    <Star size={28} color="#fad105" fill="#fad105" />
                    <p>{nowPlayingMovie.vote_average.toFixed(1)}/10</p>
                  </div>
                </div>
                <p className="fontInter font-normal py-4">{nowPlayingMovie.overview}</p>
                <Button className="bg-black text-white p-2 w-[145px] text-sm"> <Play />Watch Trailer</Button>
              </div>
            </div>
            <div className="flex justify-between items-center py-8 px-5">
              <h1 className="fontInter text-2xl semibold">Popular</h1>
              <Button className="py-2 px-4 rounded-md">See more<MoveRight size={16} strokeWidth={1} /></Button>
            </div>
            <div className="grid grid-cols-2">
              {
                popularMovieList.slice(0, 10).map((popularMovie) => {
                  return <div key={popularMovie.id}>
                    <img src={`https://image.tmdb.org/t/p/original${popularMovie.poster_path}`} />
                    <p>{popularMovie.vote_average.toFixed(1)}/10</p>
                    <h1>{popularMovie.title}</h1>
                  </div>
                })
              }
            </div>
          </div>
        })
      }
    </div>
  );
}
