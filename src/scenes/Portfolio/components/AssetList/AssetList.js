import React from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

import { formatNumber } from '../../../../utils/formatting';
import { CURRENCIES } from '../../../../utils/currencies';

import CurrencyColor from '../../../../components/CurrencyColor';
import ChangeHighlight from '../../../../components/ChangeHighlight';
import ColoredChange from '../../../../components/ColoredChange';

import styles from './AssetListStyle.js';

const AssetList = ({ assets }) => {
  // Order assets based on the "official order"
  const sortedAssets = _.sortBy(assets, (asset) => {
    const assetList = CURRENCIES.map(currency => currency.symbol);
    return assetList.indexOf(asset.symbol);
  });

  return (
    <View auto column className={ styles.container }>
      { sortedAssets.map(asset => (
        <AssetRow
          key={ asset.symbol }
          { ...asset }
        />
      )) }
    </View>
  );
};

const AssetRow = ({
  name,
  symbol,
  color,
  balance,
  nativeBalance,
  change,
}) => {
  const direction = change >= 0 ? 'up' : 'down';

  return (
    <View
      align="center"
      justify="space-between"
      className={ styles.row }
    >
      <View align="flex-start">
        <CurrencyColor color={ color } className={ styles.colorDot } />
        <View column>
          <View>{ name }</View>
          <View className={ styles.balance }>
            { formatNumber(balance) } { symbol }
          </View>
        </View>
      </View>
      <View>
        <View justify="flex-end">
          <ChangeHighlight trigger={ nativeBalance }>
            { formatNumber(nativeBalance, 'USD', { minPrecision: true }) }
          </ChangeHighlight>
        </View>
        <View justify="flex-end">
          <ColoredChange direction={ direction }>
            { formatNumber(change, 'USD', { directionSymbol: true, minPrecision: true }) }
          </ColoredChange>
        </View>
      </View>
    </View>
  );
};

export default AssetList;
