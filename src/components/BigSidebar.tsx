import Wrapper from '../assets/wrappers/BigSidebar';
import { useAppSelector } from '../store/hooks';
import { Logo } from './icons-images';
import NavLinks from './NavLinks';

const BigSidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.user);
  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
