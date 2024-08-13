import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCovidData } from './redux/covidSlice';
import Filter from './components/Filter';
import Summary from './components/Summary';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import MapView from './components/MapView';
import { AppDispatch } from './redux/store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 

  useEffect(() => {
    dispatch(fetchCovidData());
  }, [dispatch]);

  return (
    <div>
    <h1>COVID-19 India</h1>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div>
      <Filter />
    <Summary />

      </div>
      <PieChart />
    </div>
    <LineChart />
    <MapView />
  </div>
  
  );
};

export default App;
