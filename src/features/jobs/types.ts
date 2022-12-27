import {IJob} from "../../types/jobType";

export interface IJobState {
	isLoading?: boolean;
	position: string;
	company: string;
	jobLocation: string;
	jobTypeOptions?: [string, string, string, string];
	jobType: string;
	statusOptions?: [string, string, string];
	status: string;
	isEditing?: boolean;
	editJobId?: string;
}

export interface IInputPayload {
	payload: {
		name: string ;
		value: string;
	};
}

export interface IEditJob {
	jobId: string;
	job: IJob;
}

export interface IEditJob {
	jobId: string;
	job: IJob;
}

// type keyIJob = keyof typeof initialState;