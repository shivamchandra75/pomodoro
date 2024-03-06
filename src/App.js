import "./App.css";
import Clock from "./Components/Clock";
import Buttons from "./Components/Buttons";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

function App() {
  // Reference
  const App = useRef(null);
  const outerCircle = useRef(null);
  const innerCircle = useRef(null);
  const coloredRing = useRef(null);
  const mainHeadingRef = useRef(null);
  const btnContainerRef = useRef(null);
  const themeIcon = useRef(null);
  const clockTextContainer = useRef(null);

  //States
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  ); //this will fetch if the user saved the dark mode setting last time the website was closed
  const [sec, setSec] = useState(59);
  const [min, setMin] = useState(24);
  const [strokeDashArray, setStrokeDashArray] = useState(null);
  const [strokeDashOffset, setStrokeDashOffset] = useState(0.4106666667);
  const [mode, setMode] = useState("pomodoro");
  const [pause, setPause] = useState(true);
  const [circleRadius, setCircleRadius] = useState(98);

  // Varaibles
  let increamentPomodoro;
  let increamentShort;
  let increamentLong;

  //save userPreference for dark or light theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  //this will reset width when window is resized and update the right value of strokeDashArray/coloured ring
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    if (width < 600) {
      setStrokeDashArray(616);
      setCircleRadius(98);
    }
    // tablet
    else if (width < 800) {
      setStrokeDashArray(849);
      setCircleRadius(135);
    }
    // laptop with browser screen height less than 750px
    else if (width < 7680 && height < 750) {
      setStrokeDashArray(849);
      setCircleRadius(135);
    }
    // laptop or monitor with browser screen height greater than 750px
    else if (width < 7680 && height > 750) {
      setStrokeDashArray(1069);
      setCircleRadius(170);
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
          else if (width < 7680 && height < 750)
            increamentPomodoro = 0.566; //confused about the condition? check out useEffect for window resize aka above one
          else if (width < 7680 && height > 750)
            increamentPomodoro = 0.7126666667;
          setStrokeDashOffset((prevVal) => prevVal + increamentPomodoro);
        }
        if (mode === "short") {
          if (width < 600) increamentShort = 2.0533333333;
          else if (width < 800) increamentShort = 2.83;
          else if (width < 7680 && height < 750) increamentShort = 2.83;
          else if (width < 7680 && height > 750) increamentShort = 3.5633333333;
          setStrokeDashOffset((prevVal) => prevVal + increamentShort);
        }
        if (mode === "long") {
          if (width < 600) increamentLong = 0.6844444444;
          else if (width < 800) increamentLong = 0.9433333333;
          else if (width < 7680 && height < 750) increamentLong = 0.9433333333;
          else if (width < 7680 && height > 750) increamentLong = 1.1877777778;
          setStrokeDashOffset((prevVal) => prevVal + increamentLong);
        }

        if (sec === 0) {
          setMin((prevMin) => prevMin - 1);
          setSec(59);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [pause, min, sec, mode]);

  useEffect(() => {
    var tl = gsap.timeline({ duration: 1 });

    //clockAnimation 1
    tl.to(outerCircle.current, {
      opacity: 1,
      boxShadow:
        "inset 2rem 2rem 2rem var(--shadow-dark),inset -2rem -2rem 2rem var(--shadow-light)",
    });
    //clockAnimation second
    tl.to(innerCircle.current, {
      opacity: 1,
      boxShadow:
        "inset 2rem 2rem 2rem var(--shadow-dark), inset -1.5rem -1.5rem 2rem var(--shadow-light), 1rem 1rem 2rem var(--shadow-dark), -0.5rem -0.5rem 2rem var(--shadow-light)",
    });
    //clockAnimation third
    tl.to(coloredRing.current, {
      opacity: 1,
    });
    //clock animation last
    tl.to(clockTextContainer.current, { opacity: 1 });
    //buttons animation
    tl.fromTo(
      btnContainerRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      "-=0.5"
    );
    //heading animation
    tl.fromTo(
      mainHeadingRef.current,
      {
        y: -100,
      },
      {
        y: 0,
      }
    );
    tl.fromTo(
      themeIcon.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      "-=1"
    );
  }, []);

  useEffect(() => {
    if (darkMode) App.current.classList.add("dark");
  });

  function toggleDarkMode() {
    if (darkMode) App.current.classList.remove("dark");
    setDarkMode(!darkMode);
  }

  return (
    <div className="App" ref={App}>
      <h2 className="main-heading" ref={mainHeadingRef}>
        POMODORO
      </h2>
      <Buttons
        setStrokeDashArray={setStrokeDashArray}
        setStrokeDashOffset={setStrokeDashOffset}
        setMin={setMin}
        setSec={setSec}
        setMode={setMode}
        width={width}
        height={height}
        btnContainerRef={btnContainerRef}
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
        outerCircle={outerCircle}
        innerCircle={innerCircle}
        coloredRing={coloredRing}
        clockTextContainer={clockTextContainer}
      />
      {darkMode ? (
        <div className="icon" ref={themeIcon} onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={faSun} />
        </div>
      ) : (
        <div className="icon" ref={themeIcon} onClick={toggleDarkMode}>
          <FontAwesomeIcon icon="fa-solid fa-moon" />
        </div>
      )}
    </div>
  );
}

export default App;
