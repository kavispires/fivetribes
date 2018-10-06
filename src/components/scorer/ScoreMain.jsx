import React, { Component } from 'react';

import Borders from '../Borders';
import BackButton from '../BackButton';
import Image from '../Image';
import RowButton from './RowButton';
import RowHeader from './RowHeader';
import RowNumber from './RowNumber';
import RowTotal from './RowTotal';

class ScoreMain extends Component {
  componentDidMount() {
    const { props } = this.props;
    if (props.scorer.categories.length === 0) {
      props.prepareScorer();
    }
  }

  render() {
    const { props } = this.props;
    const { scorer } = props;
    console.log(props.scorer.categories);
    console.log(props.scorer.scores);
    return (
      <main className="container container-scorer">
        <Borders />
        <BackButton handleBackButton={props.handleBackButton} />
        <Image src="logo" className="logo-top" alt="logo" extension="png" />

        {scorer.hint.length > 0 ? (
          <div className="hint">{scorer.hint}</div>
        ) : (
          <div className="hint-placeholder">&nbsp;</div>
        )}

        <ul className="scorer-table">
          <RowHeader colors={scorer.colors} />

          {scorer.scores.coins.length > 0 &&
            scorer.categories.map(category => {
              if (category.type === 'input') {
                return (
                  <RowNumber
                    key={category.name}
                    name={category.name}
                    icon={category.icon}
                    colors={scorer.colors}
                    values={scorer.scores[category.name]}
                    action={props.updateNumberCell}
                    hint={category.hint}
                    toggleHint={props.toggleHint}
                  />
                );
              }
              return (
                <RowButton
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  link={category.link}
                  subscreen={scorer.subscreen}
                  colors={scorer.colors}
                  values={scorer.scores[category.name]}
                  action={props.updateButtonCell}
                  props={props}
                />
              );
            })}

          {/* <RowTotal colors={scorer.colors} /> */}

          {/* {CATEGORIES.map(category => {
            if (
              ['djinnsTotal', 'merch'].indexOf(category) !== -1 ||
              (scorer.artisansExpansion && category === 'preciousItems') ||
              (scorer.whimsExpansion &&
                (category === 'oasisTotal' || category === 'villagesTotal')) ||
              (category === 'tilesTotal' &&
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
              (scorer.artisansExpansion && category === 'artisans') ||
              [
                'coins',
                'viziers',
                'elders',
                'tilesTotal',
                'oasisTotal',
                'villagesTotal',
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

            return '';
          })}
          <RowTotal total={scorer.total} /> */}
        </ul>
      </main>
    );
  }
}

export default ScoreMain;
