import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSelectedState } from "../redux/covidSlice";
import axios from "axios";

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: RootState) => state.covid.stateData);
console.log(stateData,'stateData');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedState(e.target.value));
  };


  return (
    <div>
    <select onChange={handleChange}>
      <option value="">Select State</option>
      {Object.keys(stateData).map((stateCode) => (
        <option key={stateCode} value={stateCode}>
          {stateCode}
        </option>
      ))}
    </select>

    </div>
  );
};

export default Filter;
