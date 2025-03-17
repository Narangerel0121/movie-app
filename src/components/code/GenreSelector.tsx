
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

  const getGenreList = async () => {
    const genres = await instance.get("/genre/movie/list");
    setGenreList(genres.data.genres);
    // console.log(genres.data.genres)
  }
  
  useEffect(() => {
    getGenreList();
  }, []);
  
  // fetch('https://api.themoviedb.org/3/movie/28/lists?language=en-US&page=1')

  // const getRelatedMovie = async () => {
  //   const realtedMovie = await instance.get(`/movie/${genre.id}/lists?language=en-US&page=1`)
  //   setGenreList(relatedMovie.data.genres)
  // }
   
const handleChange = (event) => {
  console.log(event.target.value, 'value')
}

  return (
    <div className="mb-2">
      <Select onChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre"/>
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