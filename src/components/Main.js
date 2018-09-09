import React from "react";

import Home from "./Home";
import ScorerContainer from "./scorer/ScorerContainer";
import Solitaire from "./solitaire/Solitaire";

const Main = ({ props }) => {
  const mode = props.app.mode;

  let component = null;

  switch (mode) {
    case "scorer":
      component = <ScorerContainer props={props} />;
      break;

    case "solitaire":
      component = <Solitaire props={props} />;
      break;

    default:
      component = <Home props={props} />;
  }

  return component;
};

export default Main;
