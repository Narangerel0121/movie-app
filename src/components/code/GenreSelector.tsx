
import { MovieType } from "@/app/page";
import { instance } from "@/app/utils/axios-instance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";


type GenreType = {
  id: number;
  name: string;
}

const GenreSelector: React.FC = () => {
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [relatedMovieId, setRelatedMovieId] = useState<number>();
  const [relatedMovieList, setRelatedMovieList] = useState<MovieType[]>([]);

  // fetch('https://api.themoviedb.org/3/movie/28/lists?language=en-US&page=1')

  const handleChange = (value) => {
    setRelatedMovieId(value);
    console.log(value, 'relatedMovieId')
  }

  const getGenreList = async () => {
    const genres = await instance.get("/genre/movie/list");
    setGenreList(genres.data.genres);
    console.log(genres.data.genres, 'genrelist')
  }
  useEffect(() => {
    getGenreList();
  }, []);

  const getRelatedMovie = async () => {
    const relatedMovie = await instance.get(`/discover/movie?language=en&with_genres=${relatedMovieId}&page=${2}`); // eniig oor huudas ruu shiljdeg bolgoh
    console.log(relatedMovie, "related movie")
    setRelatedMovieList(relatedMovie.data.results)
  }
  useEffect(() => {
    getRelatedMovie();
  }, [relatedMovieId]);

  return (
    <div className="mb-2">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          {
            genreList.map((genre) => (
              <SelectItem key={genre.id} value={String(genre.id)}>{genre.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default GenreSelector;