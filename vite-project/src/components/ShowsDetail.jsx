import { useParams, Link } from "react-router-dom";
import usePreviewStore from "../stores/store";
import { useEffect, useState, useRef } from "react";
import useFavStore from "../stores/FavStore";
import AudioPlayer from 'react-h5-audio-player';

function ShowDetails() {
  // Fetching preview id using params
  const { previewId } = useParams();
  const { fetchSingleShow } = usePreviewStore();
  const [preview, setPreview] = useState(null);
  const [seasonsData, setSeasonsData] = useState(null);
  const { toggleEpisodeFav, isEpisodeFav } = useFavStore();

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSeasonIdx, setSelectedSeasonIdx] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  
  // Refs for all audio players
  const audioRefs = useRef({});

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
    return (
      <div className="h-6 w-6 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
    );
  }

  // When the user clicks Favorite on an episode we call into the FavStore
  // toggleEpisodeFav action. We pass showId + episodeId so the store can
  // uniquely identify the episode across different shows. We also include
  // title/file so the favorites page can show/play the episode without extra
  // network lookups.
  const handleFavClick = (episodeObj) => {
    // episodeObj: { episode, title, description, file }
    const episodeId = episodeObj.episode;
    toggleEpisodeFav({
      showId: previewId,
      episodeId,
      title: episodeObj.title,
      file: episodeObj.file,
    });
  };

  return (
    // Displays the shows data from the preview endpoint
    <div className="p-8">
      <h1 className="text-4xl">{preview && preview.title}</h1>
      <Link to="/Shows" className="">
        ⬅️Back to all shows
      </Link>
      <h1 className="mt-5">Description:</h1>
      <p className="my-5">{preview && preview.description}</p>
      {/* Custom Dropdown for Seasons - Enhanced Styling */}
      <div className="mb-6 relative inline-block">
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg border-2 border-violet-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 flex items-center justify-between min-w-[12rem]"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <span>
            {seasonsData.seasons[selectedSeasonIdx]?.title || "Select Season"}
          </span>
          <span
            className={`ml-3 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        {dropdownOpen && (
          <ul className="absolute left-0 mt-2 min-w-[12rem] bg-white border border-blue-200 rounded-xl shadow-xl z-10 transition-all duration-200 animate-fade-in">
            {seasonsData.seasons.map((seasonObj, idx) => (
              <li
                key={seasonObj.season}
                className={`px-5 py-3 cursor-pointer transition-colors duration-150 rounded-lg mb-1 last:mb-0
                  ${
                    selectedSeasonIdx === idx
                      ? "bg-blue-100 font-bold text-blue-700"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                onClick={() => {
                  setSelectedSeasonIdx(idx);
                  setDropdownOpen(false);
                }}
              >
                {seasonObj.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Display selected season's details and episodes */}
      <div>
        {seasonsData.seasons[selectedSeasonIdx] && (
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">
              {seasonsData.seasons[selectedSeasonIdx].title}
            </h2>
            {seasonsData.seasons[selectedSeasonIdx].image && (
              <img
                src={seasonsData.seasons[selectedSeasonIdx].image}
                alt={seasonsData.seasons[selectedSeasonIdx].title}
              />
            )}
            <ul>
              {seasonsData.seasons[selectedSeasonIdx].episodes.map(
                ({ episode, title, description, file }) => (
                  <li key={episode} className="my-2">
                    <strong>{title}</strong> - {description}{" "}
                    <button
                      onClick={() =>
                        handleFavClick({ episode, title, description, file })
                      }
                    >
                      {isEpisodeFav(previewId, episode)
                        ? "Unfavorite"
                        : "Favorite"}
                    </button>
                    <br />
                    <div className="my-4 px-4 py-2 bg-gray-50 rounded-lg shadow">
                      <AudioPlayer
                        ref={ref => audioRefs.current[episode] = ref}
                        src={file}
                        onPlay={() => {
                          // Pause all other players when one starts playing
                          setCurrentlyPlaying(episode);
                          Object.entries(audioRefs.current).forEach(([ep, player]) => {
                            if (ep !== episode && player?.audio?.current) {
                              player.audio.current.pause();
                            }
                          });
                        }}
                        className="rounded-lg bg-white"
                        showJumpControls={false}
                        customControlsSection={[
                          "MAIN_CONTROLS",
                          "VOLUME_CONTROLS",
                          "PROGRESS_BAR"
                        ]}
                        customProgressBarSection={[
                          "PROGRESS_BAR",
                          "CURRENT_TIME",
                          "DURATION"
                        ]}
                        autoPlayAfterSrcChange={false}
                        layout="horizontal"
                        style={{
                          boxShadow: 'none',
                          background: 'white',
                          width: '100%'
                        }}
                      />
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowDetails;
