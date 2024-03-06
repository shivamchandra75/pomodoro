import React, { useRef } from "react";

export default function Clock(props) {
  // const circle = useRef(null);
  const timerState = useRef(null);
  function pauseTimer() {
    console.log("timer paused");
    props.setPause(!props.pause);
  }
  return (
    <div className="clock" ref={props.outerCircle}>
      <svg className="circle-svg">
        <circle
          cx="50%"
          cy="50%"
          r={props.circleRadius}
          strokeDasharray={props.strokeDashArray}
          strokeDashoffset={props.strokeDashOffset}
          ref={props.coloredRing}
        />
      </svg>
      <div className="clock__progress" ref={props.innerCircle}>
        <div className="clockText-container" ref={props.clockTextContainer}>
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
    </div>
  );
}
