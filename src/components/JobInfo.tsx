import React from 'react';
import Wrapper from '../assets/wrappers/JobInfo';

interface IProps {
  icon: JSX.Element | undefined;
  text: string | undefined;
}

const JobInfo = ({ icon, text }: IProps) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
