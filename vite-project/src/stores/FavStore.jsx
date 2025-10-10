import React from "react";
import { create } from "zustand";

// FavStore: manages two types of favourites for the app:
// 1) preview-level favourites (shows) stored in `favs`
// 2) episode-level favourites stored in `favEpisodes`
// Both lists are persisted to localStorage so selections survive reloads.
const useFavStore = create((set, get) => ({
  favs: JSON.parse(localStorage.getItem("favs")) || [],
  // episode favorites are stored as objects { showId, episodeId, title, file }
  favEpisodes: JSON.parse(localStorage.getItem("favEpisodes")) || [],

  // add a preview to favorites (idempotent)
  addFav: (preview) =>
    set((state) => {
      const exists = state.favs.some((f) => f.id === preview.id);
      if (exists) return { favs: state.favs };
      const favs = [...state.favs, preview];
      localStorage.setItem("favs", JSON.stringify(favs));
      return { favs };
    }),

  // remove a preview from favorites
  removeFav: (previewId) =>
    set((state) => {
      const favs = state.favs.filter((f) => f.id !== previewId);
      localStorage.setItem("favs", JSON.stringify(favs));
      return { favs };
    }),

  // toggle favorite: add if missing, remove if exists
  toggleFav: (preview) => {
    const exists = get().favs.some((f) => f.id === preview.id);
    if (exists) {
      get().removeFav(preview.id);
    } else {
      get().addFav(preview);
    }
  },

  // returns whether a preview is currently favorited
  isFav: (previewId) => {
    return get().favs.some((f) => f.id === previewId);
  },

  // clear all favorites
  clearFavs: () =>
    set(() => {
      localStorage.removeItem("favs");
      return { favs: [] };
    }),
  // --- Episode-level favorites API ---
  // Episode favorites are objects with { showId, episodeId, title, file }
  // This allows the UI to render the title and play the episode directly
  // from the favorites page without an extra lookup.
  addEpisodeFav: ({ showId, episodeId, title, file }) =>
    set((state) => {
      const exists = state.favEpisodes.some(
        (e) => e.showId === showId && e.episodeId === episodeId
      );
      if (exists) return { favEpisodes: state.favEpisodes };
      const favEpisodes = [
        ...state.favEpisodes,
        { showId, episodeId, title, file },
      ];
      localStorage.setItem("favEpisodes", JSON.stringify(favEpisodes));
      return { favEpisodes };
    }),

  removeEpisodeFav: (showId, episodeId) =>
    set((state) => {
      const favEpisodes = state.favEpisodes.filter(
        (e) => !(e.showId === showId && e.episodeId === episodeId)
      );
      localStorage.setItem("favEpisodes", JSON.stringify(favEpisodes));
      return { favEpisodes };
    }),

  toggleEpisodeFav: ({ showId, episodeId, title, file }) => {
    const exists = get().favEpisodes.some(
      (e) => e.showId === showId && e.episodeId === episodeId
    );
    if (exists) {
      get().removeEpisodeFav(showId, episodeId);
    } else {
      get().addEpisodeFav({ showId, episodeId, title, file });
    }
  },

  isEpisodeFav: (showId, episodeId) => {
    return get().favEpisodes.some(
      (e) => e.showId === showId && e.episodeId === episodeId
    );
  },
  // clear episode favorites
  clearEpisodeFavs: () =>
    set(() => {
      localStorage.removeItem("favEpisodes");
      return { favEpisodes: [] };
    }),
}));

export default useFavStore;
