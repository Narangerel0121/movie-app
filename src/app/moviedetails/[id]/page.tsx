'use client'
import { instance } from '@/app/utils/axios-instance';
import { Footer } from '@/components/code/Footer';
import GenreSelector from '@/components/code/GenreSelector';
import { Header } from '@/components/code/Header';
import { Button } from '@/components/ui/button';
import { MoveRight, Play, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MovieType } from '../../page';
import Link from 'next/link';

type ChosenMovieType = {
    title: string;
    vote_average: number;
    release_date: string;
    vote_count: number;
    runtime: number;
    id: number;
    poster_path: string;
    backdrop_path: string;
    overview: string;
}

type GenreType = {
    id?: number;
    name: string;
}

type CrewType = {
    name: string;
    job: string;
    id: number;
}

type CastType = {
    name: string;
    job: string;
    id: number;
}

// type IdType = {
//     id: number
// }

export type VideoType = {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: true
    published_at: Date;
    site: string;
    size: number;
    type: string;
}


export default function Page() {
    const params = useParams();
    // console.log(params.moviedetails) // id orj irj baigaa

    const [movie, setMovie] = useState<ChosenMovieType>();
    const [video, setVideo] = useState<VideoType>();
    const [similarMovieList, setSimilarMovieList] = useState<MovieType[]>([]);
    const [crewList, setCrewList] = useState<CrewType[]>([]);
    const [castList, setCastList] = useState<CastType[]>([]);
    const [genreList, setGenreList] = useState<GenreType[]>([]);

    const getMovie = async () => {
        const res = await instance.get(`/movie/${params.id}?language=en-US`);
        // `/movie/${params.id}?language=en-US`
        // getVideo(res.data.id)
        setMovie(res.data)
        // console.log(res.data)
    }

    const getVideo = async () => {
        const res = await instance.get(`/movie/${params.id}/videos?language=en-US`);
        console.log(res.data.results, "video")
        setVideo(res.data.results[0])
    }


    useEffect(() => {
        getVideo()
    }, [video?.key])

    const getSimilarMovieList = async () => {
        const res = await instance.get(`/movie/${params.id}/similar?language=en-US`);
        setSimilarMovieList(res.data.results);
        // console.log(res.data.results)
    }

    const getCrewList = async () => {
        const res = await instance.get(`/movie/${params.id}/credits?language=en-US`);
        setCrewList(res.data.crew);
        // console.log(res.data.crew, 'crew')
    }

    const getCastList = async () => {
        const res = await instance.get(`/movie/${params.id}/credits?language=en-US`);
        setCastList(res.data.cast);
        // console.log(res.data.cast)
    }

    const getGenreList = async () => {
        const res = await instance.get(`/movie/${params.id}?language=en-US`);
        setGenreList(res.data.genres)
        // console.log(res.data, "here")
    }

    useEffect(() => {
        getMovie();
        getSimilarMovieList();
        getCrewList();
        getCastList();
        getGenreList();
    }, [])

    return (
        <div className="w-[375px] mx-auto">
            <Header />
            <div className='my-8'>
                <div className='flex mx-5 justify-between'>
                    <div className='mb-4 font-normal text-sm'>
                        <h3 className='font-semibold text-2xl'>{movie?.title}</h3>
                        <p>{movie?.release_date} {movie?.runtime}m</p>
                    </div>
                    <div className='flex flex-row items-center gap-1'>
                        <Star color="#FDE047" fill="#FDE047" strokeWidth={1} />
                        <div>
                            <p><b>{movie?.vote_average.toFixed(1)}</b><span className="text-gray-500">/10</span></p>
                            <p>{movie?.vote_count}</p>
                        </div>
                    </div>
                </div>
                {/* <video src={`//www.youtube.com/watch?v=${video.key}`} className="rounded-t-lg" /> */}
                <div className='relative'>
                    <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} />
                   <div className='absolute flex gap-3 items-center left-4 bottom-4'>
                   <a href={`//www.youtube.com/watch?v=${video?.key}`} className='rounded-full h-9 w-9 bg-white flex justify-center items-center'>
                        <Play size={24} strokeWidth={1} />
                    </a>
                    <h4 className='text-white'>Play trailer</h4>
                   </div>
                </div>
            </div>

            <div className='flex justify-between gap-[34px] mx-5 mb-5'>
                <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} className='w-[100px] h-[148px]' />
                <div className=''>
                    <div className='flex mb-5 font-semibold text-xs gap-3 items-center flex-wrap'>{genreList?.map((genre) => {
                        return (
                            <div className='border border-gray-400 rounded-full py-0.5 px-2.5' key={genre.id}>{genre.name}</div>
                        )
                    })}</div>
                    <p>{movie?.overview}</p>
                </div>
            </div>

            <div className='mx-5'>
                <div className='flex gap-[53px] mb-1'>
                    <p><b>Director</b></p>
                    <div>
                        {crewList.map((crew) => {
                            if (crew.job === "Director") {
                                return (
                                    <p key={crew.id}>{crew.name}</p>
                                )
                            }
                            // {crew.job === "Director" && <p>{crew.name}</p>}
                        })}
                    </div>
                </div>
                <hr className='text-gray-100'></hr>
                <div className='flex gap-[58px] mb-1 mt-5'>
                    <p><b>Writers</b></p>
                    <div>
                        {crewList.map((crew) => {
                            if (crew.job === "Writer") {
                                return (
                                    <p key={crew.id}>{crew.name}</p>
                                )
                            }
                            // {crew.job === "Director" && <p>{crew.name}</p>}
                        })}
                    </div>
                </div>
                <hr className='text-gray-100'></hr>
                <div className='flex gap-[75px] mb-1 mt-5'>
                    <p><b>Stars</b></p>
                    <div>
                        {castList.slice(0, 4).map((cast) => {
                            return (
                                <p key={cast.id}>{cast.name}</p>
                            )
                        })}
                    </div>
                </div>
                <hr className='text-gray-100'></hr>
            </div>

            <div>
                <div className="flex justify-between items-center py-8 px-5">
                    <h1 className="fontInter text-2xl semibold text-[#09090b]">More like this</h1>
                    <Button className="py-2 px-4 rounded-md">See more<MoveRight size={16} strokeWidth={1} /></Button>
                </div>
                <div className="grid grid-cols-2 px-5 gap-5 ">
                    {
                        similarMovieList.slice(0, 2).map((similarMovie) => {
                            return <div key={similarMovie.id} className="border border-transparent bg-gray-100 rounded-lg"><Link href={`${similarMovie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/original${similarMovie.poster_path}`} className="rounded-t-lg" />
                                <div className="p-2">
                                    <div className="flex items-center gap-0.5 pb-1">
                                        <Star size={16} color="#FDE047" fill="#FDE047" />
                                        <p>{similarMovie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                    </div>
                                    <h1 className="text-sm text-normal">{similarMovie.title}</h1>
                                </div>
                            </Link>
                            </div>
                        })
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}