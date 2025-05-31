import { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
