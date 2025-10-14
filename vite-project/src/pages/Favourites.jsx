import React, { useState } from "react";
import useFavStore from "../stores/FavStore";
import { Link } from "react-router-dom";

function Favorites() {
  const {
    favs,
    favEpisodes,
    removeFav,
    removeEpisodeFav,
    clearFavs,
    clearEpisodeFavs,
  } = useFavStore();

  const [sortOrder, setSortOrder] = useState("default");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-8">
      {/* Header + back link to Shows index */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl mb-2">My Favorites</h1>
          <Link to="/Shows" className="inline-block text-sm text-blue-600">
            ← Back to Shows
          </Link>
        </div>
        <div className="relative">
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Sort by{" "}
            {sortOrder === "default"
              ? "Default"
              : sortOrder === "asc"
              ? "A-Z"
              : "Z-A"}
            <span
              className={`ml-2 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-36 bg-white border border-blue-200 rounded-xl shadow-xl z-10">
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  sortOrder === "default"
                    ? "bg-blue-100 font-bold text-blue-700"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSortOrder("default");
                  setDropdownOpen(false);
                }}
              >
                Default
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  sortOrder === "asc"
                    ? "bg-blue-100 font-bold text-blue-700"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSortOrder("asc");
                  setDropdownOpen(false);
                }}
              >
                A-Z
              </li>
              <li
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  sortOrder === "desc"
                    ? "bg-blue-100 font-bold text-blue-700"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setSortOrder("desc");
                  setDropdownOpen(false);
                }}
              >
                Z-A
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Favorited Shows */}
      <section className="mb-6">
        <h2 className="text-2xl">Favorited Shows</h2>
        {favs.length === 0 ? (
          <p>No favorited shows yet.</p>
        ) : (
          <ul>
            {[...favs]
              .sort((a, b) => {
                if (sortOrder === "default") return 0;
                const compareResult = a.title.localeCompare(b.title);
                return sortOrder === "asc" ? compareResult : -compareResult;
              })
              .map((show) => (
                <li key={show.id} className="my-2">
                  <Link to={`/Shows/${show.id}`} className="font-semibold mr-2">
                    {show.title}
                  </Link>
                  <button onClick={() => removeFav(show.id)} className="ml-2">
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        )}
        {favs.length > 0 && <button onClick={clearFavs}>Clear shows</button>}
      </section>

      {/* Favorited Episodes */}
      <section>
        <h2 className="text-2xl">Favorited Episodes</h2>
        {favEpisodes.length === 0 ? (
          <p>No favorited episodes yet.</p>
        ) : (
          <ul>
            {[...favEpisodes]
              .sort((a, b) => {
                if (sortOrder === "default") return 0;
                const compareResult = a.title.localeCompare(b.title);
                return sortOrder === "asc" ? compareResult : -compareResult;
              })
              .map((ep) => (
                <li key={`${ep.showId}-${ep.episodeId}`} className="my-2">
                  <strong>{ep.title}</strong> — Show:{" "}
                  <Link to={`/Shows/${ep.showId}`}>{ep.showId}</Link>
                  <button
                    onClick={() => removeEpisodeFav(ep.showId, ep.episodeId)}
                    className="ml-2"
                  >
                    Remove
                  </button>
                  <br />
                  {ep.file && (
                    <audio controls>
                      <source src={ep.file} type="audio/mp3" />
                    </audio>
                  )}
                </li>
              ))}
          </ul>
        )}
        {favEpisodes.length > 0 && (
          <button onClick={clearEpisodeFavs}>Clear episodes</button>
        )}
      </section>
    </div>
  );
}

export default Favorites;
