import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CovidState {
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
  stateData: { [key: string]: any };
  selectedState: string;
  loading: boolean;
  error: string | null;
}

const initialState: CovidState = {
  totalCases: 0,
  activeCases: 0,
  recovered: 0,
  deaths: 0,
  stateData: {},
  selectedState: '',
  loading: false,
  error: null,
};

export const fetchCovidData = createAsyncThunk(
  'covid/CovidData',
  async () => {
    const response = await axios.get('https://data.covid19india.org/v4/min/data.min.json');
    console.log(response.data,'data');
    
    return response.data;
  }
);

const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {
    setSelectedState(state:any, action) {
      state.selectedState = action.payload;
    },
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(fetchCovidData.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCovidData.fulfilled, (state:any, action:any) => {
        const data = action.payload;
        state.loading = false;
        state.totalCases = data['TT'].total.confirmed;
        state.activeCases = data['TT'].total.confirmed - data['TT'].total.recovered - data['TT'].total.deceased;
        state.recovered = data['TT'].total.recovered;
        state.deaths = data['TT'].total.deceased;
        state.stateData = data;
      })
      .addCase(fetchCovidData.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setSelectedState } = covidSlice.actions;

export default covidSlice.reducer;
