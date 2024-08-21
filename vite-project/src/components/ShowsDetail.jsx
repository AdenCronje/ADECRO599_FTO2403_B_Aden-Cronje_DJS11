import { useParams, Link } from "react-router-dom";
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
    <div className="p-8">
      <h1 className="text-4xl">{preview && preview.title}</h1>
      <Link to="/Shows" className="">
        ⬅️Back to all shows
      </Link>
      <h2 className="my-5">{preview && preview.description}</h2>
      <div>
        
      </div>
    </div>
  );
}

export default ShowDetails;
