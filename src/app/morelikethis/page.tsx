"use client"
import { MovieType } from "@/app/page";
import { instance } from "@/app/utils/axios-instance";
import { Footer } from "@/components/code/Footer";
import { Header } from "@/components/code/Header";
import { Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Genre() {
    const params = useParams();
    const [moreLikeThisList, setMoreLikeThisList] = useState<MovieType[]>([]);
    const [page, setPage] = useState(1);

    const getRelatedMovie = async () => {
        const moreLikeThis = await instance.get(`/discover/movie?language=en&with_genres=${params.id}&page=${page}`); // eniig oor huudas ruu shiljdeg bolgoh
        setMoreLikeThisList(moreLikeThis.data.results)
        console.log(moreLikeThis, "related movie")
    }
    useEffect(() => {
        getRelatedMovie();
    }, [params.id]);

    return (
        <div className="w-[375px] mx-auto">
            <Header />
            <div className="flex justify-between items-center py-8 px-5">
                {/* <h1 className="fontInter text-2xl semibold text-[#09090b]">Popular</h1> */}
            </div>
            <div className="grid grid-cols-2 px-5 gap-5 ">
                {
                    moreLikeThisList.slice(0, 10).map((movie) => {
                        return <div key={movie.id} className="border border-transparent bg-gray-100 rounded-lg"><Link href={`/moviedetails/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="rounded-t-lg" />
                            <div className="p-2">
                                <div className="flex items-center gap-0.5 pb-1">
                                    <Star size={16} color="#FDE047" fill="#FDE047" />
                                    <p>{movie.vote_average.toFixed(1)}<span className="text-gray-500">/10</span></p>
                                </div>
                                <h1 className="text-sm text-normal">{movie.title}</h1>
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