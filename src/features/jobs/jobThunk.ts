import customFetch, {checkForUnAuthorizedResponse} from "../../utils/axios";
import {showLoading,hideLoading,getAllJobs} from '../allJobs/allJobsSlice';
import {clearValues} from './jobSlice'
import {AsyncThunkConfig} from "../user/userSlice";
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";
import {IEditJob, IJobState} from "./types";



export const createJobThunk:AsyncThunkPayloadCreator<IJobState, AsyncThunkConfig> = async(job, thunkAPI) =>{
	try {
		const res = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clearValues());
		return res.data;
	} catch (error) {
		return checkForUnAuthorizedResponse(error, thunkAPI)
	}

}

export const deleteJobThunk:AsyncThunkPayloadCreator<string, string | undefined, AsyncThunkConfig> = async (jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const res = await customFetch.delete(`jobs/${jobId}`);
		thunkAPI.dispatch(getAllJobs('_' as any));
		return res.data.msg;
	} catch (error: unknown) {
		thunkAPI.dispatch(hideLoading());
		return checkForUnAuthorizedResponse(error, thunkAPI)
	}
}

export const editJobThunk:AsyncThunkPayloadCreator<string, IEditJob, AsyncThunkConfig> = async ({ jobId, job }, thunkAPI) => {
	try {
		const res = await customFetch.patch(`/jobs/${jobId}`, job);
		// thunkApi.dispatch(clearValues());
		return res.data;
	} catch (error: unknown) {
		thunkAPI.dispatch(hideLoading());
		return checkForUnAuthorizedResponse(error, thunkAPI)
	}
}