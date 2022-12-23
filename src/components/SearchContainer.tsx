import React, {SyntheticEvent} from 'react';

import Wrapper from "../assets/wrappers/SearchContainer";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {FormRow} from "./index";


const SearchContainer = () => {
  const {isLoading,search,searchStatus,searchType,sort,sortOption} = useAppSelector(store => store.allJobs)
  const {jobTypeOptions, statusOptions} = useAppSelector(store => store.job);
  const dispatch = useAppDispatch();
  const handleSearch = (e:any) =>{};
  const handleSubmit = (e: SyntheticEvent) =>{
    e.preventDefault()
  }
  return <Wrapper>
    <form className={'form'} onSubmit={handleSubmit}>
      <h4>search form</h4>
      <div className="form-center">
      {/*  search position*/}
        <FormRow
          name={'search'}
          value={search}
          type={'text'}
          handleChange={handleSearch}
        />
      {/* search by status */}
        <FormRow
          name={}
          value={}
          type={}
          handleChange={}
          />
      </div>
    </form>
  </Wrapper>;
};

export default SearchContainer;
