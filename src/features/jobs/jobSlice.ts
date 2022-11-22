import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IJob } from '../../types/jobType';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { AsyncThunkConfig, logoutUser } from '../user/userSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

interface IJobState {
  isLoading: boolean;
  position: string;
  company: string;
  jobLocation: string;
  jobTypeOptions: [string, string, string, string];
  jobType: string;
  statusOptions: [string, string, string];
  status: string;
  isEditing: boolean;
  editJobId: string;
}

interface IInputPayload {
  payload: {
    name: string | keyIJob;
    value: string;
  };
}

interface IEditJob {
  jobId: string;
  job: IJob;
}

const initialState: IJobState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['fulltime', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

type keyIJob = keyof typeof initialState;

export const createJob = createAsyncThunk<object, IJob, AsyncThunkConfig>(
  'job/createJob',
  async (job, thunkApi) => {
    try {
      const res = await customFetch.post('/jobs', job, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
        },
      });
      thunkApi.dispatch(clearValues());
      return res.data;
    } catch (error: unknown) {
      let message;
      if (error instanceof AxiosError) {
        message = error.response?.data.msg;
        if (error.response?.status === 401) {
          thunkApi.dispatch(logoutUser(''));
          return thunkApi.rejectWithValue('Unauthorized! Logging Out...');
        }
      } else message = String(error);

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteJob = createAsyncThunk<
  string,
  string | undefined,
  AsyncThunkConfig
>('job/deleteJob', async (jobId, thunkApi) => {
  thunkApi.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
      },
    });
    thunkApi.dispatch(getAllJobs('_' as any));
    return res.data.msg;
  } catch (error: unknown) {
    thunkApi.dispatch(hideLoading());
    let message;
    if (error instanceof AxiosError) {
      message = error.response?.data.msg;
    } else message = String(error);
    return thunkApi.rejectWithValue(message);
  }
});

export const editJob = createAsyncThunk<string, IEditJob, AsyncThunkConfig>(
  'job/editJob',
  async ({ jobId, job }, thunkApi) => {
    try {
      const res = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
        },
      });
      // thunkApi.dispatch(clearValues());
      return res.data;
    } catch (error: unknown) {
      thunkApi.dispatch(hideLoading());
      let message;
      if (error instanceof AxiosError) {
        message = error.response?.data.msg;
      } else message = String(error);
      return thunkApi.rejectWithValue(message);
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state: any, { payload: { name, value } }: IInputPayload) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Job Created');
    });
    builder.addCase(
      createJob.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
    builder.addCase(
      deleteJob.fulfilled,
      (state, { payload }: PayloadAction<string | any>) => {
        toast.success(payload);
      }
    );
    builder.addCase(
      deleteJob.rejected,
      ({ payload }: PayloadAction<string | any>) => {
        toast.error(payload);
      }
    );
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Job modified...');
    });
    builder.addCase(
      editJob.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
  },
});

export default jobSlice.reducer;

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
