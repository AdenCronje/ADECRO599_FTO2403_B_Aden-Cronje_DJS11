import React from "react";
import { create } from "zustand";

const useFavStore = create((set) => ({
  favs: JSON.parse(localStorage.getItem("favs")) || [],

  toggleFav: (preview) => {
    set((state) => {
      const favs = [...state.favs];
      //   Matching preview id with favs id in the fav array
      const exsistingIndex = favs.findIndex((fav) => fav.id === preview.id);
      //   Checking if it exists, if it does it's removed
      if (!exsistingIndex >= 0) {
        favs.splice(exsistingIndex, 1);
      } else {
        favs.push(preview);
      }
      localStorage.setItem("favs", JSON.stringify(favs));
      //   Updates favorites in localsorage
      return favs;
    });
  },
}));

export default useFavStore;
