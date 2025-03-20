"use client"
import { instance } from "@/app/utils/axios-instance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";


type GenreType = {
  id: number;
  name: string;
}

const GenreSelector: React.FC = () => {
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [relatedMovieId, setRelatedMovieId] = useState<number>();

  // fetch('https://api.themoviedb.org/3/movie/28/lists?language=en-US&page=1')

  // const handleChange = (value) => {
  //   setRelatedMovieId(value);
  //   console.log(value, 'relatedMovieId')
  // }

  const getGenreList = async () => {
    const genres = await instance.get("/genre/movie/list");
    setGenreList(genres.data.genres);
    console.log(genres.data.genres, 'genrelist')
  }
  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <div className="mb-2">
      <Select >
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
      </Select>


    </div>
  )
}

export default GenreSelector;