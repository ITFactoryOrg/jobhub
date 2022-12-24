import React, {ChangeEvent, SyntheticEvent} from 'react';

import Wrapper from "../assets/wrappers/SearchContainer";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {FormRow,FormSelectRow} from "./index";


const SearchContainer = () => {
  const {isLoading,search,searchStatus,searchType,sort,sortOption} = useAppSelector(store => store.allJobs)
  const {jobTypeOptions, statusOptions} = useAppSelector(store => store.job);
  const dispatch = useAppDispatch();
  const handleSearch = (e:ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>{
    e.preventDefault()
  };
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
        <FormSelectRow
          labelText={'status'}
          handleChange={handleSearch}
          value={searchStatus}
          options={['all', ...statusOptions]}
          name={'searchStatus'}/>
        {/* search by type */}
        <FormSelectRow
          labelText={'type'}
          handleChange={handleSearch}
          value={searchType}
          options={['all', ...jobTypeOptions]}
          name={'searchType'}/>
        <FormSelectRow
          handleChange={handleSearch}
          value={sort}
          options={sortOption}
          name={'sort'}/>
        <button
          type={'submit'}
          className={'btn btn-block btn-danger'}
        disabled={isLoading}
        >
          clear filters
        </button>
      </div>
    </form>
  </Wrapper>;
};

export default SearchContainer;
