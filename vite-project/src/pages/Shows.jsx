import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import usePreviewStore from "../stores/store";

function Shows() {
  // State of previewStore and favStore
  const { previews, fetchAllShows, error } = usePreviewStore();

  useEffect(() => {
    if (!previews) {
      console.log("Fetched previews");
      fetchAllShows();
    }
  }, [fetchAllShows, previews]);

  // Logic for filtering shows by genre
  // const displayedShows = genreFilter
  //   ? previews.filter((preview) => preview.genres === genreFilter)
  //   : previews;

  // Displays an error message on page if data is fetched incorrectly
  if (error) {
    return <h1>Data fetching failed</h1>;
  }

  return (
    <>
      <div>
        <h1 className="text-4xl text-left">All available shows</h1>
        <nav>
          <Header />
        </nav>
      </div>
      <div className="text-center my-8 grid grid-cols-2">
        {previews &&
          previews.map((preview) => (
            <ul key={preview.id}>
              <div className="flex justify-center">
                <img src={preview.image} alt="Shows images" />
              </div>
              <Link
                className=""
                to={`/Shows/${preview.id}`}
              >{`${preview.title}`}</Link>
              <h2>Seasons: {preview && preview.seasons}</h2>
            </ul>
          ))}
      </div>
    </>
  );
}

export default Shows;

{
  /* <ul>
          {previews &&
            previews.map((preview) => (
              <li key={preview.id}>
                <div>
                  {preview.id}. {preview.title}
                </div>
                <div>{preview.description}</div>
              </li>
            ))}
        </ul> */
}
