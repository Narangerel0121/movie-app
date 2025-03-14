import { ACCESS_TOKEN } from "@/constants";
import axios from "axios";

export const instance = axios.create({
    baseURL: "https://api.themoviedb.org//3/",
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
})