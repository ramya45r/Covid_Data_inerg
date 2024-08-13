import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedState } from "../redux/covidSlice";
import axios from "axios";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: RootState) => state.covid.stateData);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedState(e.target.value));
  };
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://data.covid19india.org/v4/min/data.min.json"
        );
        console.log(response.data, "response");
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  return (
    <select onChange={handleChange}>
      <option value="">Select State</option>
      {Object.keys(stateData).map((stateCode) => (
        <option key={stateCode} value={stateCode}>
          {stateCode}
        </option>
      ))}
    </select>
  );
};

export default Filter;
