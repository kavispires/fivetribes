import React from 'react';

import Controls from './Controls';
import Hint from './Hint';
import Options from './Options';
import Scorer from './Scorer';

const ScorerContainer = ({props}) => {
	const {scorer} = props;

	let activeComponent;

	if (scorer.screen === 'options') {
		activeComponent = <Options props={props} />;
	}
	else {
		activeComponent = <Scorer props={props} />;
	}

	return (
		<div className="screen-container">
	    {
	    	activeComponent
	    }
	    {
	    	scorer.hint ? <Hint hint={scorer.hint} /> : null
	    }
	    {
	    	scorer.controls.length > 0 ? <Controls props={props} /> : null
	    }
	  </div>
  );
};

export default ScorerContainer;
