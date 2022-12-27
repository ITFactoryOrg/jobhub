import {IJob} from "../../types/jobType";

export interface Application {
	date: Date;
	count: number;
}

export interface IStat {
	pending:number;
	interview: number;
	declined: number;
}

export interface StatsPayload {
	defaultStats: IStat;
	monthlyApplications: Application[]
}

export interface IFilterState {
	search: string;
	searchStatus: string;
	searchType: string;
	sort: string;
	sortOption: ['latest', 'oldest', 'a-z', 'z-a'];
}

export interface IInitialState extends IFilterState {
	isLoading: boolean;
	jobs: IJob[];
	totalJobs: number;
	numOfPages: number;
	page: number;
	stats: {
		pending:number;
		interview: number;
		declined: number;
	};
	monthlyApplications: Application[];
}