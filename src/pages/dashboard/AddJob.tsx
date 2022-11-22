import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormSelectRow } from '../../components';
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from '../../features/jobs/jobSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const AddJob = () => {
  const { user } = useAppSelector((state) => state.user);
  const {
    company,
    isEditing,
    isLoading,
    jobLocation,
    jobType,
    jobTypeOptions,
    position,
    status,
    statusOptions,
    editJobId,
  } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
    }
    if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, jobType, status }));
  };

  const handleJobInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({ name: 'jobLocation', value: user?.location || '' })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormSelectRow
            name='status'
            value={status}
            handleChange={handleJobInput}
            options={statusOptions}
          />
          {/* job type */}
          <FormSelectRow
            name='jobType'
            labelText='job Type'
            value={jobType}
            handleChange={handleJobInput}
            options={jobTypeOptions}
          />

          {/* btn container */}
          <div className='btn-container'>
            <button
              className='btn btn-block clear-btn'
              type='button'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader color='#fff' /> : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
