import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const List: React.FC = () => {
  const { totalCases, activeCases, recovered, deaths, selectedState, stateData } = useSelector(
    (state: RootState) => state.covid
  );

  const stateSummary = selectedState ? stateData[selectedState].total : null;
console.log(stateSummary,'stateSummary');

  return (
    <div>
      <h2>COVID Summary</h2>
      <p>State:{selectedState}</p>
      <p>Total Cases: {stateSummary ? stateSummary.confirmed : totalCases}</p>
      <p>Active Cases: {stateSummary ? stateSummary.confirmed - stateSummary.recovered - stateSummary.deceased : activeCases}</p>
      <p>Recovered: {stateSummary ? stateSummary.recovered : recovered}</p>
      <p>Deaths: {stateSummary ? stateSummary.deceased : deaths}</p>
    </div>
  );
};

export default List;
