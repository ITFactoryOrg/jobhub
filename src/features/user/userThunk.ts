import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";

import {IUser} from "../../types/userType";
import customFetch, {checkForUnAuthorizedResponse} from "../../utils/axios";
import {AsyncThunkConfig, logoutUser} from "./userSlice";
import {clearValues} from "../jobs/jobSlice";
import {clearAllJobsState} from "../allJobs/allJobsSlice";


export const registerUserThunk:AsyncThunkPayloadCreator<any, IUser, AsyncThunkConfig>  = async (user, thunkApi) => {
	try {
		const res = await customFetch.post('/auth/register', user);
		return res.data.user;
	} catch (error) {
		return checkForUnAuthorizedResponse(error, thunkApi)
	}
}

export const loginUserThunk:AsyncThunkPayloadCreator<any, IUser, AsyncThunkConfig> = async (user, thunkApi) => {
	try {
		const res = await customFetch.post('/auth/login', user);
		return res.data.user;
	} catch (error) {
		return checkForUnAuthorizedResponse(error, thunkApi)
	}
}

export const updateUserThunk :AsyncThunkPayloadCreator<IUser,object,  AsyncThunkConfig> = async (user, thunkApi) => {
	try {
		const res = await customFetch.patch('/auth/updateUser', user);
		return res.data.user;
	} catch (error) {
		return checkForUnAuthorizedResponse(error, thunkApi)
	}
}

export const clearStoreThunk:AsyncThunkPayloadCreator<object,string, AsyncThunkConfig> =  (message, thunkAPI) =>{
	try{
		//logout user
		thunkAPI.dispatch(logoutUser(message));
		// clear jobs value
		thunkAPI.dispatch(clearAllJobsState());
		//clear job input values
		thunkAPI.dispatch(clearValues());
		return Promise.resolve();
	}catch (error) {
		return Promise.reject();
	}
}