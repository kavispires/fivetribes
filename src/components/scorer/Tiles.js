import React from "react";

import RowHeader from "./RowHeader";
import RowNumber from "./RowNumber";

import { CATEGORIES_TILES } from "../../constants";

const Tiles = ({ props }) => {
  const { scorer } = props;

  return (
    <main className="screen-main screen-scorer-precious-items">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {CATEGORIES_TILES.map(category => {
          if (
            (!scorer.artisansExpansion && category === "tent") ||
            (!scorer.whimsExpansion && category === "cities")
          ) {
            return "";
          }

          return (
            <RowNumber
              key={category}
              type={category}
              screen={scorer.screen}
              cells={scorer.tilesPoints[category]}
              action={props.updateCell}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Tiles;
