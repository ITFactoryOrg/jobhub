import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IJob } from '../../types/jobType';
import customFetch from '../../utils/axios';
import { AsyncThunkConfig} from '../user/userSlice';

export interface Application {
  date: Date;
  count: number;
}
interface IStat {
  pending:number;
  interview: number;
  declined: number;
}
interface StatsPayload {
  defaultStats: IStat;
  monthlyApplications: Application[]
}

interface IFilterState {
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOption: ['latest', 'oldest', 'a-z', 'z-a'];
}
interface IInitialState extends IFilterState {
  isLoading: boolean;
  jobs: IJob[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: {
    pending:number;
    interview: number;
    declined: number;
  };
  monthlyApplications: Application[];
}

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

export const getAllJobs = createAsyncThunk<
  IInitialState,
  object,
  AsyncThunkConfig
>('allJobs/getJobs', async (_: any, thunkApi) => {
  try {
    const res = await customFetch.get(`/jobs`);
    return res.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.msg;
    } else message = String(error);

    return thunkApi.rejectWithValue(message);
  }
});

export const showStats = createAsyncThunk<
  any,
  any,
  AsyncThunkConfig
  >(
  'allJobs/showStats',
  async (_, thunkAPI) =>{
    try {
      const res = await customFetch.get('/jobs/stats');
      return res.data
    }catch (error) {
      let message;
      if (error instanceof AxiosError) {
        message = error.response?.data.msg;
      } else message = String(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
)

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
export const { showLoading, hideLoading } = allJobSlice.actions;
