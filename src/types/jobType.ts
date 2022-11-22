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
