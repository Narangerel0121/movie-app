'use client'
import { instance } from '@/app/utils/axios-instance';
import { Footer } from '@/components/code/Footer';
import GenreSelector from '@/components/code/GenreSelector';
import { Header } from '@/components/code/Header';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type MovieType = {
    title: string;
    vote_average: number;
    release_date: string;
    vote_count: number;
    runtime: number;
    id: number;
}

type IdType = {
    id: number
}

type VideoType = {
    type: string;
    results : {
        size: number;
        type: string;
        key: string;
    }[]
}

export default function Page() {
    const params = useParams();
    // console.log(params.moviedetails) // id orj irj baigaa

    const [movie, setMovie] = useState<MovieType>();
    const [video, setVideo] = useState<VideoType>();

    const getMovie = async () => {
        const res = await instance.get(`/movie/${params.moviedetails}?language=en-US`);
        // `/movie/${params.id}?language=en-US`
        getVideo(res.data.id)
        setMovie(res.data)
    }
    useEffect(() => {
        getMovie();
    }, [])

    const getVideo = async (id: IdType) => {
        const res = await instance.get(`/movie/${id}/videos?language=en-US`);
        console.log(res)
        setVideo(res.data)
    }
    

    return (
        <div className="w-[375px] mx-auto">
            <Header />
            <GenreSelector />
            <div>
                <div>
                    <div>
                        <h1>{movie?.title}</h1>
                        <p>{movie?.release_date} {movie?.runtime}m</p>
                    </div>
                    <div>
                        <p>{movie?.vote_average.toFixed(1)}/10</p>
                        <p>{movie?.vote_count}</p>
                    </div>
                </div>
                <p>{video?.results[1].type}</p>
            
            </div>

            <Footer />
        </div>
    )
}