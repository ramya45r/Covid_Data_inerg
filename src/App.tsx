import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCovidData } from "./redux/covidSlice";
import Filter from "./components/Filter";
import Summary from "./components/Summary";
import PieChart from "./components/PieChart";
import { AppDispatch } from "./redux/store";
import Chart from "./components/Chart";
import Map from "./components/Map";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCovidData());
  }, [dispatch]);

  return (
    <div>
      <h1 className="maintext">COVID India</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div>
          <Filter />
          <Summary />
        </div>
        <PieChart />
      </div>

      <Chart />
      <h1 className="maintext">Map View</h1>
      <Map />
    </div>
  );
};

export default App;
