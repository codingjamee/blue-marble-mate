// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import useThemeStore from '../stores/useThemeStore';
import Header from './Header';

const RootLayout = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`theme-${theme}`}>
      <div className="wrapper">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
