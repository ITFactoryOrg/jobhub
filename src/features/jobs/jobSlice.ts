import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IJob } from '../../types/jobType';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import {createJobThunk, deleteJobThunk, editJobThunk} from "./jobThunk";

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

export interface IEditJob {
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

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

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
