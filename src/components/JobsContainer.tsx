import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Job from './Job';
import Loading from './Loading';
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { jobs, isLoading, totalJobs, numOfPages, page, search,searchStatus, searchType, sort } = useAppSelector(
    (state) => state.allJobs
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllJobs('_' as any));
  }, [page, search,searchStatus, searchType, sort ]);
  // const reversedJobs = [...jobs].reverse();

  if (isLoading) {
    return <Loading center='center' />;
  }
  if (jobs.length === 0) {
    return <Wrapper>No Jobs to display...</Wrapper>;
  }


  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages> 1 && <PageBtnContainer/>}
    </Wrapper>
  );
};

export default JobsContainer;
