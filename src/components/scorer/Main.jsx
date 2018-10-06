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
    if (props.scorer.categories.main === undefined) {
      props.prepareScorer();
    }
  }

  render() {
    const { props } = this.props;
    const { scorer } = props;

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

        {scorer.scores.coins.length > 0 && scorer.categories.main ? (
          <ul className="scorer-table">
            <RowHeader colors={scorer.colors} />

            {scorer.categories.main &&
              scorer.categories.main.map(category => {
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
          </ul>
        ) : (
          <p className="p-error">Something is wrong</p>
        )}
      </main>
    );
  }
}

export default ScoreMain;
