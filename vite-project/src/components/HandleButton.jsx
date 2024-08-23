import React from "react";
import usePreviewStore from "../stores/store";
import genreTitles from "../../../genreTitles";

function HandleButton() {
  const { preview, error } = usePreviewStore();

  let showPreviews = preview;

  // Matching genre titles to genre Id
  const getGenreTitle = (genreId) => {
    return genreTitles[genreId];
  };

  if (!getGenreTitle) {
    console.log("Error", error);
  }

  //   if (genreTitles === showPreviews) {
  //     showPreviews.filter("type");
  //   } else {
  //     showPreviews.sort((a, b) => a.title.localeCompare(b.title));
  //   }

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
