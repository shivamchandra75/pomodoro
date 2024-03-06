import React, { useRef } from "react";

export default function Buttons({
  setStrokeDashArray,
  setStrokeDashOffset,
  setMin,
  setSec,
  setMode,
  width,
  height,
  btnContainerRef,
}) {
  let pomodoroBtn = useRef(null);
  let shortBtn = useRef(null);
  let longBtn = useRef(null);

  function initialPomodoroColorStroke() {
    if (width < 600) {
      setStrokeDashArray(616);
      setStrokeDashOffset(0.4106666667);
    } else if (width < 800) {
      setStrokeDashArray(849);
      setStrokeDashOffset(0.566);
    } else if (width < 7680 && height < 750) {
      setStrokeDashArray(849);
      setStrokeDashOffset(0.566);
    } else if (width < 7680 && height > 750) {
      setStrokeDashArray(1069);
      setStrokeDashOffset(0.7126666667);
    }
  }

  function initialShortColorStroke() {
    if (width < 600) {
      setStrokeDashArray(616);
      setStrokeDashOffset(2.0533333333);
    } else if (width < 800) {
      setStrokeDashArray(849);
      setStrokeDashOffset(2.83);
    } else if (width < 7680 && height < 750) {
      setStrokeDashArray(849);
      setStrokeDashOffset(2.83);
    } else if (width < 7680 && height > 750) {
      setStrokeDashArray(1069);
      setStrokeDashOffset(3.5633333333);
    }
  }

  function initialLongColorStroke() {
    if (width < 600) {
      setStrokeDashArray(616);
      setStrokeDashOffset(0.6844444444);
    } else if (width < 800) {
      setStrokeDashArray(849);
      setStrokeDashOffset(0.9433333333);
    } else if (width < 7680 && height < 750) {
      setStrokeDashArray(849);
      setStrokeDashOffset(0.9433333333);
    } else if (width < 7680 && height > 750) {
      setStrokeDashArray(1069);
      setStrokeDashOffset(1.1877777778);
    }
  }

  function maintainActiveBtn(e) {
    if (e.target.classList.contains("pomodoro-btn")) {
      pomodoroBtn.current.classList.add("active");
      shortBtn.current.classList.remove("active");
      longBtn.current.classList.remove("active");
    }
    //
    else if (e.target.classList.contains("short-btn")) {
      pomodoroBtn.current.classList.remove("active");
      shortBtn.current.classList.add("active");
      longBtn.current.classList.remove("active");
    }
    //
    else if (e.target.classList.contains("long-btn")) {
      pomodoroBtn.current.classList.remove("active");
      shortBtn.current.classList.remove("active");
      longBtn.current.classList.add("active");
    }
  }

  return (
    <div className="btn-container" ref={btnContainerRef}>
      <div
        onClick={(e) => {
          setMin(24);
          setSec(59);
          initialPomodoroColorStroke();
          maintainActiveBtn(e);
          setMode("pomodoro");
        }}
        ref={pomodoroBtn}
        className="btn pomodoro-btn active"
      >
        pomodoro
      </div>

      <div
        onClick={(e) => {
          setMin(4);
          setSec(59);
          initialShortColorStroke();
          maintainActiveBtn(e);
          setMode("short");
        }}
        ref={shortBtn}
        className="btn short-btn"
      >
        short break
      </div>

      <div
        onClick={(e) => {
          setMin(14);
          setSec(59);
          initialLongColorStroke();
          maintainActiveBtn(e);
          setMode("long");
        }}
        ref={longBtn}
        className="btn long-btn"
      >
        long break
      </div>
    </div>
  );
}
