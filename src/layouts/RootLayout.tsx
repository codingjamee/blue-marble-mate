// src/layouts/RootLayout.tsx
import { Outlet } from "react-router-dom";
import useThemeStore from "../stores/useThemeStore";
import ThemeToggle from "../pages/home/ThemeToggle";

const RootLayout = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className={`theme-${theme}`}>
      <div className="wrapper">
        <ThemeToggle />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
