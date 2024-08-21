import { useParams } from "react-router-dom";
import usePreviewStore from "../stores/store";
import { useEffect, useState } from "react";

function ShowDetails() {
  // Fetching preview id using params
  const { previewId } = useParams();
  const { fetchSingleShow } = usePreviewStore();
  const [preview, setPreview] = useState(null);

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

  return (
    <div>
      <h1>{preview && preview.title}</h1>
      <h2>{preview && preview.description}</h2>
    </div>
  );
}

export default ShowDetails;
