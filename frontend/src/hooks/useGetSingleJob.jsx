import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();

/*   useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );

        console.log("API RESPONSE:", res.data);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          console.log("JOB:", res.data.job);
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, []); */
};

export default useGetSingleJob;