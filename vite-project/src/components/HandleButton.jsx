import React from "react";
import usePreviewStore from "../stores/store";
import genreTitles from "../../../genreTitles";

function HandleButton() {
  // The HandleButton component renders filter buttons for genres. It uses
  // the preview store's `filterByGenre` action implemented in `store.jsx`.
  // Each button calls handleFilterChange which forwards the chosen label
  // (e.g. "Comedy") to the store. The store maps that label to a numeric
  // genre id (via `genreTitles.js`) and filters the previews accordingly.
  const { preview, error } = usePreviewStore();

  let showPreviews = preview;

  // Use the store's filter action
  const { filterByGenre } = usePreviewStore();
  const handleFilterChange = (type, value) => {
    // currently type is unused (kept for compatibility with previous callers)
    filterByGenre(value);
  };

  // Matching genre titles to genre Id
  const getGenreTitle = (genreId) => {
    return genreTitles[genreId];
  };

  if (!getGenreTitle) {
    console.log("Error", error);
  }

  // if (genreTitles === showPreviews) {
  //   showPreviews.filter("type");
  // } else {
  //   showPreviews.sort((a, b) => a.title.localeCompare(b.title));
  // }

  return (
    <div className="grid grid-cols-3 place-content-evenly">
      <button onClick={() => handleFilterChange("type", "All")}>All</button>
      <button onClick={() => handleFilterChange("type", "Self-Help")}>
        Self-Help
      </button>
      <button onClick={() => handleFilterChange("type", "Mystery")}>
        Mystery
      </button>
      <button onClick={() => handleFilterChange("type", "Comedy")}>
        Comedy
      </button>
      <button onClick={() => handleFilterChange("type", "Science")}>
        Science
      </button>
      <button onClick={() => handleFilterChange("type", "History")}>
        History
      </button>
      <button onClick={() => handleFilterChange("type", "Fiction")}>
        Fiction
      </button>
      <button onClick={() => handleFilterChange("type", "Drama")}>Drama</button>
      <button onClick={() => handleFilterChange("type", "Adventure")}>
        Adventure
      </button>
    </div>
  );
}

export default HandleButton;
