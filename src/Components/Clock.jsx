import React, { useRef } from "react";

export default function Clock(props) {
  const circle = useRef(null);
  const timerState = useRef(null);
  function pauseTimer() {
    console.log("timer paused");
    props.setPause(!props.pause);
  }
  return (
    <div className="clock">
      <svg className="circle-svg">
        <circle
          cx="50%"
          cy="50%"
          r={props.circleRadius}
          strokeDasharray={props.strokeDashArray}
          strokeDashoffset={props.strokeDashOffset}
          ref={circle}
        />
      </svg>
      <div className="clock__progress">
        <div className="clock__timer">
          {props.min < 10 ? "0" + props.min : props.min}:
          {props.sec < 10 ? "0" + props.sec : props.sec}
        </div>
        <p
          onClick={pauseTimer}
          className="clock__timer--state"
          ref={timerState}
        >
          {props.pause ? "PLAY" : "PAUSE"}
        </p>
      </div>
    </div>
  );
}
