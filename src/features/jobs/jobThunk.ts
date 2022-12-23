import customFetch from "../../utils/axios";
import {showLoading,hideLoading,getAllJobs} from '../allJobs/allJobsSlice';
import {clearValues} from './jobSlice'
import { IJob} from "../../types/jobType";
import {AsyncThunkConfig, logoutUser} from "../user/userSlice";
import {AxiosError} from "axios";
import {IEditJob} from "./jobSlice";
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";



export const createJobThunk:AsyncThunkPayloadCreator<any, IJob, AsyncThunkConfig> = async(job, thunkApi) =>{
	try {
		const res = await customFetch.post('/jobs', job);
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

export const deleteJobThunk:AsyncThunkPayloadCreator<string, string | undefined, AsyncThunkConfig> = async (jobId, thunkApi) => {
	thunkApi.dispatch(showLoading());
	try {
		const res = await customFetch.delete(`jobs/${jobId}`);
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
}

export const editJobThunk:AsyncThunkPayloadCreator<string, IEditJob, AsyncThunkConfig> = async ({ jobId, job }, thunkApi) => {
	try {
		const res = await customFetch.patch(`/jobs/${jobId}`, job);
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