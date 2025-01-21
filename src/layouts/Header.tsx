import ThemeToggle from '../pages/home/ThemeToggle';
import HeaderLogo from '../../src/assets/HeaderLogo.svg?react';
import HeaderNavi from './HeaderNavi';

const Header = () => {
  return (
    <div className="header-container">
      <div className="container">
        <div className="navi-block">
          <div className="logo-color">
            <HeaderLogo />
          </div>
          <HeaderNavi />
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
