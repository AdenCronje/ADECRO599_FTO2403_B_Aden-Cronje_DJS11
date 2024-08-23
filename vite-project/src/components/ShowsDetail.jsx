import { useParams, Link } from "react-router-dom";
import usePreviewStore from "../stores/store";
import { useEffect, useState } from "react";
import useFavStore from "../stores/FavStore";

function ShowDetails() {
  // Fetching preview id using params
  const { previewId } = useParams();
  const { fetchSingleShow } = usePreviewStore();
  const [preview, setPreview] = useState(null);
  const [seasonsData, setSeasonsData] = useState(null);
  const { favs, toggleFav } = useFavStore();
  // const [loading, setLoading] = useState(false);

  // Grabbing data for a single show from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSingleShow(previewId);
        setPreview(result);
      } catch (error) {
        console.log("error fetching", error);
      }
    };
    fetchData();
  }, [fetchSingleShow, previewId]);

  // Fetching seasons and episodes data from API
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${previewId}`
        );
        const result = await response.json();
        setSeasonsData(result);
      } catch (error) {
        console.log("failed fetch", error);
      }
    };
    fetchSeasons();
  }, [previewId]);

  // Loading for when there's a wait period for show details
  if (!seasonsData) {
    return <div>Loading...</div>;
  }

  const handleFavClick = (episode) => {
    toggleFav(episode);
  };

  const isFav = (previewId) => {
    return favs.some((fav) => fav.id === previewId);
  };

  return (
    // Displays the shows data from the preview endpoint
    <div className="p-8">
      <h1 className="text-4xl">{preview && preview.title}</h1>
      <Link to="/Shows" className="">
        ⬅️Back to all shows
      </Link>
      <p className="my-5">{preview && preview.description}</p>
      <div>
        {/* Displaying the seasons object data and nested episodes data */}
        {seasonsData.seasons.map(({ season, title, image, episodes }) => (
          <div key={season} className="mb-5">
            <h2 className="text-2xl font-semibold">{title}</h2>
            {image && <img src={image} alt={title} />}
            <ul>
              {episodes.map(({ episode, title, description, file }) => (
                <li key={episode} className="my-2">
                  <strong>{title}</strong> - {description}{" "}
                  <button onClick={() => handleFavClick(episode)}>
                    {isFav(episode.id) ? "Unfavorite" : "Favorite"}
                  </button>
                  <br />
                  <audio controls>
                    <source src={file} type="audio/mp3" />
                  </audio>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowDetails;
