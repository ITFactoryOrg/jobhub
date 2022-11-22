import { NavLink } from 'react-router-dom';
import { links } from '../utils/links';
interface IProps {
  toggleSidebar?: () => void;
}

const NavLinks = ({ toggleSidebar }: IProps) => {
  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to={path}
            key={id}
            onClick={toggleSidebar}
            end
          >
            <span className='icon'> {icon}</span>
            <span className='text'>{text}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
