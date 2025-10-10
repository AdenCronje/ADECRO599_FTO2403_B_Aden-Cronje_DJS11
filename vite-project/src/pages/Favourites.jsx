import React from "react";
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

  return (
    <div className="p-8">
      {/* Header + back link to Shows index */}
      <h1 className="text-3xl mb-4">My Favorites</h1>
      <Link to="/Shows" className="inline-block mb-4 text-sm text-blue-600">
        ← Back to Shows
      </Link>

      {/* Favorited Shows */}
      <section className="mb-6">
        <h2 className="text-2xl">Favorited Shows</h2>
        {favs.length === 0 ? (
          <p>No favorited shows yet.</p>
        ) : (
          <ul>
            {favs.map((show) => (
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
            {favEpisodes.map((ep) => (
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
