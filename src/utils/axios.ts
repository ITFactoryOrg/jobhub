import axios, {AxiosError} from "axios";
import {getUserFromLocalStorage} from "./localStorage";
import {AsyncThunkConfig, clearStore} from "../features/user/userSlice";
import {AsyncThunkPayloadCreator} from "@reduxjs/toolkit";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",

});

customFetch.interceptors.request.use(
  (config) => {

    const user = getUserFromLocalStorage();
    if(user &&config && config.headers) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config
  },
  (error) =>{
    return Promise.reject(error)
  }
)

export const checkForUnAuthorizedResponse:AsyncThunkPayloadCreator<object,AxiosError | any, AsyncThunkConfig> = (error, thunkAPI) =>{
  if(error.response?.status === 401){
    thunkAPI.dispatch(clearStore('user/clearStore'));
    return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
  }

  return thunkAPI.rejectWithValue( error.response?.data.message)
}


export default customFetch;
