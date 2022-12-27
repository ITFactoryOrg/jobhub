import React, {ChangeEvent, SyntheticEvent, useMemo, useState} from 'react';

import Wrapper from "../assets/wrappers/SearchContainer";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {FormRow,FormSelectRow} from "./index";
import {clearFilters, handleChange} from "../features/allJobs/allJobsSlice";


const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('')
  const {isLoading,search,searchStatus,searchType,sort,sortOption} = useAppSelector(store => store.allJobs)
  const {jobTypeOptions, statusOptions} = useAppSelector(store => store.job);
  const dispatch = useAppDispatch();
  const handleSearch = (e:ChangeEvent<HTMLSelectElement|HTMLInputElement>) =>{
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    let timeoutID: string | number | NodeJS.Timeout | undefined;
    return (e:ChangeEvent<HTMLSelectElement|HTMLInputElement>) =>{
        setLocalSearch(e.target.value);
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          dispatch(handleChange({name: e.target.name, value: e.target.value}))
        }, 700)
    }
  }

  const optimizedDebounce = useMemo(() => debounce(), []);
  const handleSubmit = (e: SyntheticEvent) =>{
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  }
  return <Wrapper>
    <form className={'form'} onSubmit={handleSubmit}>
      <h4>search form</h4>
      <div className="form-center">
      {/*  search position*/}
        <FormRow
          name={'search'}
          value={localSearch}
          type={'text'}
          handleChange={optimizedDebounce}
        />
      {/* search by status */}
        <FormSelectRow
          labelText={'status'}
          value={searchStatus}
          handleChange={handleSearch}
          options={['all', ...statusOptions]}
          name={'searchStatus'}/>
        {/* search by type */}
        <FormSelectRow
          labelText={'type'}
          value={searchType}
          handleChange={handleSearch}
          options={['all', ...jobTypeOptions]}
          name={'searchType'}/>
        <FormSelectRow
          value={sort}
          handleChange={handleSearch}
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
