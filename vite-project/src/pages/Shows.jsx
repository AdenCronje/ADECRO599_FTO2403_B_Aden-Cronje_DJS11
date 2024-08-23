import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import usePreviewStore from "../stores/store";
import HandleButton from "../components/HandleButton";

function Shows() {
  // State of previewStore and favStore
  const { previews, fetchAllShows, error } = usePreviewStore();

  useEffect(() => {
    if (!previews) {
      console.log("Fetched previews");
      fetchAllShows();
    }
  }, [fetchAllShows, previews]);

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
      <div>
        <h2 className="m-3">Filter List:</h2>
        <HandleButton />
      </div>
      <div className="text-center my-8 grid grid-cols-2">
        {previews &&
          previews.map((preview) => (
            <ul key={preview.id}>
              <div className="flex justify-center">
                <img src={preview.image} alt="Shows images" />
              </div>
              <Link
                className="text-lg"
                to={`/Shows/${preview.id}`}
              >{`${preview.title}`}</Link>
              <h2>Seasons: {preview && preview.seasons}</h2>
              <p className="text-sm">
                Last Updated: {preview && preview.updated}
              </p>
            </ul>
          ))}
      </div>
    </>
  );
}

export default Shows;
