import React from 'react';
import PropTypes from 'prop-types';

// All image imports
import borderLeft from '../images/border-left.png';
import borderRight from '../images/border-right.png';
import categoryArtisans from '../images/category-artisans.svg';
import categoryBonusArtisans from '../images/category-bonus-artisans.svg';
import categoryBonusElders from '../images/category-bonus-elders.svg';
import categoryBonusItems from '../images/category-bonus-items.svg';
import categoryBonusOasis from '../images/category-bonus-oasis.svg';
import categoryBonusViziers from '../images/category-bonus-viziers.svg';
import categoryCities from '../images/category-cities.svg';
import categoryCoins from '../images/category-coins.svg';
import categoryDjinnGeb from '../images/category-djinn-geb.svg';
import categoryDjinnHaurvatat from '../images/category-djinn-haurvatat.svg';
import categoryDjinnJaafar from '../images/category-djinn-jaafar.svg';
import categoryDjinnPtah from '../images/category-djinn-ptah.svg';
import categoryDjinnShamhat from '../images/category-djinn-shamhat.svg';
import categoryDjinnTotal from '../images/category-djinn-total.svg';
import categoryDjinns from '../images/category-djinns.svg';
import categoryElders from '../images/category-elders.svg';
import categoryItemCrown from '../images/category-item-crown.svg';
import categoryItemJewelry from '../images/category-item-jewelry.svg';
import categoryItemTreasure from '../images/category-item-treasure.svg';
import categoryMerch from '../images/category-merch.svg';
import categoryMerchSet1 from '../images/category-merch-set-1.svg';
import categoryMerchSet2 from '../images/category-merch-set-2.svg';
import categoryMerchSet3 from '../images/category-merch-set-3.svg';
import categoryMerchSet4 from '../images/category-merch-set-4.svg';
import categoryMerchSet5 from '../images/category-merch-set-5.svg';
import categoryMerchSet6 from '../images/category-merch-set-6.svg';
import categoryOasis from '../images/category-oasis.svg';
import categoryOasisTotal from '../images/category-oasis-total.svg';
import categoryOasisLake from '../images/category-oasis-lake.svg';
import categoryOasisLakeTotal from '../images/category-oasis-lake-total.svg';
import categoryPreciousItems from '../images/category-precious-items.svg';
import categoryTent from '../images/category-tent.svg';
import categoryThieves from '../images/category-thieves.svg';
import categoryTiles from '../images/category-tiles.svg';
import categoryTilesCities from '../images/category-tiles-cities.svg';
import categoryTilesTotal from '../images/category-tiles-total.svg';
import categoryTotal from '../images/category-total.svg';
import categoryVillages from '../images/category-villages.svg';
import categoryVillagesTotal from '../images/category-villages-total.svg';
import categoryVillagesLake from '../images/category-villages-lake.svg';
import categoryVillagesLakeTotal from '../images/category-villages-lake-total.svg';
import categoryViziers from '../images/category-viziers.svg';
import colorBlack from '../images/color-black.svg';
import colorBrown from '../images/color-brown.svg';
import colorCyan from '../images/color-cyan.svg';
import colorOrange from '../images/color-orange.svg';
import colorPink from '../images/color-pink.svg';
import expansionArtisans from '../images/expansion-artisans.svg';
import expansionThieves from '../images/expansion-thieves.svg';
import expansionWhims from '../images/expansion-whims.svg';
import logo from '../images/logo.png';
import pawn from '../images/pawn.svg';
import players1 from '../images/players-1.svg';
import players2 from '../images/players-2.svg';
import players3 from '../images/players-3.svg';
import players4 from '../images/players-4.svg';
import players5 from '../images/players-5.svg';

