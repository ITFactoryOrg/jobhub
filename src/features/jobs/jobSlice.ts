import {createAsyncThunk, createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IJob } from '../../types/jobType';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import {createJobThunk, deleteJobThunk, editJobThunk} from "./jobThunk";
import {IInputPayload, IJobState} from "./types";





const initialState:IJobState = {
  "isLoading": false,
  "position": '',
  "company": '',
  "jobLocation": '',
  "jobTypeOptions": ['full-time', 'part-time', 'remote', 'internship'],
  "jobType": 'full-time',
  "statusOptions": ['interview', 'declined', 'pending'],
  "status": 'pending',
  isEditing: false,
  "editJobId": '',
};

// type keyIJob = keyof typeof initialState;

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

class WritableDraft {
}

const jobSlice= createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location as string || '',
      };
    },
    handleChange: (state:IJobState | any, {payload: {name, value}}: IInputPayload) => {
       state[name] = value;
    },
    setEditJob: (state, {payload}) => {
      return {...state, isEditing: true, ...payload};
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

export const { handleChange,clearValues, setEditJob } = jobSlice.actions;
