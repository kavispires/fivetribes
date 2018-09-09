import React from "react";

import { NUMPLAYERS, EXPANSIONS } from "../../constants";

const Options = ({ props }) => {
  return (
    <main className="screen-main screen-scorer-options">
      <section className="content mode-scorer">
        <h1>Select the number of players</h1>
        <ul className="content-list" onChange={evt => props.setNumPlayers(evt)}>
          {NUMPLAYERS.map(num => (
            <li key={num} className="content-item content-item-5">
              <input
                type="radio"
                name="numPlayers"
                value={`${num}`}
                id={`opt-p-${num}`}
              />
              <label htmlFor={`opt-p-${num}`}>
                <img
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/options/options-${num}.svg`}
                  alt={`${num}-players`}
                />
                <span className="label-text">
                  {`${num}`}
                  <span className="label-checkmark" />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section className="content mode-scorer">
        <h1>Select the expansions in use</h1>
        <ul className="content-list" onChange={evt => props.setExpansions(evt)}>
          {EXPANSIONS.map(name => (
            <li key={name} className="content-item content-item-3">
              <input
                type="checkbox"
                className="btn"
                name="expansions"
                value={`${name}`}
                id={`opt-p-${name}`}
              />
              <label htmlFor={`opt-p-${name}`}>
                <img
                  src={`${
                    process.env.PUBLIC_URL
                  }/images/options/options-${name}.svg`}
                  alt={`Expansion ${name}`}
                />
                <span className="label-text">
                  {`${name}`}
                  <span className="label-checkmark" />
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Options;
