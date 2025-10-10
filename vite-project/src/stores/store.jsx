import { create } from "zustand";
import genreTitles from "../../../genreTitles";

// Preview store: manages the fetched list of shows (previews). To support
// filtering we keep both `previews` (current view) and `allPreviews` (the
// original full list) so the UI can restore the full list when needed.
const usePreviewStore = create((set) => ({
  // Stores initial state
  // Adding previews data to localstorage
  previews: JSON.parse(localStorage.getItem("previews")) || [],
  // keep an unmodified copy so we can restore after filtering
  allPreviews: JSON.parse(localStorage.getItem("previews")) || [],
  error: null,

  // Fetch and store all shows
  fetchAllShows: async () => {
    try {
      // Checking every fetched shows data are in localstorage
      let previewAllShows = JSON.parse(localStorage.getItem("previews"));
      if (!previewAllShows) {
        // Fetching all shows data
        const response = await fetch("https://podcast-api.netlify.app");
        previewAllShows = await response.json();
        // Sorting shows alphabetically by title
        const sortedShows = previewAllShows.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        // Adding the sorted array to the localstorage and store
        localStorage.setItem("previews", JSON.stringify(sortedShows));
        set({ previews: sortedShows, allPreviews: sortedShows, error: null });
      }
      // Checking for any errors while fetching
    } catch (error) {
      set({ previews: [], error: error });
      console.log(error, "error fetching");
      console.error("error previews not fetched", error);
    }
  },

  // Fetching a single show
  fetchSingleShow: async (previewId) => {
    try {
      // Storing data in local storage
      let previewAllShows = JSON.parse(localStorage.getItem("previews"));
      const singlePreview = previewAllShows.find(
        (preview) => preview.id == previewId
      );
      console.log(typeof previewId);
      return singlePreview;
    } catch (error) {
      // return null if error
      console.error("error fetching product: ", error);
      return null;
    }
  },

  // Filter previews by genre name (uses genreTitles mapping)
  // Accepts a human-readable genre label (e.g. "Comedy"). We map that
  // label back to the numeric genre id using `genreTitles.js` and filter
  // the original `allPreviews` list by `p.genres` which is an array of ids.
  filterByGenre: (genreName) =>
    set((state) => {
      const all =
        state.allPreviews && state.allPreviews.length
          ? state.allPreviews
          : JSON.parse(localStorage.getItem("previews")) || [];

      if (!genreName || genreName === "All") {
        return { previews: all };
      }

      // Find numeric genre id from genreTitles mapping
      const entry = Object.entries(genreTitles).find(
        ([, title]) => title === genreName
      );
      if (!entry) {
        // If we don't have a mapping for this genre name, return all
        return { previews: all };
      }
      const genreId = Number(entry[0]);

      const filtered = all.filter(
        (p) => Array.isArray(p.genres) && p.genres.includes(genreId)
      );
      return { previews: filtered };
    }),
}));

export default usePreviewStore;
