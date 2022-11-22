import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { IUser } from '../../types/userType';
import customFetch from '../../utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';

export interface IUserState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  user: IUser | null;
}

const initialState: IUserState = {
  isLoading: false,
  isSidebarOpen: true,
  user: getUserFromLocalStorage(),
};
export type AsyncThunkConfig = {
  state: RootState;
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: IUser, thunkApi) => {
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
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: IUser, thunkApi) => {
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
);

export const updateUser = createAsyncThunk<IUser, object, AsyncThunkConfig>(
  'user/updateUser',
  async (user, thunkApi) => {
    try {
      const res = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          authorization: `Bearer ${thunkApi.getState().user.user?.token}`,
        },
      });
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
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload && payload !== '') {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
        addUserToLocalStorage(payload);
        toast.success(`Hello there ${payload.name}`);
      }
    );
    builder.addCase(
      registerUser.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
        state.isSidebarOpen = true;
        addUserToLocalStorage(payload);
        toast.success(`Welcome back ${payload.name}`);
      }
    );
    builder.addCase(
      loginUser.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, { payload }: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = payload;
        addUserToLocalStorage(payload);
        toast.success(`Your information are updated`);
      }
    );
    builder.addCase(
      updateUser.rejected,
      (state, { payload }: PayloadAction<string | any>) => {
        state.isLoading = false;
        toast.error(payload);
      }
    );
  },
});

export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;
