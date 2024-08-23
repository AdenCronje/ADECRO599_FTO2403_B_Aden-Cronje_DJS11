import { create } from "zustand";

const usePreviewStore = create((set) => ({
  // Stores initial state
  // Adding previews data to localstorage
  previews: JSON.parse(localStorage.getItem("previews")) || null,
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
        // Adding the sorted array to the localstorage
        localStorage.setItem("previews", JSON.stringify(sortedShows));
        set({ previews: sortedShows, error: null });
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
}));

export default usePreviewStore;
