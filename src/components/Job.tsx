import { Link } from 'react-router-dom';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { IJob } from '../types/jobType';
import Wrapper from '../assets/wrappers/Job';
import { useAppDispatch } from '../store/hooks';
import JobInfo from './JobInfo';
import { deleteJob, setEditJob } from '../features/jobs/jobSlice';

interface IProps extends IJob {}

const Job = ({
  _id,
  company,
  jobLocation,
  jobType,
  position,
  status,
  createdAt,
}: IProps) => {
  const dispatch = useAppDispatch();
  const date = moment(createdAt).format('Do MMM  YYYY');
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => {
                dispatch(
                  setEditJob({
                    editJobId: _id,
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                );
              }}
            >
              Edit
            </Link>
            <button
              className='btn delete-btn'
              type='button'
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
