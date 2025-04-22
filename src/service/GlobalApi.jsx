import axios from "axios"

const BASE_URL = 'https://api.unsplash.com/search/photos'

export const GetPlacePhoto = (query) => {
    return axios.get(BASE_URL, {
        params: {
            query: query,
            per_page: 1
        },
        headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
        }
    });
}
