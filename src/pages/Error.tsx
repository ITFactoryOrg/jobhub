import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import { NotFound } from '../components/icons-images';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <NotFound />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
