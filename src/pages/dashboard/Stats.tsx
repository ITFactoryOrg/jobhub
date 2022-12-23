import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { showStats} from "../../features/allJobs/allJobsSlice";
import {StatsContainer, ChartsContainer, Loading} from '../../components'



const Stats = () => {
  const { monthlyApplications, isLoading} = useAppSelector(state => state.allJobs);
  const dispatch = useAppDispatch();


  useEffect(() =>{
    dispatch(showStats('_' as any));
  },[])

  if(isLoading) {
    return <Loading center={'center'}/>
  }

  return (
    <>
      <StatsContainer/>
      {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
  );
};

export default Stats;
