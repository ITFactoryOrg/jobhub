import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";
import {AsyncThunkConfig} from "../user/userSlice";
import customFetch, {checkForUnAuthorizedResponse} from "../../utils/axios";
import {IInitialState} from "./types";

export const allJobsThunk:AsyncThunkPayloadCreator<IInitialState,object, AsyncThunkConfig> = async (_: any, thunkApi) => {
	const {page, search, searchStatus, searchType, sort} = thunkApi.getState().allJobs;
	let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
	if (search) {
		url = url + `&search=${search}`
	}
	try {
		const res = await customFetch.get(url);
		return res.data;
	} catch (error) {
		return checkForUnAuthorizedResponse(error, thunkApi)
	}
}

export const showStatsThunk:AsyncThunkPayloadCreator<any, any, AsyncThunkConfig> = async (_, thunkAPI) =>{
	try {
		const res = await customFetch.get('/jobs/stats');
		return res.data
	}catch (error) {
		return checkForUnAuthorizedResponse(error, thunkAPI)
	}
}