import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) return res.status(404).json({ success: false, message: "No results found" });

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        })
        res.status(200).json({ success: true, content: response.results });

    } catch (error) {
        console.log("Error in Searching for Person:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function searchMovie(req, res) {

    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`);

        if (response.results.length === 0) return res.status(404).json({ success: false, message: "No results found" });

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "Movie",
                    createdAt: new Date()
                }
            }
        })
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in SearchingMovie for Person:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) return res.status(404).json({ success: false, message: "No results found" });


        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        })
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in SearchingMovie for Person:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getsearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;

    // converting id integer to string to avoid problems with invalid values like "123" which is not a valid id number in the search history object.
    id = parseInt(id);

    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                searchHistory: {
                    id: id
                }
            }
        });

        res.status(200).json({ success: true, message: "Item was successfully removed" })
    } catch (error) {
        console.log("Error in removing item from search history", error.message);

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}