const Image = ({ src, className, alt }) => {
  let source = null;

  switch (src) {
    case 'border-left':
      source = borderLeft;
      break;

    case 'border-right':
      source = borderRight;
      break;

    case 'category-artisans':
      source = categoryArtisans;
      break;

    case 'category-bonus-artisans':
      source = categoryBonusArtisans;
      break;

    case 'category-bonus-elders':
      source = categoryBonusElders;
      break;

    case 'category-bonus-items':
      source = categoryBonusItems;
      break;

    case 'category-bonus-oasis':
      source = categoryBonusOasis;
      break;

    case 'category-bonus-viziers':
      source = categoryBonusViziers;
      break;

    case 'category-cities':
      source = categoryCities;
      break;

    case 'category-coins':
      source = categoryCoins;
      break;

    case 'category-djinn-geb':
      source = categoryDjinnGeb;
      break;

    case 'category-djinn-haurvatat':
      source = categoryDjinnHaurvatat;
      break;

    case 'category-djinn-jaafar':
      source = categoryDjinnJaafar;
      break;

    case 'category-djinn-ptah':
      source = categoryDjinnPtah;
      break;

    case 'category-djinn-shamhat':
      source = categoryDjinnShamhat;
      break;

    case 'category-djinn-total':
      source = categoryDjinnTotal;
      break;

    case 'category-djinns':
      source = categoryDjinns;
      break;

    case 'category-elders':
      source = categoryElders;
      break;

    case 'category-item-crown':
      source = categoryItemCrown;
      break;

    case 'category-item-jewelry':
      source = categoryItemJewelry;
      break;

    case 'category-item-treasure':
      source = categoryItemTreasure;
      break;

    case 'category-merch':
      source = categoryMerch;
      break;

    case 'category-merch-set-1':
      source = categoryMerchSet1;
      break;

    case 'category-merch-set-2':
      source = categoryMerchSet2;
      break;

    case 'category-merch-set-3':
      source = categoryMerchSet3;
      break;

    case 'category-merch-set-4':
      source = categoryMerchSet4;
      break;

    case 'category-merch-set-5':
      source = categoryMerchSet5;
      break;

    case 'category-merch-set-6':
      source = categoryMerchSet6;
      break;

    case 'category-oasis':
      source = categoryOasis;
      break;

    case 'category-oasis-total':
      source = categoryOasisTotal;
      break;

    case 'category-oasis-lake':
      source = categoryOasisLake;
      break;

    case 'category-oasis-lake-total':
      source = categoryOasisLakeTotal;
      break;

    case 'category-precious-items':
      source = categoryPreciousItems;
      break;

    case 'category-tent':
      source = categoryTent;
      break;

    case 'category-thieves':
      source = categoryThieves;
      break;

    case 'category-tiles':
      source = categoryTiles;
      break;

    case 'category-tiles-cities':
      source = categoryTilesCities;
      break;

    case 'category-tiles-total':
      source = categoryTilesTotal;
      break;

    case 'category-total':
      source = categoryTotal;
      break;

    case 'category-villages':
      source = categoryVillages;
      break;

    case 'category-villages-total':
      source = categoryVillagesTotal;
      break;

    case 'category-villages-lake':
      source = categoryVillagesLake;
      break;

    case 'category-villages-lake-total':
      source = categoryVillagesLakeTotal;
      break;

    case 'category-viziers':
      source = categoryViziers;
      break;

    case 'color-black':
      source = colorBlack;
      break;

    case 'color-brown':
      source = colorBrown;
      break;

    case 'color-cyan':
      source = colorCyan;
      break;

    case 'color-orange':
      source = colorOrange;
      break;

    case 'color-pink':
      source = colorPink;
      break;

    case 'expansion-artisans':
      source = expansionArtisans;
      break;

    case 'expansion-thieves':
      source = expansionThieves;
      break;

    case 'expansion-whims':
      source = expansionWhims;
      break;

    case 'logo':
      source = logo;
      break;

    case 'pawn':
      source = pawn;
      break;

    case 'players-1':
      source = players1;
      break;

    case 'players-2':
      source = players2;
      break;

    case 'players-3':
      source = players3;
      break;

    case 'players-4':
      source = players4;
      break;

    case 'players-5':
      source = players5;
      break;

    default:
      source = null;
  }

  return <img src={source} alt={alt} className={className} />;
};

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

Image.defaultProps = {
  alt: 'image',
};

export default Image;
