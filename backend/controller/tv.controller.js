import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

        if (!data.results || data.results.length === 0) {
            throw new Error("No trending TV shows found.");
        }

        const randomTvShow = data.results[Math.floor(Math.random() * data.results.length)];

        res.json({ success: true, content: randomTvShow });

    } catch (error) {
        console.error("Error fetching trending TV show:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        // Filter the results to get only trailers
        const trailers = data.results.filter(video => video.type === 'Trailer');

        if (trailers.length === 0) {
            return res.status(404).json({ success: false, message: "No trailers found" });
        }

        res.json({ success: true, trailers });

    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).json({ success: false, message: "TV show not found" });
        }
        console.error("Error fetching TV show trailers:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes('404')) {
            return res.status(404).json({ success: false, message: "TV show not found" });
        }
        console.error("Error fetching TV show details:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No similar TV shows found" });
        }

        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.error("Error fetching similar TV shows:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No TV shows found in this category" });
        }

        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error("Error fetching TV shows by category:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
