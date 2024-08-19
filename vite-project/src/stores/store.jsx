import { create } from "zustand";

const usePreviewStore = create((set) => ({
  // Stores initial state
  // Adding previews data to localstorage
  previews: JSON.parse(localStorage.getItem("previews")) || [],
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
        localStorage.setItem("previews", JSON.stringify(previewAllShows));
        set({ previews: previewAllShows, error: null });
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
