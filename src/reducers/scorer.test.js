import rootReducer from './index';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer,
  {
    calculateMerch,
    setMerchPoints,
    setNumPlayers,
    setScorer,
    updateMerchPoints
  }
from '../../src/reducers/scorer';

import * as CONSTANTS from '../constants';

// console.log("" + mockStore);

describe('Scorer', () => {

  let testStore;
  beforeEach(() => {
    testStore = createStore(
      rootReducer,
      composeWithDevTools(
        applyMiddleware(thunkMiddleware)
      )
    );
  });

  describe('reducer', () => {

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({
        artisansExpansion: false,
        controls: '',
        djinnsPoints: {},
        hint: '',
        merchPoints: {},
        oasisPoints: {},
        numPlayers: 0,
        playerPoints: {},
        preciousItemsPoints: {},
        screen: 'options',
        thievesExpansion: false,
        total: [],
        villagesPoints: {},
        whimsExpansion: false,
      });
    });

  });

  describe('setNumPlayers and setControls', () => {

    beforeEach(() => {
      const evt = {target: { value: '1' }};
      testStore.dispatch(setNumPlayers(evt));
    });

    it('changes the number of players', () => {
      expect(testStore.getState().scorer.numPlayers).toEqual(1);
    });

    it('changes the controls', () => {
      expect(testStore.getState().scorer.controls).toEqual('start');
    });

  });

  describe('setScorer', () => {

    beforeEach(() => {
      const evt = {target: { value: '3' }};
      testStore.dispatch(setNumPlayers(evt));
      testStore.dispatch(setScorer());
    });

    it('updates playerPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES.length; i++) {
        const cat = CONSTANTS.CATEGORIES[i];
        expect(testStore.getState().scorer.playerPoints[cat]).toEqual([0, 0, 0]);
      }
    });

    it('updates djinnsPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES_DJINNS.length; i++) {
        const cat = CONSTANTS.CATEGORIES_DJINNS[i];
        expect(testStore.getState().scorer.djinnsPoints[cat]).toEqual([0, 0, 0]);
      }
    });

    it('updates merchPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES_MERCH.length; i++) {
        const cat = CONSTANTS.CATEGORIES_MERCH[i];
        expect(testStore.getState().scorer.merchPoints[cat]).toEqual([0, 0, 0]);
      }
    });

    it('updates oasisPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES_OSASIS.length; i++) {
        const cat = CONSTANTS.CATEGORIES_OSASIS[i];
        expect(testStore.getState().scorer.oasisPoints[cat]).toEqual([0, 0, 0]);
      }
    });

    it('updates preciousItemsPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES_ITEMS.length; i++) {
        const cat = CONSTANTS.CATEGORIES_ITEMS[i];
        expect(testStore.getState().scorer.preciousItemsPoints[cat]).toEqual([0, 0, 0]);
      }
    });

    it('updates villagesPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES_VILLAGES.length; i++) {
        const cat = CONSTANTS.CATEGORIES_VILLAGES[i];
        expect(testStore.getState().scorer.villagesPoints[cat]).toEqual([0, 0, 0]);
      }
    });
  });

  describe('updateMerchPoints', () => {

    beforeEach(() => {
      const evt = {target: { value: '5' }};
      testStore.dispatch(setNumPlayers(evt));
      testStore.dispatch(setScorer());
    });

    it('updates points to the right player', () => {
      let evt = {target: { name: 'fish-0', value: '1' }};
      testStore.dispatch(updateMerchPoints(evt));
      expect(testStore.getState().scorer.merchPoints.fish).toEqual([1, 0, 0, 0, 0]);

      evt = {target: { name: 'wheat-1', value: '1' }};
      testStore.dispatch(updateMerchPoints(evt));
      expect(testStore.getState().scorer.merchPoints.wheat).toEqual([0, 1, 0, 0, 0]);

      evt = {target: { name: 'gold-2', value: '1' }};
      testStore.dispatch(updateMerchPoints(evt));
      expect(testStore.getState().scorer.merchPoints.gold).toEqual([0, 0, 1, 0, 0]);

      evt = {target: { name: 'gems-3', value: '1' }};
      testStore.dispatch(updateMerchPoints(evt));
      expect(testStore.getState().scorer.merchPoints.gems).toEqual([0, 0, 0, 1, 0]);

      evt = {target: { name: 'fabric-4', value: '1' }};
      testStore.dispatch(updateMerchPoints(evt));
      expect(testStore.getState().scorer.merchPoints.fabric).toEqual([0, 0, 0, 0, 1]);
    });
  });

  describe('calculateMerch', () => {

    beforeEach(() => {
      const evt = {target: { value: '1' }};
      testStore.dispatch(setNumPlayers(evt));
      testStore.dispatch(setScorer());
    });

    describe('awards the right amount of points', () => {

      // Creates one player merch card object
      const cardCombination = (arr) => {
        // Complete array with 0s up to the total of merch
        while (arr.length < CONSTANTS.CATEGORIES_MERCH.length) {
          arr.push(0);
        }
        const result = {};
        for (let i = 0; i < CONSTANTS.CATEGORIES_MERCH.length; i++) {
          result[CONSTANTS.CATEGORIES_MERCH[i]] = [arr[i]];
        }
        return result;
      };

      // let merchCards;
      // beforeEach(() => {
      //   merchCards = {
      //     fish: [0],
      //     wheat: [0],
      //     pottery: [0],
      //     spices: [0],
      //     papyrus: [0],
      //     fabric: [0],
      //     ivory: [0],
      //     gems: [0],
      //     gold: [0]
      //   };
      // });

      it('for a single good', () => {
        const merchCards = cardCombination([1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(1);
      });

      it('for two of the same good', () => {
        const merchCards = cardCombination([2]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(2);
      });

      it('for 2 different goods', () => {
        const merchCards = cardCombination([1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(3);
      });

      it('for 3 different goods', () => {
        const merchCards = cardCombination([1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(7);
      });

      it('for 4 different goods', () => {
        const merchCards = cardCombination([1, 1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(13);
      });

      it('for 5 different goods', () => {
        const merchCards = cardCombination([1, 1, 1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(21);
      });

      it('for 6 different goods', () => {
        const merchCards = cardCombination([1, 1, 1, 1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(30);
      });

      it('for 7 different goods', () => {
        const merchCards = cardCombination([1, 1, 1, 1, 1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(40);
      });

      it('for 8 different goods', () => {
        const merchCards = cardCombination([1, 1, 1, 1, 1, 1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(50);
      });

      it('for 9 different goods', () => {
        const merchCards = cardCombination([1, 1, 1, 1, 1, 1, 1, 1, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(60);
      });

      it('for 2 goods for each kind', () => {
        const merchCards = cardCombination([2, 2, 2, 2, 2, 2, 2, 2, 2]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(120);
      });

      it('for random cards A', () => {
        const merchCards = cardCombination([2, 0, 2, 1, 0, 1, 1, 2]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(37);
      });

      it('for random cards B', () => {
        const merchCards = cardCombination([0, 3, 0, 2, 1, 0, 3, 3, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(50);
      });

      it('for random cards C', () => {
        const merchCards = cardCombination([2, 1, 1, 2, 1]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(24);
      });

      it('for random cards D', () => {
        const merchCards = cardCombination([0, 0, 1, 3, 0, 0, 3]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(13);
      });

      it('for all 6 fish cards', () => {
        const merchCards = cardCombination([0, 0, 0, 6]);
        testStore.dispatch(setMerchPoints(merchCards));
        testStore.dispatch(calculateMerch());
        expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(6);
      });






    });

  });

});
