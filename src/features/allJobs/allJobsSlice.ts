import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {allJobsThunk, showStatsThunk} from "./allJobThunk";
import {IFilterState, IInitialState, StatsPayload} from "./types";

const initialFilterSate: IFilterState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOption: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState: IInitialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {
    pending:0,
    interview: 0,
    declined: 0,
  },
  monthlyApplications: [],
  ...initialFilterSate,
};

export const getAllJobs = createAsyncThunk('allJobs/getJobs', allJobsThunk);

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

const allJobSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange:(state:IFilterState | any, {payload:{name, value}})=>{
      state.page = 1
      state[name]= value
    },
    clearFilters: (state) => {
      return {...state, ...initialFilterSate}
    },
    changePage:(state, {payload}:PayloadAction<number>) =>{
      state.page = payload
    },
    clearAllJobsState:() => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllJobs.fulfilled,
      (state, { payload }: PayloadAction<IInitialState>) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.totalJobs = payload.totalJobs;
        state.numOfPages = payload.numOfPages;
      }
    );
    builder.addCase(
      getAllJobs.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
    builder.addCase(showStats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(showStats.fulfilled, (state, {payload}:PayloadAction<StatsPayload>) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    });
    builder.addCase(showStats.rejected, (state, {payload}:PayloadAction<string | any>) => {
      state.isLoading = false;
      toast.error(payload)
    });
  },
});

export default allJobSlice.reducer;
export const { showLoading, hideLoading, clearFilters, handleChange, changePage, clearAllJobsState } = allJobSlice.actions;
