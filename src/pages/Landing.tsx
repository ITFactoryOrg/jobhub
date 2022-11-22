import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from '../assets/wrappers/LandingPage';
import { Logo, MainImg } from '../components/icons-images';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Simple online job tracking software for tracking hours spent on
            tasks. Track what you and your team are working, check project
            progress, and calculate billable hours.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <MainImg />
      </div>
    </Wrapper>
  );
};

export default Landing;
