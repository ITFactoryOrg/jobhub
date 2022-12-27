import React, { useState } from 'react';
import { FaUserCircle, FaAlignLeft, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar';
import {  toggleSidebar,clearStore } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Logo } from './icons-images';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button className='toggle-btn' type='button' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            className='btn'
            type='button'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
            <button
              className='dropdown-btn'
              type='button'
              onClick={() => dispatch(clearStore('Logout Successful...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
