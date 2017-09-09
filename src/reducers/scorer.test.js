import rootReducer from './index';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer, * as action from '../../src/reducers/scorer';

import * as CONSTANTS from '../constants';

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
        djinns: [-1, -1, -1, -1, -1],
        djinnsPoints: {},
        hint: '',
        merchPoints: {},
        oasisPoints: {},
        numPlayers: 0,
        playerPoints: {},
        preciousItemsPoints: {},
        preciousItemsQuantity: [],
        screen: 'options',
        thievesExpansion: false,
        tilesPoints: {},
        total: [],
        villagesPoints: {},
        whimsExpansion: false,
      });
    });

  });

  describe('setNumPlayers and setControls', () => {

    beforeEach(() => {
      const evt = {target: { value: '1' }};
      testStore.dispatch(action.setNumPlayers(evt));
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
      testStore.dispatch(action.setNumPlayers(evt));
      testStore.dispatch(action.setScorer());
    });

    it('updates playerPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES.length; i++) {
        const cat = CONSTANTS.CATEGORIES[i];
        expect(testStore.getState().scorer.playerPoints[cat]).toEqual([0, 0, 0]);
      }
    });

    it('updates djinnsPoints with all its categories', () => {
      for (let i = 0; i < CONSTANTS.CATEGORIES_DJINNS_AND_THIEVES.length; i++) {
        const cat = CONSTANTS.CATEGORIES_DJINNS_AND_THIEVES[i];
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

  describe('updateCell for input[number]', () => {

    beforeEach(() => {
      const evt = {target: { value: '5' }};
      testStore.dispatch(action.setNumPlayers(evt));
      testStore.dispatch(action.setScorer());
    });

    it('updates points to the right player', () => {
      let evt = {target: { name: 'merch-fish-0', value: '1' }};
      testStore.dispatch(action.updateCell(evt));
      expect(testStore.getState().scorer.merchPoints.fish).toEqual([1, 0, 0, 0, 0]);

      evt = {target: { name: 'merch-wheat-1', value: '1' }};
      testStore.dispatch(action.updateCell(evt));
      expect(testStore.getState().scorer.merchPoints.wheat).toEqual([0, 1, 0, 0, 0]);

      evt = {target: { name: 'merch-gold-2', value: '1' }};
      testStore.dispatch(action.updateCell(evt));
      expect(testStore.getState().scorer.merchPoints.gold).toEqual([0, 0, 1, 0, 0]);

      evt = {target: { name: 'merch-gems-3', value: '1' }};
      testStore.dispatch(action.updateCell(evt));
      expect(testStore.getState().scorer.merchPoints.gems).toEqual([0, 0, 0, 1, 0]);

      evt = {target: { name: 'merch-fabric-4', value: '1' }};
      testStore.dispatch(action.updateCell(evt));
      expect(testStore.getState().scorer.merchPoints.fabric).toEqual([0, 0, 0, 0, 1]);
    });
  });

  describe('Calculate functions for modals', () => {

    beforeEach(() => {
      const evt = {target: { value: '1' }};
      testStore.dispatch(action.setNumPlayers(evt));
      testStore.dispatch(action.setScorer());
    });

    describe('calculateDjinnsAndThieves', () => {

      it('awards the right amount of points', () => {
      const points = { djinns: [6], thieves: [6] };
      testStore.dispatch(action.setDjinnsPoints(points));

      testStore.dispatch(action.calculateDjinnsAndThieves());
      expect(testStore.getState().scorer.playerPoints.djinnsTotal[0]).toEqual(12);

      });

    });

    describe('calculateOasisAndVillages', () => {

      it('awards the right amount of oasis points', () => {

        const points = { oasis: [6], oasisLake: [0] };

        testStore.dispatch(action.setOasisPoints(points));
        testStore.dispatch(action.calculateOasisAndVillages());
        expect(testStore.getState().scorer.playerPoints.oasisTotal[0]).toEqual(18);
      });

      it('awards the right amount of villages points', () => {

        const points = { villages: [2], villagesLake: [0] };

        testStore.dispatch(action.setVillagesPoints(points));
        testStore.dispatch(action.calculateOasisAndVillages());
        expect(testStore.getState().scorer.playerPoints.villagesTotal[0]).toEqual(10);
      });

      it('awards the right amount of oasis points next to a Great Lake', () => {

        const points = { oasis: [0], oasisLake: [2] };

        testStore.dispatch(action.setOasisPoints(points));
        testStore.dispatch(action.calculateOasisAndVillages());
        expect(testStore.getState().scorer.playerPoints.oasisTotal[0]).toEqual(12);
      });

      it('awards the right amount of village points next to a Great Lake', () => {

        const points = { villages: [0], villagesLake: [3] };

        testStore.dispatch(action.setVillagesPoints(points));
        testStore.dispatch(action.calculateOasisAndVillages());
        expect(testStore.getState().scorer.playerPoints.villagesTotal[0]).toEqual(30);
      });

      it('awards the right amount of points for both', () => {

        const pointsO = { oasis: [2], oasisLake: [2] };
        const pointsV = { villages: [2], villagesLake: [3] };

        testStore.dispatch(action.setOasisPoints(pointsO));
        testStore.dispatch(action.setVillagesPoints(pointsV));

        testStore.dispatch(action.calculateOasisAndVillages());
        expect(testStore.getState().scorer.playerPoints.oasisTotal[0]).toEqual(18);
        expect(testStore.getState().scorer.playerPoints.villagesTotal[0]).toEqual(40);
      });

    });

    describe('calculateMerch', () => {

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

        it('for a single good', () => {
          const merchCards = cardCombination([1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(1);
        });

        it('for two of the same good', () => {
          const merchCards = cardCombination([2]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(2);
        });

        it('for 2 different goods', () => {
          const merchCards = cardCombination([1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(3);
        });

        it('for 3 different goods', () => {
          const merchCards = cardCombination([1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(7);
        });

        it('for 4 different goods', () => {
          const merchCards = cardCombination([1, 1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(13);
        });

        it('for 5 different goods', () => {
          const merchCards = cardCombination([1, 1, 1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(21);
        });

        it('for 6 different goods', () => {
          const merchCards = cardCombination([1, 1, 1, 1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(30);
        });

        it('for 7 different goods', () => {
          const merchCards = cardCombination([1, 1, 1, 1, 1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(40);
        });

        it('for 8 different goods', () => {
          const merchCards = cardCombination([1, 1, 1, 1, 1, 1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(50);
        });

        it('for 9 different goods', () => {
          const merchCards = cardCombination([1, 1, 1, 1, 1, 1, 1, 1, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(60);
        });

        it('for 2 goods for each kind', () => {
          const merchCards = cardCombination([2, 2, 2, 2, 2, 2, 2, 2, 2]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(120);
        });

        it('for random cards A', () => {
          const merchCards = cardCombination([2, 0, 2, 1, 0, 1, 1, 2]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(37);
        });

        it('for random cards B', () => {
          const merchCards = cardCombination([0, 3, 0, 2, 1, 0, 3, 3, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(50);
        });

        it('for random cards C', () => {
          const merchCards = cardCombination([2, 1, 1, 2, 1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(24);
        });

        it('for random cards D', () => {
          const merchCards = cardCombination([0, 0, 1, 3, 0, 0, 3]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(13);
        });

        it('for all 6 fish cards', () => {
          const merchCards = cardCombination([0, 0, 0, 6]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(6);
        });

        it('even when called twice', () => {
          const merchCards = cardCombination([1]);
          testStore.dispatch(action.setMerchPoints(merchCards));
          testStore.dispatch(action.calculateMerch());
          testStore.dispatch(action.calculateMerch());
          expect(testStore.getState().scorer.playerPoints.merch[0]).toEqual(1);
        });

      });

    });

    describe('calculatePreciousItems', () => {

      it('awards the right amount of points for jewelry', () => {
        const points = { jewelry: [3], treasure: [0], crown: [0] };

        testStore.dispatch(action.setPreciousItemsPoints(points));
        testStore.dispatch(action.calculatePreciousItems());
        expect(testStore.getState().scorer.playerPoints.preciousItems[0]).toEqual(15);
        expect(testStore.getState().scorer.preciousItemsQuantity[0]).toEqual(3);
      });

      it('awards the right amount of points for treasure chests', () => {
        const points = { jewelry: [0], treasure: [2], crown: [0] };

        testStore.dispatch(action.setPreciousItemsPoints(points));
        testStore.dispatch(action.calculatePreciousItems());
        expect(testStore.getState().scorer.playerPoints.preciousItems[0]).toEqual(14);
        expect(testStore.getState().scorer.preciousItemsQuantity[0]).toEqual(2);
      });

      it('awards the right amount of points for crowns', () => {
        const points = { jewelry: [0], treasure: [0], crown: [2] };

        testStore.dispatch(action.setPreciousItemsPoints(points));
        testStore.dispatch(action.calculatePreciousItems());
        expect(testStore.getState().scorer.playerPoints.preciousItems[0]).toEqual(18);
        expect(testStore.getState().scorer.preciousItemsQuantity[0]).toEqual(2);
      });

      it('awards the right amount of points for all precious items', () => {
        const points = { jewelry: [4], treasure: [3], crown: [2] };

        testStore.dispatch(action.setPreciousItemsPoints(points));
        testStore.dispatch(action.calculatePreciousItems());
        expect(testStore.getState().scorer.playerPoints.preciousItems[0]).toEqual(59);
        expect(testStore.getState().scorer.preciousItemsQuantity[0]).toEqual(9);
      });

    });

    describe('calculateTiles', () => {

      it('adds the right amount of points for tiles', () => {
      const points = { tiles: [21], tent: [0], cities: [0] };

      testStore.dispatch(action.setTilesPoints(points));
      testStore.dispatch(action.calculateTiles());
      expect(testStore.getState().scorer.playerPoints.tilesTotal[0]).toEqual(21);

      });

      it('adds the right amount of points for the tent', () => {
      const points = { tiles: [0], tent: [12], cities: [0] };

      testStore.dispatch(action.setTilesPoints(points));
      testStore.dispatch(action.calculateTiles());
      expect(testStore.getState().scorer.playerPoints.tilesTotal[0]).toEqual(12);

      });

      it('awards the right amount of points for 1 fabulous city', () => {
      const points = { tiles: [0], tent: [0], cities: [1] };

      testStore.dispatch(action.setTilesPoints(points));
      testStore.dispatch(action.calculateTiles());
      expect(testStore.getState().scorer.playerPoints.tilesTotal[0]).toEqual(5);

      });

      it('awards the right amount of points for 3 fabulous city', () => {
      const points = { tiles: [0], tent: [0], cities: [3] };

      testStore.dispatch(action.setTilesPoints(points));
      testStore.dispatch(action.calculateTiles());
      expect(testStore.getState().scorer.playerPoints.tilesTotal[0]).toEqual(45);

      });

      it('awards the right amount of points for 5 fabulous city', () => {
      const points = { tiles: [0], tent: [0], cities: [5] };

      testStore.dispatch(action.setTilesPoints(points));
      testStore.dispatch(action.calculateTiles());
      expect(testStore.getState().scorer.playerPoints.tilesTotal[0]).toEqual(125);

      });

      it('awards the right amount of points for all three subcategories', () => {
      const points = { tiles: [12], tent: [8], cities: [2] };

      testStore.dispatch(action.setTilesPoints(points));
      testStore.dispatch(action.calculateTiles());
      expect(testStore.getState().scorer.playerPoints.tilesTotal[0]).toEqual(40);

      });

    });

  });

});
