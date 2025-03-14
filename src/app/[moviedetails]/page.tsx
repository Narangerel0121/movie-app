'use client'
import { instance } from '@/app/utils/axios-instance';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const params = useParams();
    // console.log(params.moviedetails) // id orj irj baigaa

    const [movie, setMovie] = useState('')
    const getMovie = async () => {
        const res = await instance.get(`/movie/${params.moviedetails}?language=en-US`);
        // `/movie/${params.id}?language=en-US`
        // console.log(res)
        setMovie(res.data)
    }
    useEffect(() => {
        getMovie();
    }, [])
    return (
        <div>
            HELLO BRO
           <img src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} className="rounded-t-lg" />
        </div>
    )
}