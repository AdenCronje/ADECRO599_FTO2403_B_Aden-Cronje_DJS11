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
    <div className="p-8">
      <h1 className="text-4xl">{preview && preview.title}</h1>
      <Link to="/Shows" className="">
        ⬅️Back to all shows
      </Link>
      <p className="my-5">{preview && preview.description}</p>
      <div></div>
    </div>
  );
}

export default ShowDetails;
