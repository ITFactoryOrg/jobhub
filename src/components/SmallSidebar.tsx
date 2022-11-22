import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { toggleSidebar } from '../features/user/userSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Logo } from './icons-images';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
