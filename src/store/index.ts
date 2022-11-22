import { configureStore } from '@reduxjs/toolkit';
import allJobsSlice from '../features/allJobs/allJobsSlice';
import jobSlice from '../features/jobs/jobSlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
