import { create } from "zustand";

export const useContentStore = create((set) => ({
    contentType: "movie",
    setContentType: (type) => set({ contentType: type }),
}))

export const MOVIE_CATEGORIES = ["now_playing", "top_rated", "popular", "upcoming"];

export const TV_CATEGORIES = ["airing_today", "on_the_air", "popular", "top_rated"];