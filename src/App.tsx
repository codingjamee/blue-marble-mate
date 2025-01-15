import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import RootLayout from "./layouts/RootLayout";

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
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
