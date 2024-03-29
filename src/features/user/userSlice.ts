import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { IUser } from '../../types/userType';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {loginUserThunk, registerUserThunk, updateUserThunk,clearStoreThunk} from "./userThunk";

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

export const registerUser = createAsyncThunk('user/registerUser', registerUserThunk);

export const loginUser = createAsyncThunk('user/loginUser', loginUserThunk);

export const updateUser = createAsyncThunk('user/updateUser', updateUserThunk);

export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk)

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
    builder.addCase(
      clearStore.rejected, () =>{
        toast.error("There was an error")
      }
    )
  },
});

export default userSlice.reducer;
export const { toggleSidebar, logoutUser } = userSlice.actions;
