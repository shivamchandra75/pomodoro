import React from "react";

export default function Buttons({
  setStrokeDashOffset,
  setMin,
  setSec,
  setMode,
}) {
  return (
    <div className="btn-container">
      <div
        onClick={() => {
          setMin(24);
          setSec(59);
          setStrokeDashOffset(0.41066667);
          setMode("pomodoro");
        }}
        className="btn pomodoro-btn active"
      >
        pomodoro
      </div>
      <div
        onClick={() => {
          setMin(4);
          setSec(59);
          setStrokeDashOffset(2.05333333);
          setMode("short");
        }}
        className="btn short-btn"
      >
        short break
      </div>
      <div
        onClick={() => {
          setMin(14);
          setSec(59);
          setStrokeDashOffset(0.68444444);
          setMode("long");
        }}
        className="btn long-btn"
      >
        long break
      </div>
    </div>
  );
}
