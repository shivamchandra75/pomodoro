import "./App.css";
import Clock from "./Components/Clock";
import Buttons from "./Components/Buttons";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [darkMode, setDarkMode] = useState(false);
  const [sec, setSec] = useState(59);
  const [min, setMin] = useState(24);
  const [strokeDashArray, setStrokeDashArray] = useState(616);
  const [strokeDashOffset, setStrokeDashOffset] = useState(0.4106666667);
  const [mode, setMode] = useState("pomodoro");
  const [pause, setPause] = useState(true);
  const [circleRadius, setCircleRadius] = useState(98);
  const App = useRef(null);
  let increamentPomodoro;
  let increamentShort;
  let increamentLong;

  //this will reset width when window is resized and update the right value of strokeDashArray/coloured ring
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if (width < 600) {
        setStrokeDashArray(616);
        setCircleRadius(98);
      } else if (width < 800) {
        setStrokeDashArray(849);
        setCircleRadius(135);
      } else if (width < 7680) {
        setStrokeDashArray(1069);
        setCircleRadius(170);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if ((min > 0 || sec > 0) && !pause) {
      let timer = setInterval(() => {
        setSec((prevSec) => prevSec - 1);
        if (mode === "pomodoro") {
          if (width < 600) increamentPomodoro = 0.4106666667;
          else if (width < 800) increamentPomodoro = 0.566;
          else if (width < 7680) increamentPomodoro = 0.7126666667;
          setStrokeDashOffset((prevVal) => prevVal + increamentPomodoro);
        }
        if (mode === "short") {
          if (width < 600) increamentShort = 2.0533333333;
          else if (width < 800) increamentShort = 2.83;
          else if (width < 7680) increamentShort = 3.5633333333;
          setStrokeDashOffset((prevVal) => prevVal + increamentShort);
        }
        if (mode === "long") {
          if (width < 600) increamentLong = 0.6844444444;
          else if (width < 800) increamentLong = 0.9433333333;
          else if (width < 7680) increamentLong = 1.1877777778;
          setStrokeDashOffset((prevVal) => prevVal + increamentLong);
        }

        if (sec === 0) {
          setMin((prevMin) => prevMin - 1);
          setSec(59);
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [pause, min, sec, mode]);

  function toggleDarkMode() {
    App.current.classList.toggle("dark");
    setDarkMode(!darkMode);
  }

  return (
    <div className="App" ref={App}>
      <h2 className="main-heading">POMODORO</h2>
      <Buttons
        setStrokeDashOffset={setStrokeDashOffset}
        setMin={setMin}
        setSec={setSec}
        setMode={setMode}
        width={width}
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
        circleRadius={circleRadius}
      />
      {darkMode ? (
        <div className="icon" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={faSun} />
        </div>
      ) : (
        <div className="icon" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon="fa-solid fa-moon" />
        </div>
      )}
    </div>
  );
}

export default App;
