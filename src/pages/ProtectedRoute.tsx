import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
interface IProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: IProps) => {
  const { user } = useAppSelector((state) => state.user);
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;
