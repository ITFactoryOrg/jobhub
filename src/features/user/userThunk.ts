import {IUser} from "../../types/userType";
import customFetch from "../../utils/axios";
import {AxiosError} from "axios";
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";
import {AsyncThunkConfig, logoutUser} from "./userSlice";


export const registerUserThunk:AsyncThunkPayloadCreator<any, IUser, AsyncThunkConfig>  = async (user, thunkApi) => {
	try {
		const res = await customFetch.post('/auth/register', user);
		return res.data.user;
	} catch (error) {
		let message;
		if (error instanceof AxiosError) message = error.response?.data.msg;
		else message = String(error);
		return thunkApi.rejectWithValue(message);
	}
}

export const loginUserThunk:AsyncThunkPayloadCreator<any, IUser, AsyncThunkConfig> = async (user, thunkApi) => {
	try {
		const res = await customFetch.post('/auth/login', user);
		return res.data.user;
	} catch (error) {
		let message;
		if (error instanceof AxiosError) message = error.response?.data.msg;
		else message = String(error);
		return thunkApi.rejectWithValue(message);
	}
}

export const updateUserThunk :AsyncThunkPayloadCreator<IUser, object, AsyncThunkConfig> = async (user, thunkApi) => {
	try {
		const res = await customFetch.patch('/auth/updateUser', user);
		return res.data.user;
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