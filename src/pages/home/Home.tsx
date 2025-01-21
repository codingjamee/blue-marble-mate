import LogoComponent from "./LogoComponent";
import RecentlySaved from "./RecentlySaved";
import StartButton from "./StartButton";

const Home = () => {
  return (
    <main className="container">
      <LogoComponent />
      <StartButton />
      <RecentlySaved />
    </main>
  );
};
export default Home;
