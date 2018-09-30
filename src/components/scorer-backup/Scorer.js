import React from "react";

import RowButton from "./RowButton";
import RowHeader from "./RowHeader";
import RowNumber from "./RowNumber";
import RowTotal from "./RowTotal";

import { CATEGORIES } from "../../constants";

const Scorer = ({ props }) => {
  const { scorer } = props;
  // console.log(scorer);
  // console.log(props);

  return (
    <main className="screen-main screen-scorer-table">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {CATEGORIES.map(category => {
          if (
            ["djinnsTotal", "merch"].indexOf(category) !== -1 ||
            (scorer.artisansExpansion && category === "preciousItems") ||
            (scorer.whimsExpansion &&
              (category === "oasisTotal" || category === "villagesTotal")) ||
            (category === "tilesTotal" &&
              (scorer.whimsExpansion || scorer.artisansExpansion))
          ) {
            return (
              <RowButton
                key={category}
                type={category}
                scorer={scorer}
                cells={scorer.playerPoints[category]}
                action={props.updateScreen}
              />
            );
          }
          if (
            (scorer.artisansExpansion && category === "artisans") ||
            [
              "coins",
              "viziers",
              "elders",
              "tilesTotal",
              "oasisTotal",
              "villagesTotal"
            ].indexOf(category) !== -1
          ) {
            return (
              <RowNumber
                key={category}
                type={category}
                screen={scorer.screen}
                cells={scorer.playerPoints[category]}
                action={props.updateCell}
              />
            );
          }

          return "";
        })}
        <RowTotal total={scorer.total} />
      </ul>
    </main>
  );
};

export default Scorer;
