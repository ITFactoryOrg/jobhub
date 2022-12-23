import { Dispatch, AnyAction } from 'redux'
import {ThunkDispatch} from "@reduxjs/toolkit";

export type IsAny<T, True, False = never> =
// test if we are going the left AND right path in the condition
    true | false extends (T extends never ? true : false) ? True : False

export type IsUnknown<T, True, False = never> = unknown extends T
  ? IsAny<T, False, True>
  : False

export type FallbackIfUnknown<T, Fallback> = IsUnknown<T, Fallback, T>

class RejectWithValue<RejectValue> {
  public name = 'RejectWithValue'
  public message = 'Rejected'
  constructor(public readonly payload: RejectValue) {}
}

export type BaseThunkAPI<
  S,
  E,
  D extends Dispatch = Dispatch,
  RejectedValue = undefined
  > = {
  dispatch: D
  getState: () => S
  extra: E
  requestId: string
  signal: AbortSignal
  rejectWithValue(value: RejectedValue): RejectWithValue<RejectedValue>
}
type GetState<ThunkApiConfig> = ThunkApiConfig extends {
    state: infer State
  }
  ? State
  : unknown
type GetExtra<ThunkApiConfig> = ThunkApiConfig extends { extra: infer Extra }
  ? Extra
  : unknown
type GetDispatch<ThunkApiConfig> = ThunkApiConfig extends {
    dispatch: infer Dispatch
  }
  ? FallbackIfUnknown<
    Dispatch,
    ThunkDispatch<
      GetState<ThunkApiConfig>,
      GetExtra<ThunkApiConfig>,
      AnyAction
      >
    >
  : ThunkDispatch<GetState<ThunkApiConfig>, GetExtra<ThunkApiConfig>, AnyAction>

type GetRejectValue<ThunkApiConfig> = ThunkApiConfig extends {
    rejectValue: infer RejectValue
  }
  ? RejectValue
  : unknown

export type GetThunkAPI<ThunkApiConfig> = BaseThunkAPI<
  GetState<ThunkApiConfig>,
  GetExtra<ThunkApiConfig>,
  GetDispatch<ThunkApiConfig>,
  GetRejectValue<ThunkApiConfig>
  >


export interface IJob {
  _id?: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  token?: string;
  location?: string;
  status: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
}

