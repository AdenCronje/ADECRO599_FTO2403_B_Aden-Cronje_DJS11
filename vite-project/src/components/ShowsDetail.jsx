import React from "react";
import { useParams } from "react-router-dom";
import usePreviewStore from "../stores/store";
import { useEffect, useState } from "react";

function showDetails() {
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

return(
  <div>

  
  </div>
)


}
