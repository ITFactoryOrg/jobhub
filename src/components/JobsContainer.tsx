import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Job from './Job';
import Loading from './Loading';

const JobsContainer = () => {
  const { jobs, isLoading, totalJobs, numOfPages } = useAppSelector(
    (state) => state.allJobs
  );
  const dispatch = useAppDispatch();
  console.log(numOfPages);

  useEffect(() => {
    dispatch(getAllJobs('_' as any));
  }, []);
  const reversedJobs = [...jobs].reverse();

  if (isLoading) {
    return <Loading center='center' />;
  }
  if (jobs.length === 0) {
    return <Wrapper>No Jobs to display...</Wrapper>;
  }
  return (
    <Wrapper>
      <h5>Jobs Info</h5>
      <p>{totalJobs}</p>
      <div className='jobs'>
        {reversedJobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
