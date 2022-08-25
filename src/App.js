import "./App.css";
import Clock from "./Components/Clock";
import Buttons from "./Components/Buttons";
import React, { useState } from "react";
import { useRef, useEffect } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sec, setSec] = useState(59);
  const [min, setMin] = useState(24);
  const [strokeDashArray, setStrokeDashArray] = useState(616);
  const [strokeDashOffset, setStrokeDashOffset] = useState(0.41066667);
  const [mode, setMode] = useState("pomodoro");
  const [pause, setPause] = useState(true);
  const App = useRef(null);

  useEffect(() => {
    if ((min > 0 || sec > 0) && !pause) {
      let timer = setInterval(() => {
        setSec((prevSec) => prevSec - 1);
        if (mode == "pomodoro")
          setStrokeDashOffset((prevVal) => prevVal + 0.41066667);
        if (mode == "short")
          setStrokeDashOffset((prevVal) => prevVal + 2.05333333);
        if (mode == "long")
          setStrokeDashOffset((prevVal) => prevVal + 0.68444444);

        if (sec === 0) {
          setMin((prevMin) => prevMin - 1);
          setSec(59);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pause, min, sec]);

  function toggleDarkMode() {
    console.log("func ran");
    if (!darkMode) {
      App.current.classList.toggle("dark");
    }
    setDarkMode(!darkMode);
  }

  return (
    <div className="App" ref={App}>
      <h2 onClick={toggleDarkMode} className="main-heading">
        POMODORO
      </h2>
      <Buttons
        setStrokeDashOffset={setStrokeDashOffset}
        setMin={setMin}
        setSec={setSec}
        setMode={setMode}
      />
      <Clock
        sec={sec}
        setSec={setSec}
        min={min}
        setMin={setMin}
        strokeDashArray={strokeDashArray}
        strokeDashOffset={strokeDashOffset}
        pause={pause}
        setPause={setPause}
      />
    </div>
  );
}

export default App;
