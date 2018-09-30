import React from "react";

export const ControlsStart = ({ controller }) => {
  return (
    <section className="screen-controls" onClick={controller}>
      <input
        type="button"
        name="start"
        className="btn btn-1 btn-primary"
        value="Start"
      />
    </section>
  );
};

export const ControlsScore = ({ controller }) => {
  return (
    <section
      className="screen-controls screen-controls-justify"
      onClick={controller}
    >
      <div className="screen-controls-subgroup">
        <input type="button" name="back-home" className="btn" value="Back" />
        <input type="button" name="clear-all" className="btn" value="Clear" />
      </div>
      <input
        type="button"
        name="score"
        className="btn btn-2 btn-primary"
        value="Score"
      />
    </section>
  );
};

export const ControlsConfirm = ({ controller }) => {
  return (
    <section className="screen-controls" onClick={controller}>
      <input type="button" name="clear" className="btn" value="Clear" />
      <input
        type="button"
        name="confirm"
        className="btn btn-primary"
        value="OK"
      />
    </section>
  );
};

export const ControlsDone = ({ controller }) => {
  return (
    <section className="screen-controls" onClick={controller}>
      <input
        type="button"
        name="confirm"
        className="btn btn-1 btn-primary"
        value="Done"
      />
    </section>
  );
};

export const ControlsOk = ({ controller }) => {
  return (
    <section className="screen-controls" onClick={controller}>
      <input
        type="button"
        name="confirm"
        className="btn btn-1 btn-primary"
        value="OK"
      />
    </section>
  );
};
