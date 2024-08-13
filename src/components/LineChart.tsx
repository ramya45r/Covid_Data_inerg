import React from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ScatterData } from 'plotly.js';

const LineChart: React.FC = () => {
  const { selectedState, stateData } = useSelector(
    (state: RootState) => state.covid
  );

  if (!selectedState) {
    return null;
  }

  const totalCases = stateData[selectedState].total.confirmed;
  const recovered = stateData[selectedState].total.recovered;
  const deaths = stateData[selectedState].total.deceased;
  const activeCases = totalCases - recovered - deaths;

  const data: ScatterData[] = [
    {
      x: ['Total Cases', 'Active Cases', 'Recovered', 'Deaths'],
      y: [totalCases, activeCases, recovered, deaths],
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Cases',
    } as ScatterData,
  ];

  return (
    <Plot
      data={data}
      layout={{ title: `COVID-19 Cases in ${selectedState}` }}
    />
  );
};

export default LineChart;
