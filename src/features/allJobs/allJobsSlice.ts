import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IJob } from '../../types/jobType';
import customFetch from '../../utils/axios';
import { AsyncThunkConfig, logoutUser } from '../user/userSlice';

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
  stats: {};
  monthlyApplications: [];
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
  stats: {},
  monthlyApplications: [],
  ...initialFilterSate,
};

export const getAllJobs = createAsyncThunk<
  IInitialState,
  object,
  AsyncThunkConfig
>('allJobs/getJobs', async (_: any, thunkApi) => {
  let url = `/jobs`;
  try {
    const res = await customFetch.get(`/jobs`, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
      },
    });
    return res.data;
  } catch (error) {
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.msg;
    } else message = String(error);

    return thunkApi.rejectWithValue(message);
  }
});

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
  },
});

export default allJobSlice.reducer;
export const { showLoading, hideLoading } = allJobSlice.actions;
