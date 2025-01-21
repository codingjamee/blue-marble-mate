import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";
import Game from "./pages/game/Game";
import Saved from "./pages/saved/Saved";
import Start from "./pages/start/Start";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/start",
        element: <Start />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);

export default router;
