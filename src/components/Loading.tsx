import React from 'react';
interface IProps {
  center?: string;
}

const Loading = ({ center }: IProps) => {
  return <div className={`loading ${center ? 'loading-center' : ''}`}></div>;
};

export default Loading;
