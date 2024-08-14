import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PlotData } from 'plotly.js';

const PieChart: React.FC = () => {
  const { activeCases, recovered, deaths, selectedState, stateData } = useSelector(
    (state: RootState) => state.covid
  );

  const data: Partial<PlotData> = {
    labels: ['Active Cases', 'Recovered', 'Deaths'],
    values: [
      selectedState
        ? stateData[selectedState].total.confirmed - stateData[selectedState].total.recovered - stateData[selectedState].total.deceased
        : activeCases,
      selectedState ? stateData[selectedState].total.recovered : recovered,
      selectedState ? stateData[selectedState].total.deceased : deaths,
    ],
    type: 'pie', 
  };

  return (
    <Plot
      data={[data]}
      layout={{ title: 'COVID Pie Diagram' }}
    />
  );
};

export default PieChart;
