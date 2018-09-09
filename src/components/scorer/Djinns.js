import React from "react";

import RowHeader from "./RowHeader";
import RowNumber from "./RowNumber";
import RowRadio from "./RowRadio";

import {
  CATEGORIES_DJINNS,
  CATEGORIES_DJINNS_AND_THIEVES
} from "../../constants";

const PreciousItems = ({ props }) => {
  const { scorer } = props;

  return (
    <main className="screen-main screen-scorer-djinns">
      <ul className="scorer-table">
        <RowHeader total={scorer.total} />
        {CATEGORIES_DJINNS.map(category => {
          // Do not show ptah or geb row if artisans expansion is not in play
          if (
            !scorer.artisansExpansion &&
            (category === "ptah" || category === "geb")
          ) {
            return "";
          }
          return (
            <RowRadio
              key={category}
              type={category}
              screen={scorer.screen}
              cells={scorer.total} //CHANGE
              action={props.updateRadioDjinn}
            />
          );
        })}
        {CATEGORIES_DJINNS_AND_THIEVES.map(category => {
          // Do not show thieves row if thieves expansion is not in play
          if (!scorer.thievesExpansion && category === "thieves") {
            return "";
          }
          return (
            <RowNumber
              key={category}
              type={category}
              screen={scorer.screen}
              cells={scorer.djinnsPoints[category]}
              action={props.updateCell}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default PreciousItems;
