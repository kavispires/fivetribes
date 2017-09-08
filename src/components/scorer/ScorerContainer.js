import React from 'react';

import Djinns from './Djinns';
import Hint from './Hint';
import Merch from './Merch';
import Oasis from './Oasis';
import Options from './Options';
import PreciousItems from './PreciousItems';
import Results from './Results';
import Scorer from './Scorer';
import Villages from './Villages';

import {
	ControlsDone,
	ControlsConfirm,
	ControlsOk,
	ControlsScore,
	ControlsStart,
} from './Controls';

const ScorerContainer = ({props}) => {

	const {scorer} = props;

	// Define Active Component
	let activeComponent;

	switch (scorer.screen) {
		case 'djinns':
			activeComponent = <Djinns props={props} />;
			break;

		case 'merch':
			activeComponent = <Merch props={props} />;
			break;

		case 'oasis':
			activeComponent = <Oasis props={props} />;
			break;

		case 'options':
			activeComponent = <Options props={props} />;
			break;

		case 'preciousItems':
			activeComponent = <PreciousItems props={props} />;
			break;

		case 'results':
			activeComponent = <Results props={props} />;
			break;

		case 'villages':
			activeComponent = <Villages props={props} />;
			break;

		default:
			activeComponent = <Scorer props={props} />;
	}

	// Define Controls

	let activeControls;

	switch (scorer.controls) {
		case 'start':
			activeControls = <ControlsStart controller={props.controller} />;
			break;

		case 'back-clear-score':
			activeControls = <ControlsScore controller={props.controller} />;
			break;

		case 'clear-ok':
			activeControls = <ControlsConfirm controller={props.controller} />;
			break;

		case 'done':
			activeControls = <ControlsDone controller={props.controller} />;
			break;

		default:
			activeControls = <ControlsOk props={props} />;
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
	    	scorer.controls ? activeControls : null
	    }
	  </div>
  );
};

export default ScorerContainer;
