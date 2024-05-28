import { BottomNav, NavBar, Routes } from "./components";

function App() {
  return (
    <>
      <NavBar />
      <div className="mt-20 md:mt-24 lg:mt-12.5 mb-14 md:mb-0">
        <Routes />
      </div>
      <BottomNav />
    </>
  );
}

export default App;
