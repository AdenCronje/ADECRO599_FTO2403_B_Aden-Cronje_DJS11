import { useParams, Link } from "react-router-dom";
import usePreviewStore from "../stores/store";
import { useEffect, useState } from "react";

function ShowDetails() {
  // Fetching preview id using params
  const { previewId } = useParams();
  const { fetchSingleShow } = usePreviewStore();
  const [preview, setPreview] = useState(null);
  const [seasonsData, setSeasonsData] = useState(null);
  // const [loading, setLoading] = useState(false);

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

  if (!seasonsData) {
    return <div>Loading...</div>;
  }

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
                  <strong>{title}</strong> - {description}
                  <br />
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Listen
                  </a>
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

{
  /* // {seasonsData.seasons && seasonsData.seasons.length > 0 ? (
//   seasonsData.seasons.map(({ season, title, image, episodes }) => (
//     <div key={season} className="mb-5">
//       <h2 className="text-2xl font-semibold">{title}</h2>
//       {image && <img src={image} alt={title} className="mb-4 w-full max-w-md"/>}
//       <ul>
//         {episodes && episodes.length > 0 ? (
//           episodes.map(({ episode, title, description, file }) => (
//             <li key={episode} className="my-2">
//               <strong>{title}</strong> - {description}
//               <br />
//               <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-500">Listen</a>
//             </li>
//           ))
//         ) : (
//           <li>No episodes available</li>
//         )}
//       </ul>
//     </div>
//   ))
// ) : (
//   <p>No seasons data available</p>
// )} */
}
