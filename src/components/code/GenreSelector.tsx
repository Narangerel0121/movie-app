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

const GenreSelector = () => {
    const [genreList, setGenreList] = useState<GenreType[]>([]);

    const getGenreList = async () => {
        const genres = await instance.get("/genre/movie/list")
        setGenreList(genres.data.genres)
    }

      useEffect(() => {
        getGenreList();
      }, []);

    return(
        <div className="mb-2">
      <Select>
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