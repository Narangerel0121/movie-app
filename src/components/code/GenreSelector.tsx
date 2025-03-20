"use client"
import { instance } from "@/app/utils/axios-instance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


type GenreType = {
  id: number;
  name: string;
}

const GenreSelector: React.FC = () => {
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [relatedMovieId, setRelatedMovieId] = useState<number>();

  // const handleChange = (value) => {
  //   setRelatedMovieId(value);
  //   console.log(value, 'relatedMovieId')
  // }

  const getGenreList = async () => {
    const genres = await instance.get("/genre/movie/list");
    setGenreList(genres.data.genres);
    // console.log(genres.data.genres, 'genrelist')
  }
  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <div className="mb-2">
      {/* <Select >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          {
            genreList.map((genre) => (
              <Link key={genre.id} href={`/similarmovie/${genre.id}`}>
                <SelectItem value={String(genre.id)}>{genre.name}</SelectItem>
              </Link>
            ))}
        </SelectContent>
      </Select> */}

      <div className="border border-gray-200 rounded-2xl bg-white w-[345px] p-5 mx-auto mt-2">
        <h1 className="font-semibold text-2xl">Genres</h1>
        <p className="mb-4 font-normal text-base">See lists of movies by genre</p>
        <hr className="text-gray-300"></hr>
        <div className="flex flex-wrap gap-4 mt-4">
          {
            genreList.map((genre) => (
              <Link className="flex justify-center items-center py-1 px-2 border border-gray-500 rounded-2xl mb-1" key={genre.id} href={`/similarmovie/${genre.id}`}>
                <p className="text-xs font-semibold">{genre.name}</p>
                <ChevronRight strokeWidth={1} size={16} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default GenreSelector;